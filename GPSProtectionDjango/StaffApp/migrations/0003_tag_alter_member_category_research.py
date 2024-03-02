# Generated by Django 4.1.3 on 2023-08-22 18:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('StaffApp', '0002_rename_name_in_latin_member_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('industry', models.PositiveSmallIntegerField(blank=True, choices=[(1, 'Chemistry'), (2, 'Pharmacy')], null=True)),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.AlterField(
            model_name='member',
            name='category',
            field=models.PositiveSmallIntegerField(choices=[(1, 'AFM laboratory'), (2, 'CF laboratory'), (3, 'Technicians'), (4, 'Students involved in projects')]),
        ),
        migrations.CreateModel(
            name='Research',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('laboratory', models.PositiveSmallIntegerField(choices=[(1, 'AFM laboratory'), (2, 'CF laboratory')])),
                ('link', models.URLField(blank=True, null=True)),
                ('document', models.FileField(blank=True, null=True, upload_to='research/')),
                ('tags', models.ManyToManyField(to='StaffApp.tag')),
                ('writers', models.ManyToManyField(related_name='written_researches', to='StaffApp.member')),
            ],
        ),
    ]
