from http.client import HTTPResponse
from django.http import HttpResponse, JsonResponse
from .models import ShortenUrl
from django.core.serializers import serialize
import random
import string

def generateShorten():
  return ''.join(random.choice(string.ascii_letters) for x in range(10))

def getList(request):
  items=serialize('json', ShortenUrl.objects.all(), fields=('originLink', 'shorten'))
  return HTTPResponse(items)

def getItem(request, shorten):
  item=ShortenUrl.objects.get(pk=shorten)
  itemJson=serialize('json', [item], fields=('originLink', 'shorten'))
  return HTTPResponse(item)

def createItem(request):
  originUrl=request.GET.get('origin')
  item=ShortenUrl.objects.filter(originLink=originUrl).first()
  if item==None:
    item=ShortenUrl(originLink=originUrl, shorten=generateShorten())
    item.save()
  itemJson=serialize('json', [item], fields=('originLink', 'shorten'))
  response=HTTPResponse(itemJson)
  response.status_code=200
  return response

def deleteItem(request):
  shorten=request.GET.get('key')
  item=ShortenUrl.objects.get(pk=shorten)
  item.delete()
  response=HttpResponse()
  response.status_code=204
  return response

def redirect(request, shorten):
  item=ShortenUrl.objects.get(pk=shorten)
  response=HttpResponse()
  response.status_code=302
  response.headers={
    'Location':item.originLink
  }
  return response