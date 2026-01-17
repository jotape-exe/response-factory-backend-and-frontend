<template>
  <form class="card" @submit.prevent="submit">
    <h2>Criar produto</h2>

    <div class="field">
      <input v-model="form.nome" placeholder="Nome" />
      <small v-if="props.errors?.nome" class="error">
        {{ props.errors.nome }}
      </small>
    </div>

    <div class="field">
      <input v-model="form.descricao" placeholder="Descrição" />
      <small v-if="props.errors?.descricao" class="error">
        {{ props.errors.descricao }}
      </small>
    </div>

    <div class="field">
      <input v-model="form.sku" placeholder="SKU" />
      <small v-if="props.errors?.sku" class="error">
        {{ props.errors.sku }}
      </small>
    </div>

    <div class="field">
      <input type="number" v-model.number="form.valor" placeholder="Preço" />
      <small v-if="props.errors?.valor" class="error">
        {{ props.errors.valor }}
      </small>
    </div>

    <button :disabled="loading">
      {{ loading ? 'Salvando...' : 'Salvar' }}
    </button>
  </form>
</template>
<script setup lang="ts">
import type { CreateProductDTO } from '@/types/product.interface'
import { ref } from 'vue'

const emit = defineEmits<{ submit: [CreateProductDTO] }>()

const props = defineProps<{
  loading: boolean
  errors?: Partial<Record<keyof CreateProductDTO, string>>
}>()

const form = ref<CreateProductDTO>({
  nome: '',
  descricao: '',
  sku: '',
  valor: 0,
})

const submit = () => {
  emit('submit', { ...form.value })
}
</script>

<style lang="css" scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.error {
  font-size: 12px;
  color: #e74c3c;
}
</style>
