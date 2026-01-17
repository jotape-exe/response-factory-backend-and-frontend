<template>
<div class="card">
<strong>{{ product.nome }}</strong>
<span>R$ {{ product.valor }}</span>


<button
class="danger"
:disabled="deleting"
@click="$emit('delete')"
>
{{ deleting ? 'Deletando...' : 'Deletar' }}
</button>
</div>
</template>


<script setup lang="ts">
import type { ProductReponse } from '@/types/product.interface';


defineProps<{ product: ProductReponse; deleting: boolean }>()


defineEmits<{ delete: [] }>()
</script>