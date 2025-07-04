import { Card } from "@/components/ui/card"
import YSWSEventCard from "@/components/ysws-card"
import { fetchYSWSCatalog } from "../dataGrabber"
import { use } from "react"
import { YSWS } from "../YSWS"

export const metadata = {
  title: "YSWS - Hack Hub",
}

export default function YSWSPage() {
  const yswsItems = fetchYSWSCatalog().then((data) =>
    data.limitedTime
      .concat(data.indefinite)
      .filter((ysws) => ysws.status !== "ended")
      .map((ysws) => new YSWS(ysws))
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
