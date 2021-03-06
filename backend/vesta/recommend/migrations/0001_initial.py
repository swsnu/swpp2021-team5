# Generated by Django 3.2.6 on 2021-12-12 14:28

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('kitchen', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='TodayMenu',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('count', models.IntegerField(default=0)),
                ('date', models.DateField(default=django.utils.timezone.now, null=True)),
                ('breakfast', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='breakfast', to='kitchen.menu')),
                ('breakfast_other1', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='breakfast1', to='kitchen.menu')),
                ('breakfast_other2', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='breakfast2', to='kitchen.menu')),
                ('breakfast_other3', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='breakfast3', to='kitchen.menu')),
                ('breakfast_other4', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='breakfast4', to='kitchen.menu')),
                ('dinner', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='dinner', to='kitchen.menu')),
                ('dinner_other1', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='dinner1', to='kitchen.menu')),
                ('dinner_other2', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='dinner2', to='kitchen.menu')),
                ('dinner_other3', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='dinner3', to='kitchen.menu')),
                ('dinner_other4', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='dinner4', to='kitchen.menu')),
                ('lunch', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='lunch', to='kitchen.menu')),
                ('lunch_other1', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='lunch1', to='kitchen.menu')),
                ('lunch_other2', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='lunch2', to='kitchen.menu')),
                ('lunch_other3', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='lunch3', to='kitchen.menu')),
                ('lunch_other4', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='lunch4', to='kitchen.menu')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
