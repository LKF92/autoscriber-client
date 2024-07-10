<script setup lang="ts">
import type { Recordings } from '@/types/recordings'

defineProps<{
  recordings: Recordings[]
}>()
</script>

<template>
  <div class="greetings">
    <h1>Your recordings</h1>
    <h3>Click on the play button to listen to your recordings.</h3>
    <ul>
      <li v-for="recording in recordings" :key="recording.id">
        <!-- <audio :src="recording.url" controls></audio> -->
        <span>{{ recording.title }}</span>
      </li>
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
