from django.shortcuts import render
from django.http import HttpResponse, JsonResponse 
from faker import Faker
from django.core.paginator import Paginator


# Create your views here.
def index(request):
  return render(request,"infoapp/index.html")
 
#
def details(request, pk, m):
  if request.method=="GET":
    name = []
    fake=Faker()
    for n in range(1,pk+1):
      name +=[{"firstname":fake.first_name(), "lastname":fake.last_name(),"age": fake.random_int(20, 30), "id":n}]
    p=Paginator(name, m)
    data_name= [p.page(i).object_list for i in range(1,p.num_pages+1)]
    print(len(data_name)) 
    
    #print(p, "\n", p.num_pages)
    return JsonResponse(data_name, safe=False)