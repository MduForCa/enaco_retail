
import pytest
from decimal import Decimal

from products.models import Product
from inventory.models import Inventory, StockTransaction
from inventory.services import receive_stock


@pytest.mark.django_db
class TestStockTransaction:

    def test_create_receipt_transaction(self):
        product = Product.objects.create(
            name="Coke",
            sku="COKE-001",
            selling_price=Decimal("12.50"),
        )

        transaction = StockTransaction.objects.create(
            product=product,
            transaction_type="RECEIPT",
            quantity=100,
        )

        assert transaction.id is not None
        assert transaction.quantity == 100

    def test_receive_stock_increases_inventory_balance(self):
        product = Product.objects.create(
            name="Water",
            sku="WATER-001",
            selling_price=Decimal("8.00"),
        )

        transaction = receive_stock(product, 10)

        inventory = Inventory.objects.get(product=product)

        assert inventory.quantity == 10
        assert transaction.transaction_type == "RECEIPT"
        assert transaction.quantity == 10

    @pytest.mark.parametrize("quantity", [0, -1])
    def test_receive_stock_rejects_non_positive_quantity(
        self, quantity
    ):
        product = Product.objects.create(
            name="Juice",
            sku="JUICE-001",
            selling_price=Decimal("15.00"),
        )

        with pytest.raises(ValueError, match="greater than zero"):
            receive_stock(product, quantity)

        assert not Inventory.objects.filter(product=product).exists()
        assert not StockTransaction.objects.filter(product=product).exists()