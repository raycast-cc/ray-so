import React, { MouseEventHandler, useContext, useState } from "react";
import { track } from "@vercel/analytics";

import ImageIcon from "../assets/icons/image-16.svg";
import LinkIcon from "../assets/icons/link-16.svg";
import ChevronDownIcon from "../assets/icons/chevron-down-16.svg";
import ClipboardIcon from "../assets/icons/clipboard-16.svg";
import ArrowsExpandingIcon from "../assets/icons/arrows-expanding-16.svg";

import { FrameContext } from "../store/FrameContextStore";
import { derivedFlashMessageAtom, flashShownAtom } from "../store/flash";
import { fileNameAtom } from "../store";
import download from "../util/download";
import { toPng, toSvg, toBlob } from "../lib/image";

import useHotkeys from "../../../../utils/useHotkeys";
import usePngClipboardSupported from "../util/usePngClipboardSupported";
import { useAtom, useAtomValue } from "jotai";
import { EXPORT_SIZE_OPTIONS, SIZE_LABELS, exportSizeAtom } from "../store/image";
import { autoDetectLanguageAtom, selectedLanguageAtom } from "../store/code";
import { LANGUAGES } from "../util/languages";
import { ButtonGroup } from "@/components/button-group";
import { Button } from "@/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu";
import { DownloadIcon } from "@raycast/icons";
import { Kbd, Kbds } from "@/components/kbd";
import { useTranslation } from "@/utils/useLanguage";

