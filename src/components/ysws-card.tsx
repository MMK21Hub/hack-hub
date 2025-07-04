// Credit: This component was originally created by ChatGPT, and then refined my me.
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

export interface YSWSEvent {
  name: string
  description: string
  detailedDescription?: string
  website?: string
  slack?: string
  slackChannel?: string
  status: "active" | "ended" | "draft"
  deadline?: string
  ended?: string
  participants?: number
  requirements?: string[]
  steps?: string[]
  details?: string[]
}

interface Props {
  ysws: YSWSEvent
}

export default function YSWSEventCard({ ysws }: Props) {
  return (
    <Card className="w-full max-w-md shadow-lg rounded-2xl border-muted">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{ysws.name}</span>
          <Badge
            variant={
              ysws.status === "active"
                ? "default"
                : ysws.status === "ended"
                ? "destructive"
                : "secondary"
            }
          >
            {ysws.status}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">{ysws.description}</p>
        {ysws.deadline && (
          <p className="text-xs text-muted-foreground">
            Deadline: {new Date(ysws.deadline).toLocaleDateString()}
          </p>
        )}
        {ysws.participants !== undefined && (
          <p className="text-xs text-muted-foreground">
            Participants: {ysws.participants.toLocaleString()}
          </p>
        )}
      </CardContent>
      <CardFooter className="flex gap-2 justify-end">
        {ysws.website && (
          <Button variant="outline" size="sm" asChild>
            <a href={ysws.website} target="_blank" rel="noopener noreferrer">
              Website <ExternalLink className="ml-1 w-4 h-4" />
            </a>
          </Button>
        )}
        {ysws.slack && (
          <Button variant="secondary" size="sm" asChild>
            <a href={ysws.slack} target="_blank" rel="noopener noreferrer">
              Slack
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
