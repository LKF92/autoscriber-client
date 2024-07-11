interface Metadata {
  size: number
  format: string
}

export async function sendAudioSession(
  sessionId: string,
  audioSession: Blob | undefined,
  metadata: Metadata
) {
  try {
    if (audioSession === undefined) throw new Error('something went wrong with the recording')

    const finalAudio = new FormData()
    finalAudio.append('audioSession', audioSession)

    await fetch('http://localhost:3000/upload-session', {
      method: 'POST',
      headers: {
        sessionId: sessionId,
        size: metadata.size.toString(),
        format: metadata.format
      },
      body: finalAudio
    })
  } catch (error) {
    console.error(error)
  }
}
