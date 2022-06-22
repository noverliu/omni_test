from . import views
from django.contrib import admin
from django.urls import path

urlpatterns = [
    # path('admin/', admin.site.urls),
    path('add', views.createItem),
    path('list', views.getList),
    path('del', views.deleteItem),
    path('<str:shorten>', views.redirect),
]