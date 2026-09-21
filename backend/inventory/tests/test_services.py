import pytest
from decimal import Decimal
from products.models import Product
from inventory.models import StockTransaction

@pytest.mark.django_db
class TestStockTransaction:

    def test_create_receipt_transaction(self):
        product = Product.objects.create(
            name="Coke", sku="COKE-001", selling_price=Decimal("12.50"),

        )

        transaction = StockTransaction.objects.create(
            product=product,
            transaction_type="RECEIPT",
            quantity=100,
        )

        assert transaction.id is not None
        assert transaction.quantity == 100