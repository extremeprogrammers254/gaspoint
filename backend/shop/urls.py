from django.urls import path
from . import views


urlpatterns = [
    path('', views.all_products.as_view()),
    path('details/<str:pk>/', views.single_product.as_view()),
    path('addorder/', views.process_order.as_view())
]