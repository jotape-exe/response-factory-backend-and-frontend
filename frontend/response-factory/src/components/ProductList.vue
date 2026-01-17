<template>
  <div class="scroll">
    <template v-if="products.length == 0 || !products">
      <p>Nenhum produto encontrado</p>
    </template>

    <template v-else>
      <ProductCard
        v-for="p in products"
        :key="p.id"
        :product="p"
        :deleting="deletingId === p.id"
        @delete="$emit('delete', p.id)"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { ProductReponse } from '@/types/product.interface'
import ProductCard from './ProductCard.vue'

defineProps<{
  products: ProductReponse[]
  loading: boolean
  deletingId: number | null
}>()

defineEmits<{ delete: [number] }>()
</script>

<style scoped>
.scroll {
  max-height: 500px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
