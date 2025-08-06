from rest_framework import serializers
from .models import Resource, Tag, Project

# including the resource, for populating a detail page
class ResourceSerializer(serializers.ModelSerializer):
    tags = serializers.StringRelatedField(many=True)
    projects = serializers.StringRelatedField(many=True)
    references = serializers.StringRelatedField(many=True)
    class Meta:
        model = Resource
        fields = '__all__'

# not including the resource itself, for being provided in a big list and populating the search table
class MetadataSerializer(serializers.ModelSerializer):
    tags = serializers.StringRelatedField(many=True)
    projects = serializers.StringRelatedField(many=True)
    class Meta:
        model = Resource
        fields = ('id', 'type', 'resourceId', 'filename', 'patient', 'projects', 'tags')