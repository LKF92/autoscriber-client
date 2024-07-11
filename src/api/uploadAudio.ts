export async function uploadAudio(blob: Blob) {
  try {
    console.log('Uploading audio data...')
    console.log(blob)
  } catch (error) {
    console.error('Error uploading audio data:', error)
  }
}
