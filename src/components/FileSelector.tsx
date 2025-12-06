import { useState, useRef } from "react"
import type { ChangeEvent, DragEvent } from "react"
import {
  Trash2,
  Upload,
  CheckCircle2,
  Loader2,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  FileJson,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const REQUIRED_FILES = ["following.json", "followers_1.json"] as const

const ERROR_MESSAGES = {
  duplicateFile: "You can only upload one of each file",
  wrongFile: "You can only upload following.json and followers_1.json",
} as const

type ErrorType = keyof typeof ERROR_MESSAGES | ""

interface FileSelectorProps {
  handleFiles: (files: File[]) => void
  onBack: () => void
}

const FileSelector = ({ handleFiles, onBack }: FileSelectorProps) => {
  const [dragActive, setDragActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errorType, setErrorType] = useState<ErrorType>("")
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [files, setFiles] = useState<File[]>([])

  const isReady = files.length === 2

  const validateFile = (file: File): boolean => {
    if (!REQUIRED_FILES.includes(file.name as (typeof REQUIRED_FILES)[number])) {
      setErrorType("wrongFile")
      return false
    }

    if (files.some((f) => f.name === file.name)) {
      setErrorType("duplicateFile")
      return false
    }

    return true
  }

  const addFiles = (newFiles: FileList) => {
    setErrorType("")
    for (const file of Array.from(newFiles)) {
      if (!validateFile(file)) return
      setFiles((prev) => [...prev, file])
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (!e.target.files?.length) return
    addFiles(e.target.files)
  }

  const handleDrop = (e: DragEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (!e.dataTransfer.files?.[0]) return
    addFiles(e.dataTransfer.files)
  }

  const handleDrag = (active: boolean) => (e: DragEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(active)
  }

  const handleSubmitFile = () => {
    if (!isReady) return
    setIsLoading(true)
    setTimeout(() => {
      handleFiles(files)
      setIsLoading(false)
    }, 500)
  }

  const removeFile = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx))
  }

  const openFileExplorer = () => {
    if (!inputRef.current) return
    inputRef.current.value = ""
    inputRef.current.click()
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl font-bold">Upload Files</CardTitle>
        <CardDescription>
          Select your Instagram data export files
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {!isReady ? (
          <form
            className={`relative p-8 w-full rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer ${
              dragActive
                ? "border-primary bg-primary/10 scale-[1.02]"
                : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50"
            }`}
            onDragEnter={handleDrag(true)}
            onDragOver={handleDrag(true)}
            onDragLeave={handleDrag(false)}
            onDrop={handleDrop}
            onSubmit={(e) => e.preventDefault()}
            onClick={openFileExplorer}
          >
            <input
              placeholder="fileInput"
              className="hidden"
              ref={inputRef}
              type="file"
              multiple
              onChange={handleChange}
              accept=".json"
            />

            <div className="flex flex-col items-center gap-3">
              <div className="p-3 rounded-full bg-primary/10">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">
                  Drop files here or click to browse
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  JSON files only
                </p>
              </div>
            </div>
          </form>
        ) : (
          <div className="p-8 w-full rounded-xl border-2 border-green-500/50 bg-green-500/5 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="p-3 rounded-full bg-green-500/10">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  Ready to analyze
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Both files have been selected
                </p>
              </div>
            </div>
          </div>
        )}

        {files.length > 0 && (
          <div className="space-y-2">
            {files.map((file, idx) => (
              <div
                key={file.name}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 group hover:bg-destructive/10 cursor-pointer transition-colors"
                onClick={() => removeFile(idx)}
              >
                <FileJson className="w-4 h-4 text-muted-foreground shrink-0" />
                <span className="text-sm font-medium flex-1 truncate">
                  {file.name}
                </span>
                <span className="flex items-center gap-1 text-xs text-destructive opacity-0 group-hover:opacity-100 transition-opacity">
                  Remove
                  <Trash2 className="w-3.5 h-3.5" />
                </span>
              </div>
            ))}
          </div>
        )}

        {errorType && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{ERROR_MESSAGES[errorType]}</AlertDescription>
          </Alert>
        )}

        <div className="flex gap-3">
          <Button size="lg" variant="outline" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button
            size="lg"
            className="flex-1 group"
            disabled={!isReady || isLoading}
            onClick={handleSubmitFile}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                Analyze files
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default FileSelector
