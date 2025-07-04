import YSWSEventCard from "@/components/ysws-card"
import { getYSWSItems } from "../dataGrabber"
import { use } from "react"

export const metadata = {
  title: "YSWS - Hack Hub",
}

export default function YSWSPage() {
  const yswsItems = use(
    getYSWSItems().then((catalog) =>
      catalog.filter((ysws) => ysws.status !== "ended")
    )
  )

  return (
    <div className="mx-4 mt-4">
      <p className="mb-4">
        View <strong>You Ship We Ship</strong> events here.
      </p>
      <div className="flex flex-col gap-4">
        {yswsItems.map((ysws, index) => (
          <YSWSEventCard key={index} ysws={ysws} />
        ))}
      </div>
    </div>
  )
}
