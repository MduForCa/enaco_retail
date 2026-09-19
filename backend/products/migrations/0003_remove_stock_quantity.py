from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("products", "0002_product_barcode"),
    ]

    operations = [
        migrations.RunSQL(
            sql="ALTER TABLE products_product DROP COLUMN IF EXISTS stock_quantity;",
            reverse_sql=migrations.RunSQL.noop,
        ),
    ]