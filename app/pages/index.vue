<template>
  <div class="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center p-4 lg:p-12 selection:bg-pink-500/30">
    <!-- Centered aikocam window -->
    <AikoCam 
      :messages="messages" 
      :is-typing="isTyping"
      @send="handleSend"
    />
    
    <!-- Subtle debug portal -->
    <NuxtLink to="/debug/aiko" class="fixed bottom-6 right-6 text-[9px] text-zinc-900 hover:text-zinc-500 font-mono tracking-[0.3em] no-underline transition-all duration-500 lowercase opacity-50 hover:opacity-100 group">
      <span class="inline-block animate-pulse mr-1">//</span> access_debug_core
    </NuxtLink>

    <div class="fixed bottom-6 left-6 text-[9px] text-zinc-900 font-mono tracking-widest lowercase pointer-events-none opacity-30">
      terminal_status: active_link_stable
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const messages = ref<Message[]>([
  {
    role: 'assistant',
    content: "aikocam version 1.0.4 - system check: ok. remote connection established via secure tunnel. awaiting user input..."
  }
])
const isTyping = ref(false)

async function handleSend(content: string) {
  if (isTyping.value) return
  
  messages.value.push({ role: 'user', content })
  
  isTyping.value = true
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1000))
  
  isTyping.value = false
  messages.value.push({
    role: 'assistant',
    content: getAikoResponse(content)
  })
}

function getAikoResponse(input: string): string {
  const responses = [
    "log file updated. tracking user interaction...",
    "the 3d environment is stable. rendering aiko sub-processes.",
    "data packets received. analyzing sentiment...",
    "i'm here in the virtual workspace. what's the next task?",
    "awaiting further instructions from the primary controller.",
    "stream feed optimization complete. signal strength: 98%.",
    "user footprint logged. maintaining connection stability."
  ]
  const randomIdx = Math.floor(Math.random() * responses.length)
  return responses[randomIdx] ?? "connection stable. awaiting commands."
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background: black;
  overflow: hidden;
}
</style>
