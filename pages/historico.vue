<template>
  <body>
    <div class="min-h-screen bg-zinc-900 text-white p-6 max-w-xl mx-auto space-y-6">
      <div class="navbar">
        <NuxtLink to="/" class="navbar-links">Home</NuxtLink>
        <NuxtLink to="/reuniao" class="navbar-links">Reunião</NuxtLink>
        <NuxtLink to="/historico" class="navbar-links">Histórico</NuxtLink>
      </div>

      <h1 class="titulo">Histórico</h1>

      <div class="busca-container">
        <input
          v-model="termoBusca"
          placeholder="Buscar por ID da cidade ou ID do Discord"
          class="input-busca"
        />
        <button class="btn-buscar" @click="filtrarDenuncias">Buscar</button>
        <button class="btn-limpar" @click="limparFiltro">Limpar</button>
      </div>

      <p class="contador-total">Total de denúncias: <strong>{{ denunciasFiltradas.length }}</strong></p>

      <div v-if="denunciasFiltradas.length" class="space-y-4">
        <div
          v-for="(msg, index) in denunciasFiltradas"
          :key="index"
          class="bg-zinc-800 p-4 rounded border border-zinc-700"
        >
          <pre class="mensagem-discord-historico">
            <p v-for="linha in formatarMensagem(msg)" :key="linha">{{ linha }}</p>
          </pre>
        </div>
      </div>

      <div v-else class="text-zinc-400">
        Nenhuma denúncia encontrada.
      </div>
    </div>
  </body>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const historico = ref([])
const denunciasFiltradas = ref([])
const termoBusca = ref('')

function carregarHistoricoLocal() {
  const data = localStorage.getItem('historico_var')
  historico.value = data ? JSON.parse(data) : []
  denunciasFiltradas.value = [...historico.value]
}

function formatarMensagem(mensagem) {
  return msg.replace(/\*\*/g, '').split('\n')
}

function filtrarDenuncias() {
  const termo = termoBusca.value.toLowerCase().trim()
  denunciasFiltradas.value = historico.value.filter(item =>
    item.toLowerCase().includes(termo)
  )
}

function limparFiltro() {
  termoBusca.value = ''
  denunciasFiltradas.value = [...historico.value]
}

onMounted(() => {
  carregarHistoricoLocal()
})
</script>

<style scoped>
@import '@/assets/styles/var.css';
</style>
