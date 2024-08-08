from django.shortcuts import render
from django.views import View


class VSetari(View):
    def get(self, request):
        return render(request, template_name="setari.html")

    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST)
        if form.is_valid():
            # <process form cleaned data>
            return HttpResponseRedirect("/success/")

        return render(request, self.template_name, {"form": form})