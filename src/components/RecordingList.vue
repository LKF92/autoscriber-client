<script setup lang="ts">
import type { Recordings } from '@/types/recordings'
import SessionVisualizer from './SessionVisualizer.vue'
import { onMounted, ref } from 'vue'

const recordings = ref<Recordings[]>([])

const fetchSessions = async () => {
  const response = await fetch('http://localhost:3000/sessions')
  const data = await response.json()
  console.log('data', data)
  recordings.value = data
}

onMounted(() => {
  fetchSessions()
})
</script>

<template>
  <div>
    <h1>Your recordings</h1>
    <h3>Click on the waveform to listen to your previous recordings.</h3>
    <ul>
      <SessionVisualizer
        v-for="recording in recordings"
        :key="recording.id"
        :recording="recording"
      />
    </ul>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
