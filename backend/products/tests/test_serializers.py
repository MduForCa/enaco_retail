import pytest
from decimal import Decimal

from products.models import Product
from products.serializers import ProductSerializer


@pytest.mark.django_db
class TestProductSerializer:

    def test_serialize_product(self):
        product = Product.objects.create(
            name="Coca-Cola",
            sku="COKE-500",
            barcode="5449000000996",
            selling_price=Decimal("12.50"),
        )
        serializer = ProductSerializer(product)
        data = serializer.data

        assert data["id"] == product.id
        assert data["name"] == "Coca-Cola"
        assert data["sku"] == "COKE-500"
        assert data["barcode"] == "5449000000996"
        assert Decimal(data["selling_price"]) == Decimal("12.50")

    def test_serialize_many_products(self):
        Product.objects.create(name="A", sku="A-1", selling_price=Decimal("1.00"))
        Product.objects.create(name="B", sku="B-1", selling_price=Decimal("2.00"))
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        assert len(serializer.data) == 2

    def test_deserialize_valid_product(self):
        data = {
            "name": "New Product",
            "sku": "NEW-001",
            "barcode": "9999999999999",
            "selling_price": "29.99",
        }
        serializer = ProductSerializer(data=data)
        assert serializer.is_valid(), serializer.errors
        product = serializer.save()
        assert product.name == "New Product"
        assert product.sku == "NEW-001"

    def test_deserialize_without_barcode(self):
        data = {
            "name": "No Barcode Item",
            "sku": "NOBC-001",
            "selling_price": "5.00",
        }
        serializer = ProductSerializer(data=data)
        assert serializer.is_valid(), serializer.errors
        product = serializer.save()
        assert product.barcode is None

    def test_missing_required_field_fails(self):
        data = {
            "name": "Missing SKU",
            "selling_price": "10.00",
        }
        serializer = ProductSerializer(data=data)
        assert not serializer.is_valid()
        assert "sku" in serializer.errors

    def test_duplicate_sku_fails(self):
        Product.objects.create(
            name="Existing",
            sku="DUPE-001",
            selling_price=Decimal("10.00"),
        )
        data = {
            "name": "Dupe",
            "sku": "DUPE-001",
            "selling_price": "20.00",
        }
        serializer = ProductSerializer(data=data)
        assert not serializer.is_valid()
        assert "sku" in serializer.errors

    def test_invalid_decimal_price_fails(self):
        data = {
            "name": "Bad Price",
            "sku": "BAD-001",
            "selling_price": "not-a-number",
        }
        serializer = ProductSerializer(data=data)
        assert not serializer.is_valid()
        assert "selling_price" in serializer.errors

    def test_serializer_exposes_expected_fields(self):
        expected_fields = {
            "id",
            "name",
            "sku",
            "barcode",
            "selling_price",
            "created_at",
            "updated_at",
        }
        serializer = ProductSerializer()
        assert set(serializer.fields.keys()) == expected_fields