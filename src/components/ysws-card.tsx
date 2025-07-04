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
import { YSWS } from "@/app/YSWS"
import { ExternalLink, Globe, SlackIcon } from "lucide-react"

interface Props {
  ysws: YSWS
}

export default function YSWSEventCard({ ysws }: Props) {
  return (
    <Card className="w-full max-w-lg shadow-lg rounded-2xl border-muted">
      <CardHeader>
        <CardTitle className="text-lg flex justify-between items-center">
          <h2>
            <a href={ysws.pageLink()}>{ysws.name}</a>
          </h2>
          <Badge
            variant={
              ysws.status === "active"
                ? "default"
                : ysws.status === "ended"
                ? "destructive"
                : "secondary"
            }
            className={
              ysws.status === "active"
                ? "bg-green-500 dark:bg-green-800 dark:text-white drop-shadow-[0_0_6px_rgba(34,197,94,0.5)]"
                : ""
            }
          >
            {ysws.statusText()}
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
      <CardFooter className="flex flex-wrap gap-2 justify-end">
        {ysws.website && (
          <Button variant="outline" size="sm" asChild>
            <a href={ysws.website.toString()}>
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
