from django.shortcuts import render,redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.contrib.auth.models import User

# Create your views here.

def index(request):

    return render(request, "users/index.html")

def signup(request):

    if request.method == "POST":

        username = request.POST["username"]
        first = request.POST["first"]
        last = request.POST["last"]
        email = request.POST["email"]
        password = request.POST["password"]

        newuser = User.objects.create_user(username,email,password)
        newuser.first_name = first
        newuser.last_name = last

        newuser.save()

        return redirect("login")
    else:

        return render(request, "users/signup.html")    

def login_view(request):
    if request.method == "POST":

        username = request.POST["username"]
        password = request.POST["password"]

        user = authenticate(username = username, password = password)

        if user is not None :
            login(request, user)

            first = user.first_name

            return render(request, "users/home.html", {
                "first": first
                })
        else:
            
            return render(request, "users/signin.html", {
                "message": "Invalid Credentials"
            })
    
    else:

        return render(request, "users/signin.html")

def logout_view(request):
    logout(request)
    return redirect("index")