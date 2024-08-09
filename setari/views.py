from django.shortcuts import render, HttpResponseRedirect
from django.contrib import messages
from django.views import View
from .forms import SetariForm
from .models import SetariModel


class SetariView(View):

    def get(self, request):
        result = SetariModel.objects.first()
        form = SetariForm(instance=result)
        return render(
            request,
            template_name="setari.html",
            context={"setari_form": form},
        )

    def post(self, request, *args, **kwargs):
        form = SetariForm(request.POST)

        if not form.is_valid():
            return render(request, "setari.html", {"setari_form": form})

        SetariModel.objects.all().delete()
        form.save()
        messages.add_message(
            request,
            messages.SUCCESS,
            "Datele au fost salvate!",
            extra_tags="✅ Succes!",
        )
        return HttpResponseRedirect("/setari/")
