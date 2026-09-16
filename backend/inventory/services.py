from django.db import transaction

from products.models import Product
from .models import StockTransaction

@transaction.atomic

def receive_stock(product: Product, quantity: int) -> StockTransaction:
    if quantity <= 0:
        raise ValueError("Quantity must be greater than zero.")

    product.stock_quantity += quantity
    product.save(update_fields=["stock_quantity", "updated_at"])

    return StockTransaction.objects.create(
        product=product,
        transaction_type="RECEIPT",
        quantity=quantity,
    )