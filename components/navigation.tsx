"use client";

import { useRouter, useSelectedLayoutSegments } from "next/navigation";

import {
  BrandGithubIcon,
  BrandSlackIcon,
  BrandXIcon,
  BrandYoutubeIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  RaycastLogoNegIcon,
} from "@raycast/icons";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";
import Link from "next/link";
import { cn } from "@/utils/cn";
import CodeImagesIcon from "@/app/assets/code-images.svg";
import IconMakerIcon from "@/app/assets/icon-maker.svg";
import SnippetExplorerIcon from "@/app/assets/snippet-explorer.svg";
import PresetExplorerIcon from "@/app/assets/preset-explorer.svg";
import QuicklinkExplorerIcon from "@/app/assets/quicklink-explorer.svg";
import PromptExplorerIcon from "@/app/assets/prompt-explorer.svg";
import ThemeExplorerIcon from "@/app/assets/theme-explorer.svg";
import { Button } from "./button";
import { useTranslation } from "@/utils/useLanguage";
import { LanguageSelector } from "./language-selector";

const links = [
  {
    href: "/",
    labelKey: "nav.codeImages" as const,
    descriptionKey: "nav.codeImages.desc" as const,
    icon: CodeImagesIcon,
  },
  {
    href: "/icon",
    labelKey: "nav.iconMaker" as const,
    descriptionKey: "nav.iconMaker.desc" as const,
    icon: IconMakerIcon,
  },
  {
    href: "/prompts",
    labelKey: "nav.prompts" as const,
    descriptionKey: "nav.prompts.desc" as const,
    icon: PromptExplorerIcon,
  },
  {
    href: "/presets",
    labelKey: "nav.presets" as const,
    descriptionKey: "nav.presets.desc" as const,
    icon: PresetExplorerIcon,
  },
  {
    href: "/quicklinks",
    labelKey: "nav.quicklinks" as const,
    descriptionKey: "nav.quicklinks.desc" as const,
    icon: QuicklinkExplorerIcon,
  },
  {
    href: "/snippets",
    labelKey: "nav.snippets" as const,
    descriptionKey: "nav.snippets.desc" as const,
    icon: SnippetExplorerIcon,
  },
  {
    href: "/themes",
    labelKey: "nav.themes" as const,
    descriptionKey: "nav.themes.desc" as const,
    icon: ThemeExplorerIcon,
  },
];

export function Navigation() {
  const router = useRouter();
  const segments = useSelectedLayoutSegments();
  const segment = segments[0] || "(code)";
  const showBackButton = segments.find((s) => s === "shared") ? segments.length > 1 : segments.length > 2;
  const activeLink = links.find((link) => (segment === "(code)" ? links[0] : link.href.includes(segment))) || links[0];
  const { t } = useTranslation();

  return (
    <nav className="flex items-center gap-3 h-[50px] pl-4 pr-5 bg-gray-2 text-white w-full fixed z-10">
      <div
        className={cn(
          "flex items-center gap-3 transition-transform ease-in-out",
          showBackButton ? "translate-x-0" : "-translate-x-10",
        )}
      >
        <Button
          asChild
          className={cn(
            "rounded-full shadow-none w-6 h-6 bg-gray-4 hover:bg-gray-5 text-gray-12",
            showBackButton ? "opacity-100 scale-100" : "opacity-0 scale-75",
          )}
        >
          <Link
            href={`/${segment}`}
            aria-label="Home"
            aria-disabled={!showBackButton}
            tabIndex={showBackButton ? 0 : -1}
          >
            <ChevronLeftIcon className="w-4 h-4 shrink-0" />
          </Link>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="transparent" className="py-1 pl-1 pr-2 gap-2 data-[state=open]:bg-gray-4 text-gray-12">
              {activeLink.icon && <activeLink.icon className="w-6 h-6" />}
              <span className="text-[15px] font-medium">{t(activeLink.labelKey)}</span>
              <ChevronDownIcon className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="p-2 gap-1.5 flex flex-col">
            {links.map((link) => (
              <DropdownMenuItem
                key={link.href}
                onSelect={() => router.push(link.href)}
                className="pl-[10px] pr-6 py-2 group"
              >
                <div className="flex gap-3 items-center">
                  {link.icon && <link.icon className="w-8 h-8" />}
                  <div className="flex flex-col leading-none gap-1">
                    <span className="text-[15px] font-medium text-gray-12">{t(link.labelKey)}</span>
                    <span className="text-[13px] text-gray-9 group-hover:text-gray-10">{t(link.descriptionKey)}</span>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}

export function NavigationActions({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "h-[50px] flex items-center justify-end fixed top-0 right-scrollbar-offset gap-2 z-10 left-44",
        className,
      )}
    >
      {children}
    </div>
  );
}
