import { getYSWSItems } from "@/app/dataGrabber"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircleIcon } from "lucide-react"
import { notFound } from "next/navigation"
import { use } from "react"

export default function Page({ params }: { params: { slug: string } }) {
  const yswsItems = use(getYSWSItems())
  const { slug } = params
  const ysws = yswsItems.find((item) => item.slug === slug)
  if (!ysws) {
    notFound()
    // return (
    //   <Alert variant="destructive">
    //     <AlertCircleIcon />
    //     <AlertTitle>Failed to find YSWS</AlertTitle>
    //     <AlertDescription>
    //       <p>
    //         The YSWS with slug <code>{slug}</code> could not be found. This is
    //         probably a bug.
    //       </p>
    //     </AlertDescription>
    //   </Alert>
    // )
  }
  return (
    <div className="mx-4 mt-4">
      <h1 className="w-full text-center font-bold text-6xl mt-12 mb-4">
        {ysws.name}
      </h1>
    </div>
  )
}
