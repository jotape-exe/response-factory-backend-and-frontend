<template>
  <div class="page">
    <h1>Produtos</h1>


    <!-- TOOLBAR -->
    <div class="toolbar">
      <button @click="fetchProducts">Listar tudo</button>


      <div class="inline">
        <input v-model="searchId" placeholder="Buscar por ID" />
        <button @click="fetchById">Buscar</button>
      </div>


      <button @click="seed">Carga inicial</button>
      <button class="danger" @click="forceError">Erro 500</button>
    </div>


    <!-- CONTENT -->
    <div class="content">
      <ProductForm :loading="loading.create" :errors="formErrors" @submit="handleCreate" />


      <ProductList :products="products" :loading="loading.list" :deleting-id="loading.delete" @delete="handleDelete" />
    </div>
  </div>
</template>


<script setup lang="ts">
import { useAPI } from '@/services/api'
import type { CreateProductDTO, ProductReponse } from '@/types/product.interface'
import { onMounted, reactive, ref } from 'vue'
import ProductForm from '../components/ProductForm.vue'
import ProductList from '../components/ProductList.vue'
import { useToast } from '../composables/useToast'
import type { FormErrors } from '../types/form-errors.interface'
import { mapErrors } from '../utils/form.utils'


const toast = useToast()
const { services } = useAPI()

const formErrors = ref<FormErrors<CreateProductDTO>>({})
const products = ref<ProductReponse[]>([])
const searchId = ref('')


const loading = reactive({
  list: false,
  create: false,
  delete: null as number | null
})


const fetchProducts = async () => {
  loading.list = true
  const res = await services.product.getAll()

  toast.show({
    message: res.message,
    variant: res.success ? 'success' : 'warning'
  })
  if (res.success && res.body) products.value = res.body
  loading.list = false
}


const fetchById = async () => {
  if (!searchId.value) return
  loading.list = true
  const res = await services.product.getById(searchId.value)
  toast.show({
    message: res.message,
    variant: res.success ? 'success' : 'warning'
  })
  if (res.success && res.body) products.value = [res.body]
  loading.list = false
}

const handleCreate = async (payload: CreateProductDTO) => {
  loading.create = true
  const res = await services.product.insert(payload)
  toast.show({
    message: res.message,
    variant: res.success ? 'success' : 'warning'
  })
  if (res.success) {
    formErrors.value = {}
    await fetchProducts()
  } else {
    formErrors.value = mapErrors(res.error.details)
  }
  loading.create = false
}



const handleDelete = async (id: number) => {
  loading.delete = id
  const { success, message } = await services.product.delete(id)
  toast.show({
    message,
    variant: success ? 'error' : 'warning'
  })
  if (success) products.value = products.value.filter(p => p.id !== id)
  loading.delete = null
}

const seed = async () => {
  const { message, success } = await services.product.seed()
  toast.show({
    message,
    variant: success ? 'success' : 'warning'
  })
  await fetchProducts()
}

const forceError = async () => {
  const { message, success } = await services.product.forceError500()
  toast.show({
    message,
    variant: success ? 'success' : 'error'
  })
}

onMounted(fetchProducts)
</script>

<style scoped>
.page {
  max-width: 1200px;
  margin: 40px auto;
}


.toolbar {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}


.inline {
  display: flex;
  gap: 8px;
}


.content {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 24px;
}
</style>