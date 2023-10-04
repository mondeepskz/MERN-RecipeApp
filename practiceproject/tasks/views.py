from django.shortcuts import render
from django import forms
from django.http import HttpResponseRedirect, JsonResponse
from django.urls import reverse 

# Create your views here.

class NewTaskForm(forms.Form):
    task = forms.CharField(label="New Task")
    
def index(request):
    if "tasks" not in request.session:
        request.session["tasks"] = []

    return render(request, "tasks/index.html", {
        "tasks": request.session["tasks"]
    })
def json(request):
    
    start = int(request.GET.get("start") or 0)
    end = int(request.GET.get("end") or (start + 9))

    # Generate list of posts
    data = []
    for i in range(start, end + 1):
        data.append(f"Post #{i}")

    # Artificially delay speed of response
    #time.sleep(1)

    # Return list of posts
    return JsonResponse({
        "posts": data
    })
def add(request):
    if request.method == "POST":
        form = NewTaskForm(request.POST)
        if form.is_valid():
            task = form.cleaned_data["task"]
            request.session["tasks"] += [task]
            return HttpResponseRedirect(reverse("tasks:index"))
        else:
            return render(request, "tasks/add.html", {
                "form": form
            })

    return render (request, "tasks/add.html", {
        "form": NewTaskForm()
    })    
