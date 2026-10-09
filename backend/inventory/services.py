
from django.db import transaction

from products.models import Product
from .models import Inventory, StockTransaction


@transaction.atomic
def receive_stock(product: Product, quantity: int) -> StockTransaction:
    if quantity <= 0:
        raise ValueError("Quantity must be greater than zero.")

    inventory, _ = Inventory.objects.get_or_create(product=product)
    inventory.quantity += quantity
    inventory.save(update_fields=["quantity", "updated_at"])

    return StockTransaction.objects.create(
        product=product,
        transaction_type="RECEIPT",
        quantity=quantity,
    )