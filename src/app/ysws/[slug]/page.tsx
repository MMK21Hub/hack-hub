import { getYSWSItems } from "@/app/dataGrabber"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircleIcon, ExternalLink, Globe, SlackIcon } from "lucide-react"
import { notFound } from "next/navigation"
import { use } from "react"
import { Badge } from "@/components/ui/badge"

export default function Page({ params }: { params: { slug: string } }) {
  const yswsItems = use(getYSWSItems())
  const { slug } = params
  const ysws = yswsItems.find((item) => item.slug === slug)
  if (!ysws) notFound()

  return (
    <div className="mx-auto max-w-4xl px-4 mt-12">
      <div className="text-center mb-8">
        <h1 className="font-bold text-5xl mb-2">{ysws.name}</h1>
        {ysws.status && (
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
        )}
        {ysws.deadline && (
          <p className="text-sm text-muted-foreground mt-1">
            Ends {new Date(ysws.deadline).toLocaleDateString()}
          </p>
        )}
        {ysws.participants !== undefined && (
          <p className="text-sm text-muted-foreground mt-1">
            {ysws.participants.toLocaleString()} participants
          </p>
        )}
      </div>

      <div className="space-y-6">
        <h3 className="text-2xl font-semibold mb-2">Description</h3>
        <p className="text-lg text-muted-foreground">{ysws.description}</p>

        {ysws.detailedDescription && (
          <div className="prose dark:prose-invert">
            <p>{ysws.detailedDescription}</p>
          </div>
        )}

        {ysws.requirements && ysws.requirements.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Requirements</h2>
            <ul className="list-disc pl-5 text-muted-foreground">
              {ysws.requirements.map((req, i) => (
                <li key={i}>{req}</li>
              ))}
            </ul>
          </div>
        )}

        {ysws.steps && ysws.steps.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-2">How to Join</h2>
            <ol className="list-decimal pl-5 text-muted-foreground space-y-1">
              {ysws.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        )}

        {ysws.details && ysws.details.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Details</h2>
            <ul className="list-disc pl-5 text-muted-foreground">
              {ysws.details.map((detail, i) => (
                <li key={i}>{detail}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-wrap gap-3 justify-start">
        {ysws.website && (
          <Button variant="outline" size="sm" asChild>
            <a
              href={ysws.website.toString()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Globe className="mr-1 w-4 h-4" />
              Website <ExternalLink className="ml-1 w-4 h-4" />
            </a>
          </Button>
        )}
        {ysws.slack && (
          <Button variant="outline" size="sm" asChild>
            <a href={ysws.slack} target="_blank" rel="noopener noreferrer">
              <SlackIcon className="mr-1 w-4 h-4" />
              Slack Channel <ExternalLink className="ml-1 w-4 h-4" />
            </a>
          </Button>
        )}
      </div>
    </div>
  )
}
