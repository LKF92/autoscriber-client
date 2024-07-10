<script setup lang="ts">
import WaveSurfer from 'wavesurfer.js'
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.esm.js'
import { ref, onMounted } from 'vue'
import { uploadAudio } from '@/api/uploadAudio'

const wavesurfer = ref<WaveSurfer | null>(null)
const waveRecorder = ref<RecordPlugin | null>(null)
const waveformRef = ref<HTMLElement | string>('')

const createWaveSurfer = () => {
  // Create an instance of WaveSurfer
  if (wavesurfer.value) {
    wavesurfer.value.destroy()
  }

  wavesurfer.value = WaveSurfer.create({
    container: waveformRef.value,
    waveColor: 'rgb(200, 0, 200)',
    barWidth: 3,
    progressColor: 'rgb(100, 0, 100)'
  })

  // Initialize the record plugin for the wave visualizer
  waveRecorder.value = wavesurfer.value.registerPlugin(
    RecordPlugin.create({ scrollingWaveform: true, renderRecordedAudio: true })
  )
}

onMounted(() => {
  createWaveSurfer()
})

const isPaused = ref(false)
const isActive = ref(false)
const isRecording = ref(false)

const startRecording = () => {
  waveRecorder?.value?.startRecording()
  isActive.value = true
  isRecording.value = true
}

const pauseRecording = () => {
  waveRecorder?.value?.pauseRecording()
  isActive.value = false
  isPaused.value = true
}

const resumeRecording = () => {
  waveRecorder?.value?.resumeRecording()
  isPaused.value = false
  isActive.value = true
}

const stopRecording = () => {
  waveRecorder?.value?.stopRecording()
  isActive.value = false
  isRecording.value = false
}
</script>

<template>
  <button @click="startRecording">Record</button>
  <button @click="pauseRecording" v-if="isRecording && isActive">Pause</button>
  <button @click="resumeRecording" v-if="isRecording && isPaused">Resume</button>
  <button @click="stopRecording" v-if="isRecording">Stop</button>

  <div ref="waveformRef"></div>
</template>