const ExportButton: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pngClipboardSupported = usePngClipboardSupported();
  const frameContext = useContext(FrameContext);
  const [, setFlashMessage] = useAtom(derivedFlashMessageAtom);
  const [, setFlashShown] = useAtom(flashShownAtom);
  const customFileName = useAtomValue(fileNameAtom);
  const fileName = customFileName.replaceAll(" ", "-") || "ray-so-export";
  const [exportSize, setExportSize] = useAtom(exportSizeAtom);
  const selectedLanguage = useAtomValue(selectedLanguageAtom);
  const autoDetectLanguage = useAtomValue(autoDetectLanguageAtom);
  const { t } = useTranslation();

  const savePng = async () => {
    if (!frameContext?.current) {
      throw new Error(t("code.export.frameNotFound"));
    }

    setFlashMessage({ icon: <ImageIcon />, message: t("code.export.exportingPNG") });

    const dataUrl = await toPng(frameContext.current, {
      pixelRatio: exportSize,
    });

    download(dataUrl, `${fileName}.png`);

    setFlashShown(false);
  };

  const copyPng = async () => {
    setFlashMessage({ icon: <ClipboardIcon />, message: t("code.export.copyingPNG") });
    if (!frameContext?.current) {
      throw new Error(t("code.export.frameNotFound"));
    }

    const clipboardItem = new ClipboardItem({
      "image/png": toBlob(frameContext.current, {
        pixelRatio: exportSize,
      }).then((blob) => {
        if (!blob) {
          throw new Error(t("code.export.blobError"));
        }
        return blob;
      }),
    });

    await navigator.clipboard.write([clipboardItem]);

    setFlashMessage({ icon: <ClipboardIcon />, message: t("code.export.pngCopied"), timeout: 2000 });
  };

  const saveSvg = async () => {
    if (!frameContext?.current) {
      throw new Error(t("code.export.frameNotFound"));
    }

    setFlashMessage({ icon: <ImageIcon />, message: t("code.export.exportingSVG") });

    const dataUrl = await toSvg(frameContext.current);
    download(dataUrl, `${fileName}.svg`);

    setFlashShown(false);
  };

  const dropdownHandler: (handler: () => void) => (event: Event) => void = (handler) => {
    return (event) => {
      event.preventDefault();
      handler();
      setDropdownOpen(false);
    };
  };

  const handleExportClick: MouseEventHandler = (event) => {
    event.preventDefault();

    const params = new URLSearchParams(window.location.hash.replace("#", "?"));
    track("Export", {
      theme: params.get("theme") || "candy",
      background: params.get("background") || "true",
      darkMode: params.get("darkMode") || "true",
      padding: params.get("padding") || "64",
      language: Object.keys(LANGUAGES).find((key) => LANGUAGES[key].name === selectedLanguage?.name) || "auto",
      autoDetectLanguage: autoDetectLanguage.toString(),
      title: params.get("title") || "untitled",
      width: params.get("width") || "auto",
      size: SIZE_LABELS[exportSize],
    });
    savePng();
  };

  const copyUrl = async () => {
    setFlashMessage({ icon: <ClipboardIcon />, message: t("code.export.copyingURL") });

    const url = window.location.toString();
    let urlToCopy = url;

    const encodedUrl = encodeURIComponent(url);
    const response = await fetch(`/api/shorten-url?url=${encodedUrl}&ref=codeImage`).then((res) => res.json());

    if (response.link) {
      urlToCopy = response.link;
    }

    navigator.clipboard.writeText(urlToCopy);

    setFlashMessage({ icon: <ClipboardIcon />, message: t("code.export.urlCopied"), timeout: 2000 });
  };

  useHotkeys("ctrl+k,cmd+k", (event) => {
    event.preventDefault();
    setDropdownOpen((open) => !open);
  });

  useHotkeys("ctrl+s,cmd+s", (event) => {
    event.preventDefault();
    savePng();
  });
  useHotkeys("ctrl+c,cmd+c", (event) => {
    if (pngClipboardSupported) {
      event.preventDefault();
      copyPng();
    }
  });
  useHotkeys("ctrl+shift+c,cmd+shift+c", (event) => {
    event.preventDefault();
    copyUrl();
  });
  useHotkeys("ctrl+shift+s,cmd+shift+s", (event) => {
    event.preventDefault();
    saveSvg();
  });

  return (
    <ButtonGroup>
      <Button onClick={handleExportClick} variant="primary" aria-label={t("code.aria.exportPNG")}>
        <DownloadIcon className="w-4 h-4" />
        {t("code.button.export")} <span className="hidden md:inline-block">{t("code.button.image")}</span>
      </Button>
      <DropdownMenu open={dropdownOpen} onOpenChange={(open) => setDropdownOpen(open)}>
        <DropdownMenuTrigger asChild>
          <Button variant="primary" aria-label={t("code.aria.exportOptions")}>
            <ChevronDownIcon className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="end">
          <DropdownMenuItem onSelect={dropdownHandler(savePng)}>
            <ImageIcon /> {t("export.savePNG")}{" "}
            <Kbds>
              <Kbd>⌘</Kbd>
              <Kbd>S</Kbd>
            </Kbds>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={dropdownHandler(saveSvg)}>
            <ImageIcon /> {t("export.saveSVG")}
            <Kbds>
              <Kbd>⌘</Kbd>
              <Kbd>⇧</Kbd>
              <Kbd>S</Kbd>
            </Kbds>
          </DropdownMenuItem>
          {pngClipboardSupported && (
            <DropdownMenuItem onSelect={dropdownHandler(copyPng)}>
              <ClipboardIcon /> {t("export.copyImage")}
              <Kbds>
                <Kbd>⌘</Kbd>
                <Kbd>C</Kbd>
              </Kbds>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onSelect={dropdownHandler(copyUrl)}>
            <LinkIcon /> {t("export.copyURL")}
            <Kbds>
              <Kbd>⌘</Kbd>
              <Kbd>⇧</Kbd>
              <Kbd>C</Kbd>
            </Kbds>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger value={SIZE_LABELS[exportSize]}>
              <ArrowsExpandingIcon /> {t("export.size")}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent sideOffset={8}>
              <DropdownMenuRadioGroup value={exportSize.toString()}>
                {EXPORT_SIZE_OPTIONS.map((size) => (
                  <DropdownMenuRadioItem key={size} value={size.toString()} onSelect={() => setExportSize(size)}>
                    {SIZE_LABELS[size]}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  );
};

export default ExportButton;
