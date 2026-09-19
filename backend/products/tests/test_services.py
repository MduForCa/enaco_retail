import pytest
from decimal import Decimal

from products.models import Product
from products.services import (
    find_product_by_barcode,
    find_product_by_sku,
    find_products_by_name,
)


@pytest.mark.django_db
class TestFindProductByBarcode:

    def test_returns_product_when_found(self):
        product = Product.objects.create(
            name="Found",
            sku="F-001",
            barcode="1234567890123",
            selling_price=Decimal("10.00"),
        )
        result = find_product_by_barcode("1234567890123")
        assert result.id == product.id

    def test_raises_when_not_found(self):
        with pytest.raises(Product.DoesNotExist):
            find_product_by_barcode("0000000000000")


@pytest.mark.django_db
class TestFindProductBySku:

    def test_returns_product_when_found(self):
        product = Product.objects.create(
            name="Found By SKU",
            sku="SKU-FOUND",
            selling_price=Decimal("15.00"),
        )
        result = find_product_by_sku("SKU-FOUND")
        assert result.id == product.id

    def test_raises_when_not_found(self):
        with pytest.raises(Product.DoesNotExist):
            find_product_by_sku("SKU-MISSING")


@pytest.mark.django_db
class TestFindProductsByName:

    def test_returns_matching_products(self):
        Product.objects.create(name="Coca-Cola", sku="C-1", selling_price=Decimal("10.00"))
        Product.objects.create(name="Coca-Cola Zero", sku="C-2", selling_price=Decimal("11.00"))
        Product.objects.create(name="Pepsi", sku="P-1", selling_price=Decimal("10.00"))

        results = find_products_by_name("coca")
        assert results.count() == 2

    def test_case_insensitive(self):
        Product.objects.create(name="Coca-Cola", sku="C-1", selling_price=Decimal("10.00"))
        assert find_products_by_name("COCA").count() == 1
        assert find_products_by_name("coca").count() == 1

    def test_returns_empty_queryset_when_no_match(self):
        results = find_products_by_name("Nonexistent")
        assert results.count() == 0
        assert list(results) == []