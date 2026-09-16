from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

from .serializers import SaleSerializer
from .services import sell_product

class SaleView(APIView):

    def post(self, request):
        serializer = SaleSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        product = serializer.validated_data["product"]
        quantity = serializer.validated_data["quantity"]

        try:
            sale = sell_product(product, quantity)
        except ValueError as e:
                return Response(
                     {"error": str(e)},
                     status=status.HTTP_400_BAD_REQUEST
                )

        return Response(
             {
            "message": "Sale completed successfully.",
            "sale_id": sale.id,
            "product": sale.product.name,
            "total_cost": sale.total_cost,

        },
        status=status.HTTP_201_CREATED,
    )