from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Product
from .services import find_product_by_barcode, find_product_by_sku

class ProductByBarcodeView(APIView):
    def get(self, request, barcode):

        try:
            product = find_product_by_barcode(barcode)
        except Product.DoesNotExist:
            return Response(
                {"detail": "Product not found. "},
                status=404
            )

        return Response({
            "id": product.id,
            "name": product.name,
            "sku": product.sku,
            "barcode": product.barcode,
            "selling_price": product.selling_price,
            "stock_quantity": product.stock_quantity,
        }) 

class ProductBySkuView(APIView):
    def get(self,request, sku):
        try:
            product = find_product_by_sku(sku)
        except Product.DoesNotExist:
            return Response(
                {"detail": "Product not found."},
                status=404
            )
        return Response({
            "id": product.id,
            "name": product.name,
            "sku": product.sku,
            "barcode": product.barcode,
            "selling_price": product.selling_price,
            "stock_quantity": product.stock_quantity,
        })

            
