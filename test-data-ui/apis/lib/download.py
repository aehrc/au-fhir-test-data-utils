import zipfile
import json
import io
from apis.models import Resource

def search_and_filter(filter):
    queryset = Resource.objects.all()
    mode = filter.get('mode')
    # General filtering
    if mode == 'general':
        general = filter.get('general')
        # Filter by resourceType
        resource_type = general.get('resourceType')
        if resource_type and resource_type != 'all':
            queryset = queryset.filter(type=resource_type)
        # Filter by project (ManyToMany)
        project = general.get('project')
        if project and project != 'all':
            queryset = queryset.filter(projects__name=project)
        # Filter by tag (ManyToMany)
        tag = general.get('tag')
        if tag and tag != 'all':
            queryset = queryset.filter(tags__name=tag)
        # Filter by id (partial match)
        resource_id = general.get('id')
        if resource_id:
            queryset = queryset.filter(resourceId__icontains=resource_id)
    # Patient filtering
    if mode == 'patient':
        patient = filter.get('patient')
        if patient:
            queryset = queryset.filter(patient=patient)
    return list(queryset.distinct())

def add_referenced_resources(resources, recursive=False):
    """
    Given a list of Resource objects, return a set of all resources
    including those referenced, optionally recursively.
    """
    seen = set()
    # copy the initial resources so we can modify it 
    to_process = resources.copy()
    all_resources = set(resources)

    while to_process:
        resource = to_process.pop()
        seen.add((resource.type, resource.resourceId))
        for ref in resource.references.all():
            try:
                ref_type, ref_id = ref.reference.split('/', 1)
            except ValueError:
                continue  # skip malformed references
            if (ref_type, ref_id) not in seen:
                try:
                    referenced = Resource.objects.get(type=ref_type, resourceId=ref_id)
                    if referenced not in all_resources:
                        all_resources.add(referenced)
                        if recursive:
                            to_process.append(referenced)
                except Resource.DoesNotExist:
                    continue  # skip missing resources
    return list(all_resources)

def zip_resources(resources):
    """
    Given a list of Resource objects, create a zip file containing their JSON data.
    """
    zip_buffer = io.BytesIO()
    with zipfile.ZipFile(zip_buffer, 'w', zipfile.ZIP_DEFLATED) as zip_file:
        for resource in resources:
            filename = f"{resource.filename}.json"
            zip_file.writestr(filename, json.dumps(resource.json, indent=2))
    zip_buffer.seek(0)
    return zip_buffer