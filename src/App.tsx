import { useState } from "react"
import { Github } from "lucide-react"
import Intro from "./components/Intro"
import FileSelector from "./components/FileSelector"
import Results from "./components/Results"

type Step = "intro" | "upload" | "results"

function App() {
  const [step, setStep] = useState<Step>("intro")
  const [files, setFiles] = useState<File[]>([])

  const handleGetStarted = () => {
    setStep("upload")
  }

  const handleFiles = (selectedFiles: File[]) => {
    setFiles(selectedFiles)
    setStep("results")
  }

  const handleReset = () => {
    setFiles([])
    setStep("intro")
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg">
        {step === "intro" && (
          <div className="animate-in fade-in duration-300">
            <Intro onGetStarted={handleGetStarted} />
            <a
              href="https://github.com/mpagnoulle/ins-unfollowers/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full inline-flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              View on GitHub
            </a>
          </div>
        )}

        {step === "upload" && (
          <div className="animate-in fade-in duration-300">
            <FileSelector handleFiles={handleFiles} onBack={() => setStep("intro")} />
          </div>
        )}

        {step === "results" && (
          <div className="animate-in fade-in duration-300">
            <Results files={files} onReset={handleReset} />
          </div>
        )}
      </div>
    </main>
  )
}

export default App
