from django.urls import path
from .views import (
    ProductByBarcodeView,
    ProductBySkuView,
    ProductListCreateView,
    )

urlpatterns = [
    
#---Product Catalogue

     path(
         "",
         ProductListCreateView.as_view(),
         name="product-list-create",
     ),


#---Cashier URL Endpoints
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

#------------- Product View or Listing URL EndPoint------------#




