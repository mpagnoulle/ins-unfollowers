import { useState, useEffect } from "react"
import { ExternalLink, Users, UserX, RotateCcw } from "lucide-react"
import { formatTimestamp } from "@/lib/utils"
import { type Following, findUnfollowers } from "@/lib/instagram"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface ResultsProps {
  files: File[]
  onReset: () => void
}

const Results = ({ files, onReset }: ResultsProps) => {
  const [unfollowers, setUnfollowers] = useState<Following[] | null>(null)

  useEffect(() => {
    if (!files.length) return
    findUnfollowers(files)
      .then(setUnfollowers)
      .catch((error) => console.error("Error parsing JSON files:", error))
  }, [files])

  const isDisplayed = unfollowers !== null && files.length > 0

  return (
    <Card
      className={`shadow-lg transition-all duration-500 ease-out ${
        isDisplayed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <CardHeader className="text-center pb-2">
        <div className="mx-auto p-3 rounded-full bg-destructive/10 w-fit mb-2">
          <UserX className="w-6 h-6 text-destructive" />
        </div>
        <CardTitle className="text-2xl font-bold">Non-Followers</CardTitle>
        <CardDescription>
          {unfollowers?.length ?? 0} {unfollowers?.length === 1 ? "person doesn't" : "people don't"} follow you back
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {unfollowers && unfollowers.length > 0 ? (
          <ScrollArea className="h-[350px] pr-3">
            <div className="space-y-2">
              {unfollowers.map((unfollower) => (
                <a
                  key={unfollower.title}
                  href={`https://instagram.com/${unfollower.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-accent transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-primary/70" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground truncate">
                      @{unfollower.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Followed on {formatTimestamp(unfollower.string_list_data[0].timestamp)}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </a>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">Everyone you follow follows you back!</p>
          </div>
        )}

        <Button size="lg" variant="outline" className="w-full" onClick={onReset}>
          <RotateCcw className="mr-2 h-4 w-4" />
          Start over
        </Button>
      </CardContent>
    </Card>
  )
}

export default Results
