import { Button } from "@/components/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/dialog";
import { Info02Icon } from "@raycast/icons";
import { Shortcut } from "@/components/kbd";
import usePngClipboardSupported from "../util/usePngClipboardSupported";
import { useCallback, useState } from "react";
import useHotkeys from "@/utils/useHotkeys";
import { SocialFooter } from "@/components/social-footer";
import { useTranslation } from "@/utils/useLanguage";

export function InfoDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), [setIsOpen]);
  const pngClipboardSupported = usePngClipboardSupported();
  const { t } = useTranslation();

  useHotkeys("shift+/", toggleOpen);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="transparent" className="hidden md:flex gap-2">
          <Info02Icon /> {t("common.about")}
        </Button>
      </DialogTrigger>
      <DialogContent size="large">
        <div className="flex gap-8">
          <div className="flex flex-col gap-3 flex-1 text-[13px] text-gray-11 leading-relaxed">
            <DialogTitle>{t("common.about")}</DialogTitle>
            <p>{t("code.about.desc1")}</p>
            <p>{t("code.about.desc2")}</p>
            <p>{t("code.about.desc3")}</p>
            <p>{t("code.about.desc4")}</p>
            <h2 className="text-base font-medium text-gray-12">{t("common.contribute")}</h2>
            <p>
              {t("code.about.contribute")}{" "}
              <a href="https://github.com/raycast/ray-so" className="text-gray-12 underline underline-offset-2">
                GitHub
              </a>
              .
            </p>
            <p>
              {t("code.about.feedback")}{" "}
              <a href="https://x.com/raycastapp" className="text-gray-12 underline underline-offset-2">
                𝕏
              </a>{" "}
              or{" "}
              <a href="mailto:feedback+rayso@raycast.com" className="text-gray-12 underline underline-offset-2">
                email
              </a>
              .
            </p>
            <SocialFooter referral="code-image" />
          </div>

          <div className="w-px h-full bg-gray-a3" />

          <div className="flex-1 flex flex-col gap-2">
            <h2 className="font-medium -mt-[3px]">{t("common.shortcuts")}</h2>
            <div className="flex flex-col gap-4">
              <Shortcut keys={["F"]}>{t("code.focusEditor")}</Shortcut>
              <Shortcut keys={["Esc"]}>{t("code.unfocusEditor")}</Shortcut>
              <Shortcut keys={["C"]}>{t("code.changeColors")}</Shortcut>
              <Shortcut keys={["B"]}>{t("code.toggleBackground")}</Shortcut>
              <Shortcut keys={["D"]}>{t("code.toggleDarkMode")}</Shortcut>
              <Shortcut keys={["N"]}>{t("code.toggleLineNumbers")}</Shortcut>
              <Shortcut keys={["P"]}>{t("code.changePadding")}</Shortcut>
              <Shortcut keys={["L"]}>{t("code.selectLanguage")}</Shortcut>
              <Shortcut keys={["⌥", "click"]}>{t("code.highlightLine")}</Shortcut>
              <Shortcut keys={["⌥", "shift", "F"]}>{t("code.formatCode")}</Shortcut>
              <Shortcut keys={["⌘", "K"]}>{t("code.toggleExportMenu")}</Shortcut>
              <Shortcut keys={["⌘", "S"]}>{t("code.savePNG")}</Shortcut>
              <Shortcut keys={["⌘", "⇧", "S"]}>{t("code.saveSVG")}</Shortcut>
              {pngClipboardSupported && <Shortcut keys={["⌘", "C"]}>{t("code.copyImage")}</Shortcut>}
              <Shortcut keys={["⌘", "⇧", "C"]}>{t("code.copyURL")}</Shortcut>
              <Shortcut keys={["?"]}>{t("code.openShortcuts")}</Shortcut>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
