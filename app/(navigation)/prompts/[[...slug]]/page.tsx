import type { Metadata } from "next";
import { getAvailableAiModels } from "@/api/ai";
import { Prompts } from "./prompts";
import OgImage from "../assets/og-image.png";
import { getExtensions } from "@/api/store";
import { allPrompts } from "../prompts";
import { getExtensionIdsFromString } from "@/utils/getExtensionIdsFromString";

const pageTitle = "提示词探索器 - Ray.so 中文版";
const pageDescription = "轻松浏览、分享和添加中文 AI 提示词到 Raycast。";
const ogUrl = OgImage.src;

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  openGraph: {
    type: "website",
    url: "/prompts",
    title: pageTitle,
    description: pageDescription,
    siteName: "Ray.so 中文版",
    images: [
      {
        url: ogUrl,
        width: 1200,
        height: 630,
        alt: pageTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@raycastapp",
    title: pageTitle,
    description: pageDescription,
    images: [
      {
        url: ogUrl,
        width: 1200,
        height: 630,
        alt: pageTitle,
      },
    ],
  },
  keywords: "提示词, AI, 导入, raycast, 中文社区, prompts",
};

export default async function Page() {
  const models = await getAvailableAiModels();
  const extensionIds = allPrompts.flatMap((prompt) => getExtensionIdsFromString(prompt.prompt));
  const allExtensions = await getExtensions({ extensionIds });
  return <Prompts models={models} extensions={allExtensions} />;
}
