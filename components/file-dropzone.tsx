'use client'

import { Plus, Spinner } from '@/components/ui/icons';
import { useState } from 'react';
import { useDropzone } from 'react-dropzone-esm';
import { Card, CardContent } from "./ui/card";

function parseBytesIntoMBAndGB(bytes: number) {
  const mb = bytes / (1024 * 1024)
  return (mb > 1024) ? `${Math.round(mb / 1024)}GB` : `${Math.round(mb)}MB`
}

type FileDropzoneProps = {
  disabled?: boolean
  onDrop?: (_file: File) => void | Promise<void>
  loading?: boolean
  processedLines: number
}

export function FileDropzone({ disabled = false, loading = false, onDrop, processedLines }: FileDropzoneProps) {
  const [fileName, setFileName] = useState('')
  const [fileSize, setFileSize] = useState('0MB')
  
  const { getRootProps, isDragActive, getInputProps } = useDropzone({
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx']
    },
    multiple: false,
    disabled,
    onDrop: ([acceptedFile]) => {
      if (acceptedFile && onDrop) {
        setFileName(acceptedFile.name)
        setFileSize(parseBytesIntoMBAndGB(acceptedFile.size))
        onDrop(acceptedFile);
      }
    },
  });

  return (
    <Card aria-disabled={disabled} {...getRootProps({ role: 'button', 'aria-label': 'drag and drop area' })} className="group focus-visible:ring-ring ring-offset-background cursor-pointer flex flex-1 flex-col items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 aria-disabled:pointer-events-none aria-disabled:opacity-60 bg-gradient-to-r from-green-200 via-green-400 to-primary border-none rounded-lg p-[1px]">
      <CardContent className="text-muted-foreground/40 flex flex-col items-center justify-center p-8 bg-card rounded-lg w-full">
        <div className="flex">
          <div className="border-muted-foreground/20 group-hover:border-primary/80 bg-muted/80 z-10 flex aspect-3/4 w-24 origin-top-right -rotate-[16deg] group-hover:-rotate-[20deg] translate-x-10 group-hover:-translate-x-1 -translate-y-2.5 group-hover:-translate-y-3 transition ease-in-out flex-col gap-y-1 rounded-lg border px-2 py-10 backdrop-blur-sm">
            <div className="bg-muted-foreground/20 group-hover:bg-primary h-2 w-full rounded-2 transition ease-in-out" />
            <div className="bg-muted-foreground/20 group-hover:bg-primary h-2 w-5/6 rounded-2 transition ease-in-out" />
            <div className="bg-muted-foreground/20 group-hover:bg-primary h-2 w-full rounded-2 transition ease-in-out" />
          </div>

          <div className="border-muted-foreground/20 group-hover:border-primary/80 bg-muted/80 z-20 flex aspect-3/4 w-24 flex-col translate-x-0 translate-y-0 group-hover:-translate-y-3 transition ease-in-out items-center justify-center gap-y-1 rounded-lg border px-2 py-10 backdrop-blur-sm">
            <Plus
              strokeWidth="4px"
              className="text-muted-foreground/20 group-hover:text-primary h-12 w-12 transition ease-in-out"
            />
          </div>

          <div className="border-muted-foreground/20 group-hover:border-primary/80 bg-muted/80 z-10 flex aspect-3/4 w-24 origin-top-left rotate-[16deg] group-hover:rotate-[20deg] -translate-x-10 group-hover:translate-x-1 -translate-y-2.5 group-hover:-translate-y-3 transition ease-in-out flex-col gap-y-1 rounded-lg border px-2 py-10 backdrop-blur-sm">
            <div className="bg-muted-foreground/20 group-hover:bg-primary h-2 w-full rounded-2 transition ease-in-out" />
            <div className="bg-muted-foreground/20 group-hover:bg-primary h-2 w-5/6 rounded-2 transition ease-in-out" />
            <div className="bg-muted-foreground/20 group-hover:bg-primary h-2 w-full rounded-2 transition ease-in-out" />
          </div>
        </div>

        <input {...getInputProps()} />

        {loading ? (
          <div className='flex items-center gap-2 mt-8'>
            <Spinner className="animate-spin text-muted-foreground h-5 w-5" />
            <p className="group-hover:text-foreground text-muted-foreground font-medium">Loading</p>
          </div>
        ) : null}

        {!fileName && !loading ? (
          <p className="group-hover:text-foreground text-muted-foreground mt-8 font-medium">
            {isDragActive ? 'Just drop' : 'Add a file'}
          </p>
        ) : null}

        {fileName && !loading ? (
          <p className="group-hover:text-foreground text-muted-foreground mt-8 font-medium">
            {`${fileName} - ${fileSize} - ${processedLines} linhas processadas`}
          </p>
        ) : null}

        {!fileName ? (
          <p className="text-muted-foreground/80 mt-1 text-sm">Drag & drop your file here.</p>
        ) : null}
      </CardContent>
    </Card>
  )
}