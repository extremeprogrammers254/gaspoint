from django.contrib import admin
from .models import *

# Register your models here.

admin.site.register(Brand)
admin.site.register(ProductType)
admin.site.register(ProductWeight)
admin.site.register(SalesType)
admin.site.register(Product)
admin.site.register(Customer)