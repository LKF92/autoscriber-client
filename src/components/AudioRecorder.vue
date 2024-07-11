<script setup lang="ts">
import { sendAudioSession } from '@/api/sendAudioSession'
import { sendChunk } from '@/api/sendChunk'
import { RecordRTCPromisesHandler, StereoAudioRecorder } from 'recordrtc'
import { onMounted, ref } from 'vue'
import WaveSurfer from 'wavesurfer.js'
import RecordPlugin from 'wavesurfer.js/dist/plugins/record.esm.js'

const wavesurfer = ref<WaveSurfer | null>(null)
const waveRecorder = ref<RecordPlugin | null>(null)
const waveformRef = ref<HTMLElement | string>('')
const mediaRecorder = ref<RecordRTCPromisesHandler | null>(null)
const audioSessionId = ref<string>('')
const chunkNumber = ref<number>(0)

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

const createMediaRecorder = async () => {
  try {
    // Get access to the microphone for the media recorder
    let stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false })
    mediaRecorder.value = new RecordRTCPromisesHandler(stream, {
      type: 'audio',
      mimeType: 'audio/wav',
      sampleRate: 44100,
      numberOfAudioChannels: 1,
      // good balance between quality and size for voice recordings
      audioBitsPerSecond: 352800,
      // use StereoAudioRecorder for WAV support
      recorderType: StereoAudioRecorder,
      // makes the blobs as chunks of 5000ms
      timeSlice: 5000,
      // this event will be fired every 5000ms and one time at the end of the recording
      ondataavailable: (blob) => sendChunk(audioSessionId.value, chunkNumber.value++, blob)
    })
  } catch (error) {
    console.error('Error accessing microphone:', error)
  }
}

onMounted(async () => {
  createWaveSurfer()
  await createMediaRecorder()
})

const isPaused = ref(false)
const isActive = ref(false)
const isRecording = ref(false)

const startRecording = () => {
  audioSessionId.value = crypto.randomUUID()
  waveRecorder?.value?.startRecording()
  mediaRecorder.value?.startRecording()
  isActive.value = true
  isRecording.value = true
}

const pauseRecording = () => {
  waveRecorder?.value?.pauseRecording()
  mediaRecorder?.value?.pauseRecording()
  isActive.value = false
  isPaused.value = true
}

const resumeRecording = () => {
  waveRecorder?.value?.resumeRecording()
  mediaRecorder?.value?.resumeRecording()
  isPaused.value = false
  isActive.value = true
}

const stopRecording = async () => {
  waveRecorder?.value?.stopRecording()
  await mediaRecorder?.value?.stopRecording()

  isActive.value = false
  isRecording.value = false

  const blob = await mediaRecorder?.value?.getBlob()
  sendAudioSession(audioSessionId.value, blob, { size: blob?.size, format: blob?.type })
}
</script>

<template>
  <button @click="startRecording">Record</button>
  <button @click="pauseRecording" v-if="isRecording && isActive">Pause</button>
  <button @click="resumeRecording" v-if="isRecording && isPaused">Resume</button>
  <button @click="stopRecording" v-if="isRecording">Stop</button>

  <div ref="waveformRef"></div>
</template>
