from django.db import models
from products.models import Product


class Sale(models.Model):

    product = models.ForeignKey(
        Product,
        on_delete=models.PROTECT,
        related_name="sales",
    )

    quantity = models.PositiveIntegerField()


    total_cost = models.DecimalField(
        max_digits=10,
        decimal_places=2,
    )

    created_at = models.DateTimeField(auto_now_add=True)