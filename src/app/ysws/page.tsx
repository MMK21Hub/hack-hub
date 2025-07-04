import { Card } from "@/components/ui/card"
import YSWSEventCard from "@/components/ysws-card"
import { fetchYSWSCatalog } from "../dataGrabber"
import { use } from "react"

export const metadata = {
  title: "YSWS - Hack Hub",
}

const yswsItemsDummy: YSWSEvent[] = [
  {
    name: "Example Event",
    description: "This is an example event for YSWS.",
    detailedDescription: "Detailed information about the example event.",
    website: "https://example.com",
    slack: "https://hackclub.slack.com",
    slackChannel: "#ysws-example",
    status: "active",
    deadline: "2023-12-31T23:59:59Z",
    ended: "2023-11-30T23:59:59Z",
    participants: 100,
    requirements: ["Requirement 1", "Requirement 2"],
    steps: ["Step 1", "Step 2"],
    details: ["Detail 1", "Detail 2"],
  },
]

export default function YSWS() {
  const yswsItems = fetchYSWSCatalog().then((data) =>
    data.limitedTime
      .concat(data.indefinite)
      .filter((ysws) => ysws.status !== "ended")
  )

  return (
    <div className="mx-4 mt-4">
      <p className="mb-4">
        View <strong>You Ship We Ship</strong> events here.
      </p>
      <div className="flex flex-col gap-4">
        {use(yswsItems).map((ysws, index) => (
          <YSWSEventCard key={index} ysws={ysws} />
        ))}
      </div>
    </div>
  )
}
