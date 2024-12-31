"use client";
import { cn } from "@/lib/utils";
import { Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { useEffect } from "react";

export default function ProjectNav({ id }: { id: string }) {
  const pathname = usePathname();

  // Normalize paths by removing trailing slashes
  const normalizedPathname = pathname?.replace(/\/$/, "");

  useEffect(() => {
    console.log("Current pathname:", pathname);
    console.log("Normalized pathname:", normalizedPathname);
  }, [pathname, normalizedPathname]);

  const navItems = [
    { href: `/p/${id}`, label: "Home", icon: Home },
    { href: `/p/${id}/experiments`, label: "Experiments" },
    { href: `/p/${id}/test-cases`, label: "Test Cases" },
    { href: `/p/${id}/prompts`, label: "Prompts" },
    { href: `/p/${id}/graders`, label: "Graders" },
    { href: `/p/${id}/experiment-runs`, label: "Experiment Runs" },
  ];

  const isActive = (href: string) => {
    // Normalize the href as well
    const normalizedHref = href.replace(/\/$/, "");
    return normalizedPathname === normalizedHref;
  };

  return (
    <NavigationMenu>
      <NavigationMenuList className="space-x-1">
        {navItems.map((item) => (
          <NavigationMenuItem key={item.href}>
            <Link href={item.href} legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  "flex items-center space-x-1 px-3",
                  "relative", // Added to ensure absolute positioning works
                  isActive(item.href) && "bg-accent text-accent-foreground"
                )}
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                <span>{item.label}</span>
                {isActive(item.href) && (
                  <span className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
                )}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
