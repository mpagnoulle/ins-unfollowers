import { ExternalLink, ArrowRight, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface IntroProps {
  onGetStarted: () => void
}

const Intro = ({ onGetStarted }: IntroProps) => {
  return (
    <Card className="shadow-lg">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl font-bold">InsUnfollowers</CardTitle>
        <CardDescription className="text-base">
          Find out who doesn't follow you back on Instagram
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs">
              1
            </span>
            Download your Instagram data
          </h3>
          <p className="text-sm text-muted-foreground pl-7">
            <a
              href="https://github.com/mpagnoulle/ins-unfollowers/blob/main/How%20to%20download%20a%20copy%20of%20my%20information%20on%20Instagram.md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:underline"
            >
              Follow this guide to download your data
              <ExternalLink className="w-3 h-3" />
            </a>
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs">
              2
            </span>
            Upload the required files
          </h3>
          <div className="pl-7 flex gap-2">
            <code className="px-2 py-1 text-xs rounded bg-muted font-mono">
              following.json
            </code>
            <code className="px-2 py-1 text-xs rounded bg-muted font-mono">
              followers_1.json
            </code>
          </div>
        </div>

        <Alert className="border-primary/20 bg-primary/5">
          <Info className="h-4 w-4 text-primary" />
          <AlertTitle className="text-sm font-medium">Privacy first</AlertTitle>
          <AlertDescription className="text-xs text-muted-foreground">
            All processing happens locally in your browser. No data is sent to any server.
          </AlertDescription>
        </Alert>

        <Button size="lg" className="w-full group" onClick={onGetStarted}>
          Get started
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  )
}

export default Intro
