# Generated by Django 4.2 on 2023-04-12 18:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_likepost'),
    ]

    operations = [
        migrations.CreateModel(
            name='FollowersCount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('follower', models.CharField(blank=True, max_length=50)),
                ('user', models.CharField(blank=True, max_length=50)),
            ],
        ),
    ]
