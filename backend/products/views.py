from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Product
from .serializers import ProductSerializer
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
        })


class ProductBySkuView(APIView):
    def get(self, request, sku):
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
        })

    def delete(self, request, sku):
        try:
            product = find_product_by_sku(sku)
        except Product.DoesNotExist:
            return Response(
                {"detail": "Product not found."},
                status=404
            )
        product.delete()
        return Response(status=204)


class ProductListCreateView(APIView):
    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProductSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=400)