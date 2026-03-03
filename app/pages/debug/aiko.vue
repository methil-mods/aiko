<template>
  <div class="debug-page fixed inset-0 bg-black text-white h-screen font-mono flex flex-col overflow-hidden lowercase">
    <header class="p-4 border-b border-zinc-800 flex justify-between items-center z-20 bg-black/80 backdrop-blur-md">
      <div class="flex items-center gap-4">
        <NuxtLink to="/" class="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 rounded text-[10px] transition-colors tracking-tighter border border-zinc-700">
          ← back to monitor
        </NuxtLink>
        <div class="flex flex-col">
          <h1 class="text-sm font-bold text-pink-500 italic tracking-tight">aiko_system_debug_v1.0.4</h1>
          <span class="text-[9px] text-zinc-600 uppercase tracking-[0.2em] leading-none mt-0.5">internal use only</span>
        </div>
      </div>
      <div class="text-[10px] text-zinc-500 flex gap-4">
        <span>rotate: lmb</span>
        <span>pan: rmb</span>
        <span>zoom: scroll</span>
      </div>
    </header>
    
    <main class="flex-1 relative bg-[#050508]">
      <div ref="container" class="absolute inset-0 w-full h-full"></div>
      
      <!-- Overlay UI -->
      <div v-if="loading" class="absolute inset-0 flex items-center justify-center bg-black z-50">
        <div class="flex flex-col items-center gap-3">
          <div class="w-8 h-8 border-2 border-pink-500/20 border-t-pink-500 rounded-full animate-spin"></div>
          <p class="text-[10px] text-pink-500/50 animate-pulse tracking-[0.3em] uppercase">initializing_scene</p>
        </div>
      </div>

      <!-- Debug HUD -->
      <div class="absolute top-6 left-6 p-4 bg-black/60 border border-white/5 backdrop-blur-md rounded-sm pointer-events-none space-y-3 min-w-[180px]">
        <div class="text-zinc-500 text-[9px] font-bold uppercase tracking-widest border-b border-white/5 pb-2 mb-2 italic">diagnostic_feed</div>
        
        <div class="space-y-1.5 text-[11px]">
          <div class="flex justify-between">
            <span class="text-zinc-600">renderer_status</span>
            <span :class="loading ? 'text-yellow-600' : 'text-green-500'">{{ loading ? 'pending' : 'active' }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-zinc-600">pixel_ratio</span>
            <span class="text-zinc-400">{{ pixelRatio }}x</span>
          </div>
          <div class="flex justify-between">
            <span class="text-zinc-600">helpers_vis</span>
            <span class="text-pink-500/80">enabled</span>
          </div>
        </div>

        <div class="pt-2">
          <div class="h-1 w-full bg-zinc-900 rounded-full overflow-hidden">
            <div class="h-full bg-pink-500/40 w-2/3 animate-[pulse_2s_infinite]"></div>
          </div>
        </div>
      </div>

      <!-- Crosshair -->
      <div class="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10">
        <div class="w-8 h-[1px] bg-white"></div>
        <div class="h-8 w-[1px] bg-white absolute"></div>
      </div>
    </main>
    
    <footer class="px-4 py-2 border-t border-zinc-900 bg-black flex justify-between items-center text-[9px] text-zinc-700 font-mono tracking-widest uppercase">
      <span>aiko_core_engine</span>
      <span>2026_build_stable</span>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { AikoThreeScene } from '~/utils/AikoThreeScene'

const container = ref<HTMLElement | null>(null)
const loading = ref(true)
const pixelRatio = ref(1)
let aikoScene: AikoThreeScene | null = null

onMounted(async () => {
  if (!container.value) return
  
  // Wait for next tick to ensure container has dimensions
  await nextTick()
  pixelRatio.value = window.devicePixelRatio
  
  // Initialize scene in DEBUG mode (true)
  aikoScene = new AikoThreeScene(
    container.value, 
    (isLoading) => loading.value = isLoading,
    true
  )

  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  if (aikoScene) {
    aikoScene.destroy()
  }
})

function handleResize() {
  if (aikoScene) {
    aikoScene.handleResize()
  }
}
</script>

<style>
.debug-page {
  -webkit-font-smoothing: none;
}
.debug-page a {
  text-decoration: none;
}
</style>
