from django.shortcuts import render
from django.http import HttpResponse
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import ListAPIView
from rest_framework import status
import random

# Create your views here.


class all_products(ListAPIView):
    queryset = Product.objects.order_by('-date_added')
    serializer_class = ProductSerializers





class single_product(APIView):
    def get(self, request, pk):
        product = Product.objects.get(pk=pk)
        serialize = ProductSerializers(product, context={'request': request})

        return Response(serialize.data, status=status.HTTP_200_OK)


class process_order(APIView):
    def post(self, request):
        try:
            customer_data = request.data.get('customerDetails')
            cart_items = request.data.get('cartItems')

            if not customer_data or not cart_items:
                return Response({'error': 'Customer details and cart items are required.'}, status=status.HTTP_400_BAD_REQUEST)
            
            customer_serializer = CustomerSerializer(data=customer_data)
            if customer_serializer.is_valid():
                customer, created = Customer.objects.get_or_create(
                    phone = customer_data['phone'],
                    defaults= {
                        'first_name': customer_data['first_name'],
                        'last_name': customer_data['last_name']
                    }
                )
            
            else:
                return Response(customer_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            while True:
                order_number = random.randint(1000, 9999)
                if not Orders.objects.filter(order_number=order_number).exists():
                    break

            order = Orders.objects.create(
                order_number=order_number,
                customer=customer,
                location=customer_data['location']
            )

            for item in cart_items:
                product = Product.objects.get(id=item['id'])
                OrderItem.objects.create(
                    order=order,
                    product=product,
                    quantity=item['quantity']
                )
            
            order_serializer = OrderSerializer(order)
            return Response({'message': 'Order created successfully!', 'order': order_serializer.data}, status=status.HTTP_201_CREATED)
        except Product.DoesNotExist:
            return Response({'error': 'One or more products do not exist.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)