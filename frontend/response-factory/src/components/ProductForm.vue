<template>
    <form class="card" @submit.prevent="submit">
        <h2>Criar produto</h2>


        <input v-model="form.nome" placeholder="Nome" />
        <input v-model="form.descricao" placeholder="Descrição" />
        <input v-model="form.sku" placeholder="SKU" />
        <input type="number" v-model.number="form.valor" placeholder="Preço" />


        <button :disabled="loading">
            {{ loading ? 'Salvando...' : 'Salvar' }}
        </button>
    </form>
</template>


<script setup lang="ts">
import type { CreateProductDTO } from '@/types/product.interface';
import { ref } from 'vue';


const emit = defineEmits<{ submit: [CreateProductDTO] }>()


const props = defineProps<{ loading: boolean }>()


const form = ref<CreateProductDTO>({
    nome: '',
    descricao: '',
    sku: '',
    valor: 0
})


const submit = () => {
    emit('submit', { ...form.value })
}
</script>