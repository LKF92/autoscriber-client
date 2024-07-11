export async function sendChunk(sessionId: string, chunkNumber: number, chunk: Blob) {
  await fetch('http://localhost:3000/upload-chunk', {
    method: 'POST',
    headers: {
      'Content-Type': 'audio/wav',
      sessionId: sessionId,
      chunkNumber: chunkNumber.toString()
    },
    body: chunk
  })
}
