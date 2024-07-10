<script setup lang="ts">
import RecordingList from './components/RecordingList.vue'
import AudioRecorder from './components/AudioRecorder.vue'

import { reactive } from 'vue'
import type { Recordings } from './types/recordings'
const data = reactive({
  recordings: [
    {
      id: 1,
      title: 'Recording 1',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
    },
    {
      id: 2,
      title: 'Recording 2',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
    },
    {
      id: 3,
      title: 'Recording 3',
      url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
    }
  ] as Recordings[]
})
</script>

<template>
  <header>
    <div class="wrapper">
      <RecordingList :recordings="data.recordings" />
    </div>
  </header>

  <main>
    <AudioRecorder />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
