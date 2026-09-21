from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("products", "0003_remove_stock_quantity"),
    ]

    operations = [
        migrations.SeparateDatabaseAndState(
            state_operations=[
                migrations.RemoveField(
                    model_name="product",
                    name="stock_quantity",
                ),
            ],
            database_operations=[],
        ),
    ]