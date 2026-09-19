import pytest
from decimal import Decimal

from rest_framework.test import APIClient

from products.models import Product


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def sample_product(db):
    return Product.objects.create(
        name="Coca-Cola 500ml",
        sku="COKE-500",
        barcode="5449000000996",
        selling_price=Decimal("12.50"),
    )


@pytest.mark.django_db
class TestProductListCreateView:

    list_url = "/api/products/"

    def test_list_empty(self, api_client):
        response = api_client.get(self.list_url)
        assert response.status_code == 200
        assert response.data == []

    def test_list_returns_all_products(self, api_client):
        Product.objects.create(name="A", sku="A-1", selling_price=Decimal("1.00"))
        Product.objects.create(name="B", sku="B-1", selling_price=Decimal("2.00"))

        response = api_client.get(self.list_url)
        assert response.status_code == 200
        assert len(response.data) == 2

    def test_create_product(self, api_client):
        payload = {
            "name": "New Product",
            "sku": "NEW-001",
            "barcode": "9999999999999",
            "selling_price": "29.99",
        }
        response = api_client.post(self.list_url, payload, format="json")
        assert response.status_code == 201
        assert response.data["name"] == "New Product"
        assert Product.objects.count() == 1

    def test_create_product_without_barcode(self, api_client):
        payload = {
            "name": "No Barcode",
            "sku": "NOBC-001",
            "selling_price": "5.00",
        }
        response = api_client.post(self.list_url, payload, format="json")
        assert response.status_code == 201
        assert response.data["barcode"] is None

    def test_create_product_with_invalid_data(self, api_client):
        payload = {
            "name": "",
            "sku": "",
            "selling_price": "bad",
        }
        response = api_client.post(self.list_url, payload, format="json")
        assert response.status_code == 400
        assert Product.objects.count() == 0

    def test_create_product_with_duplicate_sku(self, api_client, sample_product):
        payload = {
            "name": "Duplicate SKU",
            "sku": sample_product.sku,
            "selling_price": "20.00",
        }
        response = api_client.post(self.list_url, payload, format="json")
        assert response.status_code == 400
        assert "sku" in response.data


@pytest.mark.django_db
class TestProductByBarcodeView:

    def test_get_by_barcode_found(self, api_client, sample_product):
        url = f"/api/products/barcode/{sample_product.barcode}/"
        response = api_client.get(url)
        assert response.status_code == 200
        assert response.data["id"] == sample_product.id
        assert response.data["name"] == "Coca-Cola 500ml"

    def test_get_by_barcode_not_found(self, api_client):
        response = api_client.get("/api/products/barcode/0000000000000/")
        assert response.status_code == 404
        assert "detail" in response.data


@pytest.mark.django_db
class TestProductBySkuView:

    def test_get_by_sku_found(self, api_client, sample_product):
        url = f"/api/products/sku/{sample_product.sku}/"
        response = api_client.get(url)
        assert response.status_code == 200
        assert response.data["id"] == sample_product.id

    def test_get_by_sku_not_found(self, api_client):
        response = api_client.get("/api/products/sku/DOES-NOT-EXIST/")
        assert response.status_code == 404
        assert "detail" in response.data