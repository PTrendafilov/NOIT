from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _

class Parent(User):
    children = models.ForeignKey('Child', on_delete=models.CASCADE, related_name='parents', null=True, blank=True)
    def __str__(self):
        return f"{self.username} (Parent)"

class Child(User):
    devices = models.ForeignKey('Device', on_delete=models.CASCADE, related_name='child', null=True, blank=True)
    def __str__(self):
        return f"{self.username} (Child)"
    
class Device(models.Model):
    class DeviceCategory(models.TextChoices):
        PASSIVE = 'passive', _('Passive')
        ACTIVE = 'active', _('Active')

    category = models.CharField(
        max_length=10,
        choices=DeviceCategory.choices,
        default=DeviceCategory.PASSIVE,
    )
    name = models.CharField(max_length=255)
