from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _
class Notification(models.Model):
    text = models.CharField(max_length=255)
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,  # If user is deleted, the notifications will be too.
        related_name='notifications'  # Gives access to a user's notifications with user.notifications.all()
    )

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

    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,  # If user is deleted, the devices will be too.
        related_name='devices'  # Gives access to a user's devices with user.devices.all()
    )