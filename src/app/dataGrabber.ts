import { parse as parseYAML } from "yaml"
import { YSWS } from "./YSWS"

export async function fetchYSWSCatalog(): Promise<YSWSCatalog> {
  const response = await fetch("https://ysws.hackclub.com/data.yml")
  if (!response.ok)
    throw new Error(`Failed to fetch YSWS catalog: ${response.statusText}`)
  const text = await response.text()
  const data = parseYAML(text)

  // Quick sanity checks
  if (!data || typeof data !== "object")
    throw new Error("Invalid YSWS catalog format")
  if (!("limitedTime" in data))
    throw new Error("YSWS catalog missing 'limitedTime' section")
  if (!(Array.isArray(data.limitedTime) && data.limitedTime.at(0)?.name))
    throw new Error("Invalid YSWS catalog format")
  // It's probably fine now :shrug:
  return data as any as YSWSCatalog
}

let yswsPromise: Promise<YSWS[]> | null = null

export async function getYSWSItems(): Promise<YSWS[]> {
  if (yswsPromise) return yswsPromise
  yswsPromise = fetchYSWSCatalog().then((catalog) =>
    catalog.limitedTime.concat(catalog.indefinite).map((ysws) => new YSWS(ysws))
  )
  return yswsPromise
}
