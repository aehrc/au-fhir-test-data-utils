
import requests
import zipfile
import json
import io
from apis.models import Project, Tag, Resource, Reference


# find all references in the json object
def find_references(obj, refs=None):
        if refs is None:
            refs = []
        if isinstance(obj, dict):
            for k, v in obj.items():
                if k == 'reference':
                    refs.append(v)
                else:
                    find_references(v, refs)
        elif isinstance(obj, list):
            for item in obj:
                find_references(item, refs)
        return refs

# temporarily generate metadata from file content, change to loading metadata file when they become available in the future
def metadata(resource, filename):
    resource_type = resource['resourceType']
    meta_item = {
        "type": resource_type, 
        "id": resource['id'],
        "filename": filename.split('/')[-1],
        'project': [],
        'tag': [],
        'references': find_references(resource),
        'patient': None
    }
    if resource_type in ('Patient','Practitioner','PractitionerRole','Organization','HealthcareService','Location'):
        meta_item['tag'].append('Service Australia')
    for pf in ('subject', 'patient'):
        if pf in resource and 'reference' in resource[pf] and resource[pf]['reference'].startswith('Patient'):
            pat = resource[pf]['reference'].split('/')[1]
            meta_item['patient'] = pat
    if resource_type == 'Patient':
        meta_item['patient'] = meta_item['id']
    if meta_item['filename'] in ('Patient-italia-sofia-suppressed-birthDate.json', 'Patient-italia-sofia-suppressed-gender.json', 'Patient-italia-sofia-suppressed-identifier.json', 
'Patient-italia-sofia-suppressed-name.json', 'Observation-pathresult-missing-effective.json', 'Observation-pathresult-missing-status.json', 'Observation-pathresult-suppressed-code.json', 
'Observation-pathresult-suppressed-dataAbsentReason.json', 'Observation-pathresult-suppressed-subject.json', 
'Observation-pathresult-suppressed-valueCodeableConcept.json', 'Observation-pathresult-suppressed-valueQuantity.json'):
        meta_item['tag'].append('Missing or Suppressed')
    if 'meta' in resource and 'profile' in resource['meta']:
        if 'au-erequesting' in resource['meta']['profile'][0]:
            meta_item['project'].append('AU eRequesting')
        if 'au-core' in resource['meta']['profile'][0]:
            meta_item['project'].append('AU Core')
        if 'au-ps' in resource['meta']['profile'][0]:
            meta_item['project'].append('AU Patient Summary')
    return meta_item


def load(url):
    response = requests.get(url)
    response.raise_for_status()
    # throw the zip in memory to be unziped
    zip_buffer = io.BytesIO(response.content)

    # clear the tables
    # TODO put in transaction so previous data is not lost if error occurs
    Resource.objects.all().delete()
    Project.objects.all().delete()
    Tag.objects.all().delete()

    # unzip the file
    with zipfile.ZipFile(zip_buffer, 'r') as zip_file:
        for filename in zip_file.namelist():
            # find json files
            if filename.endswith('.json'):
                with zip_file.open(filename) as json_file:
                    json_data = json.load(json_file)
                    meta = metadata(json_data, filename)
                    # create the resource in db
                    resource = Resource.objects.create(
                        type = meta['type'],
                        resourceId = meta['id'],
                        filename = meta['filename'],
                        json = json_data,
                        patient = meta['patient']
                    )
                    # get or create the projects and tags
                    tag_objects = [Tag.objects.get_or_create(name=tag)[0] for tag in meta['tag']]
                    project_objects = [Project.objects.get_or_create(name=project)[0] for project in meta['project']]
                    references_objects = [Reference.objects.get_or_create(reference=ref)[0] for ref in meta['references']]
                    # assign projects and tags, they are ManyToMany (through tables) so need to set after create (require primary keys to already exist)
                    resource.tags.set(tag_objects)
                    resource.projects.set(project_objects)
                    resource.references.set(references_objects)