<template>
    <body>
  <div class="min-h-screen bg-zinc-900 text-white p-6 max-w-xl mx-auto space-y-6">



    <form class="space-y-4">
        <h1 class="titulo">Reunião</h1>
      <input v-model="nomeVar" placeholder="Seu nome (VAR)" class="input" />
      <button type="button" @click="gerarMensagem" class="btn-primary">Gerar mensagem</button>
    </form>
    
    <div v-if="mensagem" class="mensagem-var">
      <pre class="text-white whitespace-pre-wrap">{{ mensagem }}</pre>
      <button @click="copiarTexto(mensagem)" class="btn-copy">Copiar</button>
    </div>
  </div>
  </body>
</template>

<script setup>
import { ref } from 'vue'

const nomeVar = ref('')
const mensagem = ref('')

function gerarMensagem() {
  const hoje = new Date()
  const amanha = new Date()
  amanha.setDate(hoje.getDate() + 1)

  const formatarData = (data) => data.toLocaleDateString('pt-BR')

  mensagem.value = `Boa noite, você está sendo convidado(a) a participar de uma reunião com a Administração. Procure o ${nomeVar.value}, para agendar um horário, na data de hoje ou amanhã (${formatarData(hoje)} ou ${formatarData(amanha)}).  
Caso não corresponda à esta mensagem, uma punição entrará em vigor.`
}

function copiarTexto(texto) {
  navigator.clipboard.writeText(texto)
    .then(() => alert('Texto copiado com sucesso!'))
    .catch(() => alert('Erro ao copiar texto.'))
}
</script>

<style scoped>
@import '@/assets/styles/var.css';
</style>
