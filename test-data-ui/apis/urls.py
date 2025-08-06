from django.urls import path
from apis import views

urlpatterns = [
    path('api/filters/', views.filters),
    path('api/metadata/', views.metadata),
    path('api/load/', views.load_from_github),
    path('api/resource/', views.resource),
    path('api/download/', views.download),
]