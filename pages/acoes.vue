<template>
 
    <body>
  <div class="min-h-screen bg-zinc-900 text-white p-6 max-w-xl mx-auto space-y-6">



    <form class="space-y-4">
        <h1 class="titulo">Solicitação de Tela</h1>
      <input v-model="nomeVar" placeholder="Seu nome (VAR)" class="input" required/>

      <select v-model="motivo" class="input">
        <option disabled value="" >Selecione a ação</option>
        <option v-for="item in motivos" :key="item.nome" :value="item.nome">
          {{ item.nome }}
        </option>
      </select>
      <button type="button" class="btn-primary" @click="gerarMensagens">
        Gerar mensagens automáticas
      </button>
    </form>
      <div class="mensagembug" v-if="mensagemBan">
        <h2 class="font-semibold text-purple-300">⛔ Mensagem de Solicitação de Tela:</h2>
        <pre class="pre">{{ mensagemBan }}</pre>
        <button @click="copiarTexto(mensagemBan)" class="btn-copy">Copiar</button>
      </div>
    </div>

<footerb></footerb>
   </body>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const nomeVar = ref('')
const mensagemBan = ref('')
const motivo = ref('')


const motivos = [
  { nome: 'Joalheria'},
  { nome: 'Banco Central'},
  { nome: 'Fleeca Shopping'},
  { nome: 'Fleeca Praia'},
  { nome: 'Helicrash'},
  { nome: 'Banco Paleto' },
  { nome: 'Carro Forte Açogue'},
  { nome: 'Carro Forte Faculdade'},
  { nome: 'Carro Forte Groove'},
  { nome: 'Mergulhador'},
  { nome: 'Ammunation'},
  { nome: 'Loja de Bebidas'},
  { nome: 'GrapeSeed'},
  { nome: 'Sucata' }
]


function gerarMensagens() {
  const hoje = new Date()
  const amanha = new Date()
  amanha.setDate(hoje.getDate() + 1)

  mensagemBan.value = `Boa noite, devido a sua ultima ação ${motivo.value} procure o ${nomeVar.value}, para enviar a gravação da tela completa e sem cortes.`
}

function copiarTexto(texto) {
  if (!texto || typeof texto !== 'string') {
    alert('Texto inválido ou vazio.')
    return
  }

  navigator.clipboard.writeText(texto)
    .then(() => alert('Texto copiado com sucesso!'))
    .catch(() => alert('Erro ao copiar texto.'))
}

</script>
<style scoped>
@import '@/assets/styles/var.css';
</style>
