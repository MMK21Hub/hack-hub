function slugify(string: string): string {
  return string.replace(/\W+/g, "-").toLowerCase()
}

function slugFromWebsite(website: URL): string {
  const domainParts = website.hostname.split(".")
  if (domainParts[1] !== "hackclub") {
    console.warn(
      `Domain does not look like a Hack Club domain: ${website.hostname}`
    )
    return slugify(website.hostname)
  }
  return slugify(domainParts[0])
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
}
