from django.db import models
from products.models import Product

class StockTransaction(models.Model):
    TRANSACTION_TYPES = [
        ("RECEIPT", "stock Receipt"),
        ("SALE", "Sale"),
    ]

    product = models.ForeignKey(
        Product,
        on_delete=models.PROTECT,
        related_name="stock_transactions",
    )

    transaction_type = models.CharField(
        max_length=20,
        choices=TRANSACTION_TYPES,
    )

    quantity = models.PositiveIntegerField()

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.product.name} - {self.transaction_type} - {self.quantity}"
