<template>
    <body>
        
  <div class="min-h-screen bg-zinc-900 text-white p-6 max-w-xl mx-auto space-y-6">
    <div class="navbar">
    <NuxtLink to="/" class="navbar-links">Home</NuxtLink>
    <NuxtLink to="/reuniao" class="navbar-links">Reunião</NuxtLink>
    <NuxtLink to="/historico" class="navbar-links">Historico</NuxtLink>
    </div>
    <div v-if="historico.length" class="space-y-4">
        <h1 class="titulo">Histórico</h1>
      <div v-for="(msg, index) in historico" :key="index" class="bg-zinc-800 p-4 rounded border border-zinc-700">
        <pre class="text-white whitespace-pre-wrap">{{ msg }}</pre>
        <button @click="copiarTexto(msg)" class="btn-copy mt-2">Copiar</button>
      </div>
    </div>
    <div v-else class="text-zinc-400">
      Nenhuma mensagem gerada ainda.
    </div>
  </div>
  </body>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const historico = ref([])

function carregarHistoricoLocal() {
  const data = localStorage.getItem('historico_var')
  historico.value = data ? JSON.parse(data) : []
}

function copiarTexto(texto) {
  navigator.clipboard.writeText(texto)
    .then(() => alert('Texto copiado com sucesso!'))
    .catch(() => alert('Erro ao copiar texto.'))
}

onMounted(() => {
  carregarHistoricoLocal()
})
</script>

<style scoped>
@import '@/assets/styles/var.css';
</style>
