function slugify(string: string): string {
  return string.replace(/\W+/g, "-").toLowerCase()
}

function slugFromWebsite(website: URL): string {
  const pathParts = website.pathname.split("/").filter(Boolean)
  if (website.hostname === "github.com") {
    // e.g. https://github.com/hackclub/infill
    return slugify(pathParts[1])
  }
  if (website.hostname === "hackclub.github.io") {
    // e.g. http://hackclub.github.io/hacklet
    return slugify(pathParts[0])
  }
  const domainParts = website.hostname.split(".")
  if (domainParts[1] === "hackclub") {
    // e.g. https://visioneer.hackclub.com
    return slugify(domainParts[0])
  }
  console.warn(`Domain is not in a recognised format: ${website.hostname}`)
  return slugify(website.hostname)
}

export class YSWS {
  name: string
  description: string
  detailedDescription?: string
  website?: URL
  slack?: string
  slackChannel?: string
  status?: YSWSStatus
  deadline?: string
  ended?: string
  participants?: number
  requirements?: string[]
  steps?: string[]
  details?: string[]
  slug: string

  constructor(data: YSWSCatalogItem) {
    this.name = data.name
    this.description = data.description
    this.detailedDescription = data.detailedDescription
    this.website = data.website ? new URL(data.website) : undefined
    this.slack = data.slack
    this.slackChannel = data.slackChannel
    this.status = data.status
    this.deadline = data.deadline
    this.ended = data.ended
    this.participants = data.participants
    this.requirements = data.requirements
    this.steps = data.steps
    this.details = data.details
    this.slug = this.website
      ? slugFromWebsite(this.website)
      : slugify(this.name)
  }

  pageLink() {
    return `/ysws/${this.slug}`
  }

  statusText(): string {
    if (this.status === "active") return "Active"
    if (this.status === "ended") return "Ended"
    if (this.status === "draft") return "Draft"
    return "Unknown"
  }
}
