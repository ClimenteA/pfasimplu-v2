from django.forms import ModelForm
from .models import Setari



class SetariForm(ModelForm):
    class Meta:
        model = Setari
        fields = "__all__"