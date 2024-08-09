from django.db import models
from django.db.models.functions import Now
from django.utils.translation import gettext_lazy as _
from cursvalutarbnr import Currency, ron_exchange_rate
from utils.valuta import Valuta, TipTranzactie
from utils.files import get_save_path


class SursaVenit(models.TextChoices):
    ACTIVITATE_PRINCIPALA = "Venit din activitati independente", _(
        "Venit din activitati independente"
    )
    ALTE_SURSE = "Venit din alte surse", _("Venit din alte surse")
    INCHIRIERI = "Venit din cedarea folosintei bunurilor", _(
        "Venit din cedarea folosintei bunurilor"
    )
    CASTIG_INVESTITII = "Venit si/sau castig din investitii", _(
        "Venit si/sau castig din investitii"
    )
    DREPTURI_PROP_INTELECTUALA = "Venit din drepturi de proprietate intelectuala", _(
        "Venit din drepturi de proprietate intelectuala"
    )
    AGRICULTURA = "Venit din activitati agricole, silvicultura si piscicultura", _(
        "Venit din activitati agricole, silvicultura si piscicultura"
    )
    DIVIDENTE_VENIT_DISTRUBUIT = (
        "Venit distribuit din asociere cu persoane juridice, contribuabili potrivit prevederilor titlului II, titlului III sau Legii nr.170/2016",
        _(
            "Venit distribuit din asociere cu persoane juridice, contribuabili potrivit prevederilor titlului II, titlului III sau Legii nr.170/2016"
        ),
    )


class IncasariModel(models.Model):
    sursa_venit = models.CharField(max_length=300, choices=SursaVenit, default=SursaVenit.ACTIVITATE_PRINCIPALA)
    suma_in_ron = models.FloatField(null=True, blank=True)
    suma = models.FloatField()
    valuta = models.CharField(max_length=3, choices=Valuta, default=Valuta.RON)
    tip_tranzactie = models.CharField(
        max_length=7, choices=TipTranzactie, default=TipTranzactie.BANCAR
    )
    data_incasarii = models.DateField(null=True, blank=True)
    fisier = models.FileField(upload_to=get_save_path)
    actualizat_la = models.DateTimeField(db_default=Now())

    def save(self, *args, **kwargs):
        if self.data_incasarii and self.valuta != "RON":
            self.suma_in_ron = ron_exchange_rate(
                self.suma, self.valuta, self.data_incasarii
            )
        elif not self.data_incasarii and self.valuta != "RON":
            self.suma_in_ron = ron_exchange_rate(
                self.suma, self.valuta, self.actualizat_la
            )
        elif self.valuta == "RON":
            self.suma_in_ron = self.suma

        super().save(*args, **kwargs)

    class Meta:
        verbose_name_plural = "Incasari"

    def __str__(self):
        return self.sursa_venit + " " + self.suma_in_ron + "RON " + self.actualizat_la
