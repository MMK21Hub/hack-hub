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
import { ExternalLink, Globe, SlackIcon } from "lucide-react"

interface Props {
  ysws: YSWSEvent
}

function statusText(status?: YSWSStatus): string {
  if (status === "active") return "Active"
  if (status === "ended") return "Ended"
  if (status === "draft") return "Draft"
  return "Unknown"
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
            {statusText(ysws.status)}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">{ysws.description}</p>
        {ysws.deadline && (
          <p className="text-xs text-muted-foreground">
            Ends {new Date(ysws.deadline).toLocaleDateString()}
          </p>
        )}
        {ysws.participants !== undefined && (
          <p className="text-xs text-muted-foreground">
            {ysws.participants.toLocaleString()} participants
          </p>
        )}
      </CardContent>
      <CardFooter className="flex gap-2 justify-end">
        {ysws.website && (
          <Button variant="outline" size="sm" asChild>
            <a href={ysws.website}>
              <Globe />
              Website <ExternalLink className="ml-1 w-4 h-4" />
            </a>
          </Button>
        )}
        {ysws.slack && (
          <Button variant="outline" size="sm" asChild>
            <a href={ysws.slack}>
              <SlackIcon />
              Slack channel <ExternalLink className="ml-1 w-4 h-4" />
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
