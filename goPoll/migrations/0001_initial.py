# Generated by Django 4.0.6 on 2022-08-03 07:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Options',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('optionName', models.CharField(max_length=60)),
            ],
        ),
        migrations.CreateModel(
            name='Poll',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('userMail', models.CharField(max_length=60)),
                ('pollName', models.CharField(max_length=30)),
                ('pollBody', models.CharField(max_length=120)),
                ('pollCreatedAt', models.DateTimeField(auto_now=True)),
                ('anonymous', models.BooleanField()),
                ('pollCloseAt', models.DateTimeField()),
                ('pollLink', models.CharField(max_length=60)),
            ],
        ),
        migrations.CreateModel(
            name='Votes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('voterMail', models.CharField(max_length=60)),
                ('optionID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Votes', to='goPoll.options')),
                ('pollID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='goPoll.poll')),
            ],
        ),
        migrations.AddField(
            model_name='options',
            name='pollID',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='goPoll.poll'),
        ),
    ]
