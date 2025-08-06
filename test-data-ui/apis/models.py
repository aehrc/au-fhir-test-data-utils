from django.db import models

class Project(models.Model):
    name = models.CharField(unique=True)
    def __str__(self):
        return self.name

class Tag(models.Model):
    name = models.CharField(unique=True)
    def __str__(self):
        return self.name
    
class Reference(models.Model):
    reference = models.CharField(unique=True)
    def __str__(self):
        return self.reference

class Resource(models.Model):
    type = models.CharField()
    resourceId = models.CharField()
    filename = models.CharField(unique=True)
    patient = models.CharField(null=True)
    projects = models.ManyToManyField(Project)
    tags = models.ManyToManyField(Tag)
    references = models.ManyToManyField(Reference)
    json = models.JSONField()
