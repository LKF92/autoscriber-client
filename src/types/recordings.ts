export type Recordings = {
  id: number
  sessionId: string
  audioFile: BinaryData
  metadata: {
    size: number
    format: string
  }
  timestamp: string
}
