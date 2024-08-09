from django.db import models
from django.utils.translation import gettext_lazy as _


class TipTranzactie(models.TextChoices):
        BANCAR = "BANCAR", _("💳 BANCAR")
        NUMERAR = "NUMERAR", _("💵 NUMERAR")


class Valuta(models.TextChoices):
    RON = "RON", _("🇷🇴 RON - Romania")
    USD = "USD", _("🇺🇸 USD - USA")
    GBP = "GBP", _("🇬🇧 GBP - UK")
    CAD = "CAD", _("🇨🇦 CAD - Canada")
    EUR = "EUR", _("🇪🇺 EUR - European Union Zone")
    CHF = "CHF", _("🇨🇭 CHF - Switzerland")
    AED = "AED", _("🇦🇪 AED - UAE")
    AUD = "AUD", _("🇦🇺 AUD - Australia")
    BGN = "BGN", _("🇧🇬 BGN - Bulgaria")
    BRL = "BRL", _("🇧🇷 BRL - Brazil")
    CNY = "CNY", _("🇨🇳 CNY - China")
    CZK = "CZK", _("🇨🇿 CZK - Czech Republic")
    DKK = "DKK", _("🇩🇰 DKK - Denmark")
    EGP = "EGP", _("🇪🇬 EGP - Egypt")
    HUF = "HUF", _("🇭🇺 HUF - Hungary")
    INR = "INR", _("🇮🇳 INR - India")
    JPY = "JPY", _("🇯🇵 JPY - Japan")
    KRW = "KRW", _("🇰🇷 KRW - South Korea")
    MDL = "MDL", _("🇲🇩 MDL - Moldova")
    MXN = "MXN", _("🇲🇽 MXN - Mexico")
    NOK = "NOK", _("🇳🇴 NOK - Norway")
    NZD = "NZD", _("🇳🇿 NZD - New Zealand")
    PLN = "PLN", _("🇵🇱 PLN - Poland")
    RSD = "RSD", _("🇷🇸 RSD - Serbia")
    RUB = "RUB", _("🇷🇺 RUB - Russia")
    SEK = "SEK", _("🇸🇪 SEK - Sweden")
    THB = "THB", _("🇹🇭 THB - Thailand")
    TRY = "TRY", _("🇹🇷 TRY - Turkey")
    UAH = "UAH", _("🇺🇦 UAH - Ukraine")
    XAU = "XAU", _("🏅 XAU - Gold")
    XDR = "XDR", _("🌐 XDR - IMF Special Drawing Rights")
    ZAR = "ZAR", _("🇿🇦 ZAR - South Africa")
