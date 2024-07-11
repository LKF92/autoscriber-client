<script setup lang="ts">
import { ref } from 'vue'
import WaveSurfer from 'wavesurfer.js'

const props = defineProps(['recording'])

console.log('recording', props.recording)
const waveformRef = ref<HTMLElement | string>('')

const wavesurfer = WaveSurfer.create({
  container: document.body,
  waveColor: 'rgb(200, 0, 200)',
  progressColor: 'rgb(100, 0, 100)'
  //   url:
})

wavesurfer.on('click', () => {
  wavesurfer.play()
})
</script>

<template>
  <div ref="waveformRef"></div>
</template>
