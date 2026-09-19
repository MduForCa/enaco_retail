import pytest
from decimal import Decimal

from products.models import Product


@pytest.mark.django_db
class TestProductModel:

    def test_create_product_with_all_fields(self):
        product = Product.objects.create(
            name="Coca-Cola 500ml",
            sku="COKE-500",
            barcode="5449000000996",
            selling_price=Decimal("12.50"),
        )
        assert product.id is not None
        assert product.name == "Coca-Cola 500ml"
        assert product.sku == "COKE-500"
        assert product.barcode == "5449000000996"
        assert product.selling_price == Decimal("12.50")

    def test_create_product_without_barcode(self):
        product = Product.objects.create(
            name="Loose Item",
            sku="LOOSE-001",
            selling_price=Decimal("5.00"),
        )
        assert product.barcode is None

    def test_str_returns_name(self):
        product = Product.objects.create(
            name="Bread",
            sku="BREAD-001",
            selling_price=Decimal("15.00"),
        )
        assert str(product) == "Bread"

    def test_sku_must_be_unique(self):
        Product.objects.create(
            name="Product A",
            sku="SKU-001",
            selling_price=Decimal("10.00"),
        )
        with pytest.raises(Exception):
            Product.objects.create(
                name="Product B",
                sku="SKU-001",
                selling_price=Decimal("20.00"),
            )

    def test_barcode_must_be_unique_when_set(self):
        Product.objects.create(
            name="Product A",
            sku="SKU-001",
            barcode="1234567890123",
            selling_price=Decimal("10.00"),
        )
        with pytest.raises(Exception):
            Product.objects.create(
                name="Product B",
                sku="SKU-002",
                barcode="1234567890123",
                selling_price=Decimal("20.00"),
            )

    def test_multiple_products_can_have_null_barcode(self):
        Product.objects.create(
            name="Loose A",
            sku="LOOSE-A",
            barcode=None,
            selling_price=Decimal("5.00"),
        )
        Product.objects.create(
            name="Loose B",
            sku="LOOSE-B",
            barcode=None,
            selling_price=Decimal("6.00"),
        )
        assert Product.objects.filter(barcode__isnull=True).count() == 2

    def test_created_at_and_updated_at_are_set(self):
        product = Product.objects.create(
            name="Timed Product",
            sku="TIME-001",
            selling_price=Decimal("9.99"),
        )
        assert product.created_at is not None
        assert product.updated_at is not None

    def test_selling_price_accepts_two_decimals(self):
        product = Product.objects.create(
            name="Decimal Product",
            sku="DEC-001",
            selling_price=Decimal("19.99"),
        )
        product.refresh_from_db()
        assert product.selling_price == Decimal("19.99")

    def test_selling_price_accepts_zero(self):
        product = Product.objects.create(
            name="Free Sample",
            sku="FREE-001",
            selling_price=Decimal("0.00"),
        )
        assert product.selling_price == Decimal("0.00")