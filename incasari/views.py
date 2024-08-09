from django.shortcuts import render, HttpResponseRedirect
from django.contrib import messages
from django.views import View
from .forms import IncasariForm
from .models import IncasariModel


class IncasariView(View):

    def get(self, request):
        result = IncasariModel.objects.first()
        form = IncasariForm(instance=result)
        return render(
            request,
            template_name="incasari.html",
            context={"incasari_form": form},
        )

    def post(self, request, *args, **kwargs):
        form = IncasariForm(request.POST)

        if not form.is_valid():
            return render(request, "incasari.html", {"incasari_form": form})

        IncasariModel.objects.all().delete()
        form.save()
        messages.add_message(
            request,
            messages.SUCCESS,
            "Datele au fost salvate!",
            extra_tags="✅ Succes!",
        )
        return HttpResponseRedirect("/incasari/")
