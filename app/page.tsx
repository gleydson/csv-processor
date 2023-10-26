'use client'

import { DataPreviewTable } from "@/components/data-preview-table";
import { FileDropzone } from "@/components/file-dropzone";
import { GithubLink } from "@/components/github-link";
import { useProcessFile } from "@/hooks/use-process-file";

export default function Home() {
  const { onProcess, processing } = useProcessFile()
  
  return (
    <main className="max-h-screen h-full overflow-hidden relative">
      <div className="h-full p-10 space-y-32">
        <FileDropzone onDrop={onProcess} loading={processing} />
        <DataPreviewTable />
      </div>
      <GithubLink />
    </main>
  )
}
