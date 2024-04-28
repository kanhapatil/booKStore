from django_filters import rest_framework as filters
from .models import StoreItem


class StoreItemFilter(filters.FilterSet):
    itemCategory__category = filters.CharFilter(field_name='itemCategory__category')

    class Meta:
        model = StoreItem
        fields = ['itemCategory__category']
