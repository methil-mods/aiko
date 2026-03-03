<template>
  <div class="w-full max-w-5xl bg-[#ece9d8] border-[3px] border-[#0054e3] rounded-t-lg shadow-2xl flex flex-col pointer-events-auto overflow-hidden">
    
    <!-- XP Title Bar -->
    <div class="bg-gradient-to-b from-[#0058e6] via-[#0058e6] to-[#0038a8] text-white px-3 py-1.5 flex items-center justify-between select-none rounded-t-lg">
      <div class="flex items-center gap-2">
        <img src="/favicon.ico" class="w-4 h-4" alt="" />
        <span class="text-sm font-bold drop-shadow-md italic lowercase tracking-tight">aiko cam live</span>
      </div>
      <div class="flex gap-0.5">
        <!-- Minimize -->
        <button class="w-5 h-5 bg-[#0058e6] border border-white/40 flex items-center justify-center hover:brightness-110 active:brightness-90 shadow-sm">
          <div class="w-2 h-[2px] bg-white translate-y-1"></div>
        </button>
        <!-- Maximize -->
        <button class="w-5 h-5 bg-[#0058e6] border border-white/40 flex items-center justify-center hover:brightness-110 active:brightness-90 shadow-sm">
          <div class="w-2.5 h-2.5 border-2 border-white"></div>
        </button>
        <!-- Close -->
        <button class="w-5 h-5 bg-[#e91010] border border-white/40 flex items-center justify-center hover:bg-[#ff0000] active:bg-[#c00000] shadow-sm ml-0.5">
          <span class="text-xs font-bold leading-none -translate-y-0.5">×</span>
        </button>
      </div>
    </div>

    <!-- XP Menu Bar -->
    <div class="px-2 py-0.5 border-b border-zinc-300 text-[11px] text-black space-x-3 bg-[#ece9d8] lowercase">
      <span class="hover:bg-[#316ac5] hover:text-white px-1 pointer-events-auto cursor-default">file</span>
      <span class="hover:bg-[#316ac5] hover:text-white px-1 pointer-events-auto cursor-default">edit</span>
      <span class="hover:bg-[#316ac5] hover:text-white px-1 pointer-events-auto cursor-default">view</span>
      <span class="hover:bg-[#316ac5] hover:text-white px-1 pointer-events-auto cursor-default">tools</span>
      <span class="hover:bg-[#316ac5] hover:text-white px-1 pointer-events-auto cursor-default">help</span>
    </div>

    <!-- Main Body -->
    <div class="flex flex-col lg:flex-row h-[75vh] lg:h-[65vh] bg-white border-t border-zinc-400">
      <!-- Image Viewport (3D Scene) -->
      <div class="flex-1 bg-black relative overflow-hidden flex items-center justify-center border-r-[2px] border-[#ece9d8]">
        <AikoWindowScene />
        
        <div class="absolute top-4 left-4 bg-red-600/80 backdrop-blur-sm text-white text-[10px] px-2 py-1 font-bold animate-pulse rounded-sm border border-red-400 flex items-center gap-1 lowercase">
          <div class="w-1.5 h-1.5 bg-white rounded-full"></div>
          rec 02:45:12
        </div>
        
        <div class="absolute bottom-4 right-4 text-white/50 text-[10px] font-mono tracking-widest pointer-events-none lowercase">
          720p // aiko_cam_feed
        </div>
      </div>

      <!-- Chat Area (XP Style) -->
      <div class="w-full lg:w-[400px] flex flex-col bg-[#fff] border-l border-zinc-200">
        <div class="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50/30">
          <div v-for="(msg, idx) in messages" :key="idx" class="fade-in">
            <div class="flex items-baseline gap-2 mb-1">
              <span :class="[
                'text-[10px] font-bold lowercase tracking-wider font-mono',
                msg.role === 'assistant' ? 'text-[#0054e3]' : 'text-zinc-600'
              ]">
                {{ msg.role === 'assistant' ? 'aiko_admin' : 'root_user' }}
              </span>
              <span class="text-[9px] text-zinc-400">13:52</span>
            </div>
            <p class="text-[13px] leading-relaxed text-black font-normal bg-white p-2 border border-zinc-100 shadow-sm rounded-r-md rounded-bl-md">
              {{ msg.content }}
            </p>
          </div>
          <div v-if="isTyping" class="flex gap-1 py-1">
            <div class="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-bounce"></div>
            <div class="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
            <div class="w-1.5 h-1.5 bg-zinc-300 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
          </div>
        </div>

        <!-- XP Style Input Area -->
        <div class="p-4 bg-[#ece9d8] border-t border-zinc-400">
          <form @submit.prevent="onSend" class="flex gap-2">
            <input 
              v-model="input"
              type="text" 
              placeholder="message aiko..." 
              class="flex-1 bg-white px-3 py-2 text-[13px] text-black border-[2px] border-zinc-500 focus:border-[#0054e3] focus:outline-none shadow-inner lowercase"
            />
            <button 
              type="submit"
              :disabled="!input.trim() || isTyping"
              class="px-6 bg-[#ece9d8] text-black text-xs font-bold border-[2px] border-zinc-400 active:border-zinc-600 hover:bg-[#f1efe2] disabled:opacity-50 shadow-sm lowercase"
            >
              send
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  messages: Array<{ role: 'user' | 'assistant', content: string }>
  isTyping: boolean
}>()

const emit = defineEmits(['send'])
const input = ref('')

function onSend() {
  if (!input.value.trim()) return
  emit('send', input.value)
  input.value = ''
}
</script>

<style scoped>
.fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateX(-5px); }
  to { opacity: 1; transform: translateX(0); }
}

/* Scrollbar Style XP */
::-webkit-scrollbar {
  width: 16px;
  background: #f0f0f0;
}
::-webkit-scrollbar-thumb {
  background: #d4d0c8;
  border: 2px solid #f0f0f0;
  box-shadow: inset 1px 1px #fff, inset -1px -1px #808080;
}
::-webkit-scrollbar-thumb:hover {
  background: #e4e0d8;
}
</style>
