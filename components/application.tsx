'use client'

import { DataPreviewTable } from "@/components/data-preview-table";
import { useProcessFile } from "@/hooks/use-process-file";
import { FileDropzone } from "./file-dropzone";

export function Application() {
  const { onProcess, processing } = useProcessFile()

  return (
    <main className="min-h-screen p-10 space-y-40">
      <FileDropzone onDrop={onProcess} loading={processing} />
      <DataPreviewTable />
    </main>
  )
}
