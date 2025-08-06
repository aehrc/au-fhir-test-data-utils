from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
import apis.lib.loaddata as loaddata
import apis.lib.download as download_lib
from apis.models import Project, Tag, Resource
from apis.serializer import ResourceSerializer, MetadataSerializer
import json

# a list of filter keys to fill in the search bar
def filters(request):
    filters = {
        'resourceType': sorted(Resource.objects.values_list('type', flat=True).distinct()),
        'project': sorted(Project.objects.values_list('name', flat=True).distinct()),
        'tag': sorted(Tag.objects.values_list('name', flat=True).distinct()),
        'patient': list(filter(None, sorted(Resource.objects.exclude(patient__isnull=True).values_list('patient', flat=True).distinct()))),
    }
    return JsonResponse(filters, safe=False)

# list all metadata, TODO server side filter and pagination?
def metadata(request):
    all_meta = Resource.objects.all()
    return JsonResponse(MetadataSerializer(all_meta, many=True).data, safe=False)

# return a single resource with the resource json itself
def resource(request):
    reference = request.GET.get('reference')
    resourceType, resourceId = reference.split('/')
    resource = Resource.objects.get(type=resourceType, resourceId=resourceId)
    return JsonResponse(ResourceSerializer(resource).data, safe=False)

# load from github and update db
# TODO put it behind a login
def load_from_github(request):
    # grab the whole repo
    repo_url = 'https://github.com/hl7au/au-fhir-test-data/archive/refs/heads/master.zip'
    loaddata.load(repo_url)
    return JsonResponse({'status': 'success', 'message': 'Files loaded and stored'})

@csrf_exempt
def download(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Only POST method is allowed'}, status=405)
    try:
        params = json.loads(request.body.decode('utf-8'))
    except Exception:
        return JsonResponse({'error': 'Invalid body'}, status=400)
    filter = params.get('filter', '{}')
    resources = download_lib.search_and_filter(filter)
    with_references = params.get('with_references', False)
    recursive = params.get('recursive', False)
    if with_references:
        resources = download_lib.add_referenced_resources(resources, recursive=recursive)
    buffer = download_lib.zip_resources(resources)
    response = HttpResponse(buffer.getvalue())
    response['Content-Type'] = 'application/x-zip-compressed'
    response['Content-Disposition'] = 'attachment; filename=export.zip'
    return response
    