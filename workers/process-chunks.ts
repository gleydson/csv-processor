import Papa from 'papaparse';

const converter = (header: string, content: string) => Papa.parse(`${header}\n${content}`, { header: true, dynamicTyping: true })

function paseCsvToJSON(header: string) {
  let csvBuffer = ''
  return new TransformStream({
    transform(chunk, controller) {
      csvBuffer += chunk
      const items = csvBuffer.split(/\n|\r\n/)

      items.slice(0, -1).forEach(item => {
        const parsedCsv = converter(header, item)
        // if (parsedCsv.errors.length > 0) {
        //   console.log(++counter, parsedCsv)
        // }
        if (parsedCsv.errors.length === 0) {
          controller.enqueue(parsedCsv.data[0])
        }
      })
      csvBuffer = items[items.length - 1]
    },
    flush(controller) {
      if (!csvBuffer) return
      const parsedCsv = converter(header, csvBuffer)
      if (parsedCsv.errors.length > 0) return
      controller.enqueue(parsedCsv.data[0])
    }
  })
}

async function processChunks(header: string, chunks: Blob[]) {
  let counter = 0
  for (const chunk of chunks) {
    chunk.stream()
    .pipeThrough(new TextDecoderStream())
    .pipeThrough(paseCsvToJSON(header))
      .pipeTo(new WritableStream({
        write(chunk) {
          console.log(++counter, chunk)
        }
      }))
  }
}

self.onmessage = (event: MessageEvent<{ header: string, chunks: Blob[] }>) => {
  // console.log('recebu', event.data)
  processChunks(event.data.header, event.data.chunks)
  // self.postMessage('hey from worker')
}