import { ThemeToggle } from "@/components/theme-toggle"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { APP_NAME } from "./brand"
import Image from "next/image"

export default function TopNavbar() {
  return (
    <header className="flex justify-between mx-2 my-2">
      <div className="flex items-center">
        {/* <Image
          src="/logo.png"
          alt="Logo"
          width={40}
          height={40}
          className="rounded-full"
        /> */}
        <span className="ml-2 text-lg font-bold">{APP_NAME}</span>
      </div>
      <NavigationMenu className="">
        <NavigationMenuList>
          {/* <NavigationMenuItem>
            <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Link</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem> */}
          <NavigationMenuItem>
            <NavigationMenuLink href="/">Home</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/big-events">
              Big events
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/ysws">YSWS</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="justify-self-end">
        <ThemeToggle />
      </div>
    </header>
  )
}
