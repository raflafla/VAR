<template>
  <link rel="shortcut icon" type="image/png" href="../public/ico.ico"/>
    <body>
        

  <div class="min-h-screen bg-zinc-900 text-white p-6 max-w-xl mx-auto space-y-6">

    <form class="space-y-4">
        <h1 class="titulo">VAR</h1>
      <input v-model="nomeVar" placeholder="Seu nome (VAR)" class="input" required/>
      <input v-model="cidadeId" placeholder="ID na cidade" class="input" required/>
      <input v-model="discordId" placeholder="ID do Discord" class="input" required/>

      <select v-model="motivo" class="input" @change="sugerirTempoBan">
        <option disabled value="" >Selecione o motivo</option>
        <option v-for="item in motivos" :key="item.nome" :value="item.nome">
          {{ item.nome }}
        </option>
      </select>

      <input v-model="tempoBan" placeholder="Sugerir tempo de ban (ex: 3 dias, 24h...)" class="input" required/>
      <input v-model="evidencia" placeholder="Link da evidência" class="input" required/>

      <button type="button" class="btn-primary" @click="gerarMensagens">
        Gerar mensagens automáticas
      </button>
    </form>

    <div v-if="avisoBanir" class="alert-banir">
  ⚠️ Lembre-se de aplicar o banimento na cidade manualmente!
</div>

  <div class="mensagembug">
    <div v-if="mensagemDiscord" class="bg-zinc-800 p-4 rounded space-y-6 border border-purple-700">
      <div>
        <h2 class="font-semibold text-purple-300">📄 Modelo para salvar no Discord:</h2>
        <pre class="pre">{{ mensagemDiscord }}</pre>
        <button @click="copiarTexto(mensagemDiscord)" class="btn-copy">Copiar</button>

      </div>

      <div class="modelo-ban">
        <h2 class="font-semibold text-purple-300">⛔ Mensagem de ban:</h2>
        <pre class="pre">{{ mensagemBan }}</pre>
        <button @click="copiarTexto(mensagemBan)" class="btn-copy">Copiar</button>
      </div>
    </div>
  </div>
  </div>
   </body>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const nomeVar = ref('')
const cidadeId = ref('')
const discordId = ref('')
const motivo = ref('')
const tempoBan = ref('')
const evidencia = ref('')

const mensagemDiscord = ref('')
const mensagemReuniao = ref('')
const mensagemBan = ref('')
const historicoMensagens = ref([])
const avisoBanir = ref(false)


const motivos = [
  { nome: 'RDM/VDM', tempo: '3 dias' },
  { nome: 'Powergaming', tempo: '3 dias' },
  { nome: 'Metagaming', tempo: 'Análise' },
  { nome: 'Combatlog', tempo: '3 dias' },
  { nome: 'Flame', tempo: '3~7 dias' },
  { nome: 'Anti RP', tempo: '3 dias' },
  { nome: 'Falta de amor à vida', tempo: '7 dias' },
  { nome: 'Safezone', tempo: '3 dias' },
  { nome: 'Falta de bom senso', tempo: '3 dias' },
  { nome: 'Quebra de regra de ação', tempo: '1 dias' },
  { nome: 'Abuso de bug', tempo: 'Análise' },
  { nome: 'Falta de tela', tempo: 'Indeterminado' }
]

function sugerirTempoBan() {
  const item = motivos.find(m => m.nome === motivo.value)
  tempoBan.value = item ? item.tempo : ''
}

function gerarMensagens() {
  mensagemDiscord.value = `**ID:** ${cidadeId.value}
**ID DISCORD:** ${discordId.value}
**Motivo:** ${motivo.value}
**Tempo:** ${tempoBan.value}
**Provas:** ${evidencia.value}`

  const hoje = new Date()
  const amanha = new Date()
  amanha.setDate(hoje.getDate() + 1)

  const formatarData = (data) => data.toLocaleDateString('pt-BR')

  mensagemReuniao.value = `Boa noite, você está sendo convidado(a) a participar de uma reunião com a Administração. Procure o ${nomeVar.value}, para agendar um horário, na data de hoje ou amanhã (${formatarData(hoje)} ou ${formatarData(amanha)}).  
Caso não corresponda à esta mensagem, uma punição entrará em vigor.`

  mensagemBan.value = `Sua allowlist está sendo removida por ${tempoBan.value}, por conduta inadequada no Complexo XP.  
Segue nossa análise: ${motivo.value}`

  avisoBanir.value = true

  salvarNoHistoricoLocal(mensagemDiscord.value)
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


function salvarNoHistoricoLocal(mensagem) {
  const historico = JSON.parse(localStorage.getItem('historico_var') || '[]')
  historico.unshift(mensagem) 
  localStorage.setItem('historico_var', JSON.stringify(historico))
  historicoMensagens.value = historico
}

function carregarHistoricoLocal() {
  const historico = JSON.parse(localStorage.getItem('historico_var') || '[]')
  historicoMensagens.value = historico
}

onMounted(() => {
  carregarHistoricoLocal()
})
</script>


<style scoped>
@import '@/assets/styles/var.css';
</style>
