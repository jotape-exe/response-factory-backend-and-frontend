<template>
    <div class="card">
        <strong>{{ product.nome }} - ID:{{ product.id }}</strong>
        <span>R$ {{ product.valor }}</span>
        <span><strong>SKU: </strong>{{ product.sku }}</span>
        <button class="danger" :disabled="deleting" @click="$emit('delete')">
            {{ deleting ? 'Deletando...' : 'Deletar' }}
        </button>
    </div>
</template>

<script setup lang="ts">
import type { ProductReponse } from '@/types/product.interface';

defineProps<{ product: ProductReponse; deleting: boolean }>()

defineEmits<{ delete: [] }>()
</script>
