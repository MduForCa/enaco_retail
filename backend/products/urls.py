from django.urls import path
from .views import ProductByBarcodeView, ProductBySkuView

urlpatterns = [
    path(
        "barcode/<str:barcode>/",
        ProductByBarcodeView.as_view(),
        name="product-by-barcode",
    ),
    path(
        "sku/<str:sku>/",
        ProductBySkuView.as_view(),
        name="product-by-sku"
    ),
]