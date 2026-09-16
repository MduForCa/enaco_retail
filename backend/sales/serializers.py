
from rest_framework import serializers

from products.models import Product
from products.services import find_product_by_barcode, find_product_by_sku


class SaleSerializer(serializers.Serializer):
    quantity = serializers.IntegerField()
    barcode = serializers.CharField(required=False)
    sku = serializers.CharField(required=False)

    def validate(self, attrs):
        if not attrs.get("barcode") and not attrs.get("sku"):
            raise serializers.ValidationError(
                "Either barcode or SKU must be provided."
            )
        barcode_product = None
        sku_product = None

        # Rule 2: find the product
        if attrs.get("barcode"):
            try:
                barcode_product = find_product_by_barcode(
                    attrs.get("barcode")
                )
            except Product.DoesNotExist:
                raise serializers.ValidationError(
                    "Product not found for the supplied barcode."
                )

           

        if attrs.get("sku"):
            try:
                sku_product = find_product_by_sku(
                    attrs.get("sku")
                )
            except Product.DoesNotExist:
                raise serializers.ValidationError(
                    "Product not found for the supplied SKU."
                )

        if barcode_product and sku_product:
            if barcode_product != sku_product:
                raise serializers.ValidationError(
                    "Barcode and SKU refer to different products."
                )
        product = barcode_product or sku_product
        attrs["product"] = product 

        return attrs
