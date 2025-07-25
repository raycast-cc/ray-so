import Link from "next/link";
import { addToRaycast, copyData, downloadData, makeUrl } from "../utils/actions";
import styles from "./Preset.module.css";
import {
  CopyClipboardIcon,
  DownloadIcon,
  Globe01Icon,
  ImageIcon,
  LinkIcon,
  PlusCircleIcon,
  StarsIcon,
  StarsSquareIcon,
} from "@raycast/icons";
import CreativityIcon from "./CreativityIcon";
import ModelIcon from "./ModelIcon";
import * as ContextMenu from "@radix-ui/react-context-menu";
import copy from "copy-to-clipboard";
import { useRouter } from "next/navigation";
import React from "react";
import { Toast, ToastTitle, ToastViewport } from "./Toast";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/tooltip";
import { IconComponent } from "./Icons";
import { Preset } from "../presets";
import { AiModel } from "@/api/ai";
import { Extension } from "@/api/store";
import { useTranslation } from "@/utils/useLanguage";

export const creativity = {
  none: ["None", "No Creativity"],
  low: ["Low", "Low Creativity"],
  medium: ["Medium", "Medium Creativity"],
  high: ["High", "High Creativity"],
  maximum: ["Maximum", "Max Creativity"],
};

export function PresetComponent({
  preset,
  models,
  extensions,
}: {
  preset: Preset;
  models: AiModel[];
  extensions: Extension[];
}) {
  const [showToast, setShowToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");
  const router = useRouter();
  const model = models?.find((m) => m.id === preset.model);
  const { t } = useTranslation();

  const handleCopyInstruction = React.useCallback(() => {
    copy(preset.instructions);
    setToastMessage(t("presets.copiedToClipboard"));
    setShowToast(true);
  }, [preset.instructions, t]);

  const handleAddToRaycast = React.useCallback(() => addToRaycast(router, preset), [router, preset]);

  const handleDownload = React.useCallback(() => {
    downloadData(preset);
  }, [preset]);

  const handleCopyData = React.useCallback(() => {
    copyData(preset);
    setToastMessage(t("presets.copiedToClipboard"));
    setShowToast(true);
  }, [preset, t]);

  const handleCopyUrl = React.useCallback(async () => {
    setToastMessage(t("presets.copyingURL"));
    setShowToast(true);

    const url = makeUrl(preset);
    let urlToCopy = url;
    if (!preset.id) {
      const encodedUrl = encodeURIComponent(urlToCopy);
      const response = await fetch(`https://ray.so/api/shorten-url?url=${encodedUrl}&ref=presets`).then((res) =>
        res.json(),
      );

      if (response.link) {
        urlToCopy = response.link;
      }
    }

    copy(urlToCopy);
    setShowToast(true);
    setToastMessage(t("presets.urlCopied"));
  }, [preset, t]);

  React.useEffect(() => {
    if (showToast) {
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    }
  }, [showToast]);

  return (
    <>
      <ContextMenu.Root>
        <ContextMenu.Trigger>
          <Link href={`/presets/preset/${preset.id}`} className={styles.item}>
            <div className={styles.icon}>
              <IconComponent icon={preset.icon} />
            </div>
            <div className={styles.content}>
              <div className={styles.header}>
                <p className={styles.name}>
                  {preset.name}
                  {preset.author ? (
                    <span className={styles.presetAuthor}>
                      {t("presets.by")} {preset.author.name}
                    </span>
                  ) : null}
                </p>
                <p className={styles.presetDescription}>{preset.description}</p>
              </div>
              <div className={styles.meta}>
                {model && preset.model ? (
                  <Tooltip delayDuration={700}>
                    <TooltipTrigger>
                      <span className={styles.metaItem}>
                        <ModelIcon model={preset.model} />
                        {model.name}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      {model.provider_name} {model.name}
                    </TooltipContent>
                  </Tooltip>
                ) : null}
                {preset.creativity ? (
                  <>
                    <span className={styles.metaDivider} />
                    <span className={styles.metaItem}>
                      <CreativityIcon creativity={preset.creativity} />
                      <span className={styles.mobileOnly}>{creativity[preset.creativity][0]}</span>
                      <span className={styles.desktopOnly}>{creativity[preset.creativity][1]}</span>
                    </span>
                  </>
                ) : null}
                {preset.tools && preset.tools.length > 0 ? (
                  <>
                    <span className={styles.metaDivider} />

                    {preset.tools?.length > 0 ? (
                      <Tooltip delayDuration={700}>
                        <TooltipTrigger>
                          <span className={styles.metaItem}>
                            <StarsSquareIcon />

                            {preset.tools
                              .map(({ id }) => {
                                const extension = extensions.find((e) => e.id === id);
                                return extension ? extension.title : id;
                              })
                              .join(", ")}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>{t("presets.extensions")}</TooltipContent>
                      </Tooltip>
                    ) : null}
                  </>
                ) : null}
                {preset.web_search ? (
                  <>
                    <span className={styles.metaDivider} />
                    <Tooltip delayDuration={700}>
                      <TooltipTrigger>
                        <span className={styles.metaItem}>
                          <Globe01Icon />
                          {!preset.image_generation && "Web"}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>Searches the web if context is missing</TooltipContent>
                    </Tooltip>
                  </>
                ) : null}
                {preset.image_generation ? (
                  <>
                    <span className={styles.metaDivider} />
                    <Tooltip delayDuration={700}>
                      <TooltipTrigger>
                        <span className={styles.metaItem}>
                          <ImageIcon />
                          {!preset.web_search && "Image"}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>Let AI generate images</TooltipContent>
                    </Tooltip>
                  </>
                ) : null}
              </div>
            </div>
          </Link>
        </ContextMenu.Trigger>
        <ContextMenu.Portal>
          <ContextMenu.Content className={styles.contextMenuContent}>
            <ContextMenu.Item className={styles.contextMenuItem} onSelect={handleAddToRaycast}>
              <PlusCircleIcon /> {t("presets.addToRaycast")}
            </ContextMenu.Item>
            <ContextMenu.Item className={styles.contextMenuItem} onSelect={handleDownload}>
              <DownloadIcon /> {t("presets.downloadJSON")}
            </ContextMenu.Item>
            <ContextMenu.Item className={styles.contextMenuItem} onSelect={handleCopyData}>
              <CopyClipboardIcon /> {t("presets.copyJSON")}
            </ContextMenu.Item>
            <ContextMenu.Item className={styles.contextMenuItem} onSelect={handleCopyInstruction}>
              <CopyClipboardIcon /> {t("presets.copyInstructions")}
            </ContextMenu.Item>
            <ContextMenu.Item className={styles.contextMenuItem} onSelect={handleCopyUrl}>
              <LinkIcon /> {t("presets.copyURLToShare")}
            </ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Portal>
      </ContextMenu.Root>
      <Toast open={showToast} onOpenChange={setShowToast}>
        <ToastTitle>
          <CopyClipboardIcon /> {toastMessage}
        </ToastTitle>
      </Toast>
    </>
  );
}
