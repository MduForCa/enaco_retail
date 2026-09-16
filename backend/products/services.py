from .models import Product

def find_product_by_barcode(barcode: str)  -> Product:
    return Product.objects.get(barcode=barcode)

def find_product_by_sku(sku: str) -> Product:
    return Product.objects.get(sku=sku)

def find_products_by_name(search_term: str):
    return Product.objects.filter(name__icontains=search_term)
    
