from products.models import Product
from .models import Sale
from django.db import transaction

@transaction.atomic

def sell_product(product: Product, quantity: int) -> Sale:

    if quantity <= 0:
        raise ValueError("Quantity must be greater than zero.")

    if quantity > product.stock_quantity:
        raise ValueError("Insufficient stock.")

    total_cost = product.selling_price * quantity

    product.stock_quantity -= quantity

    product.save(update_fields=["stock_quantity", "updated_at"])

    return Sale.objects.create(
        product=product,
        quantity=quantity,
        total_cost=total_cost,
    )