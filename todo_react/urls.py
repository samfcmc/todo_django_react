# App urls
# Mapping between urls and views

from django.conf.urls import patterns, include, url

from todo_react import views

urlpatterns = patterns('',
    url(r'^$', views.index, name='index'),
)
