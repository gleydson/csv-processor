import { useCallback, useEffect, useMemo, useState } from "react";

const one_mb = 1024 * 1024

function getFirstLine(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const textDecoder = new TextDecoder()
    const reader = new FileReader()
    reader.readAsText(file.slice(0, one_mb))

    reader.onload = event => {
      const text = typeof event.target?.result === 'string' ?
        event.target.result :
        textDecoder.decode(event.target?.result ?? undefined)
      const firstLine = text.split(/\n|\r\n/)[0]
      resolve(firstLine)
    }

    reader.onerror = reject
  })
}

async function splitFile(file: File, chunkSize: number) {
  const chunks = []
  let offset = 0
  const header = await getFirstLine(file)

  while (offset < file.size) {
    let start = offset
    const end = Math.min(offset + chunkSize, file.size)

    if (chunks.length === 0) {
      start = header.length + 1
    }

    const chunk = file.slice(start, end)
    chunks.push(chunk)
    offset = end
  }

  return { header, chunks }
}

export function useProcessFile() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isWorkerReady, setIsWorkerReady] = useState(false)

  const processChunks = useMemo<Worker>(
    () => new Worker(new URL('../workers/process-chunks.ts', import.meta.url), { type: 'module' }),
    []
  )

  useEffect(() => {
    if (window.Worker) {
      setIsWorkerReady(true)
    }
  }, [])

  const onProcess = useCallback(async (file: File) => {
    const chunkSize = one_mb
    const { header, chunks } = await splitFile(file, chunkSize)
    processChunks.postMessage({ header, chunks })
  }, [processChunks])

  return { onProcess, processing: isProcessing }
}