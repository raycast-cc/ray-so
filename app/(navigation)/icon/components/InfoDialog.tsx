import { Button } from "@/components/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/dialog";
import { Info02Icon } from "@raycast/icons";
import { Shortcut } from "@/components/kbd";
import { useCallback, useState } from "react";
import useHotkeys from "@/utils/useHotkeys";
import { SocialFooter } from "@/components/social-footer";
import { useTranslation } from "@/utils/useLanguage";

export function InfoDialog() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), [setIsOpen]);

  useHotkeys("shift+/", toggleOpen);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="transparent" className="hidden md:flex gap-2">
          <Info02Icon /> {t("icon.about.title")}
        </Button>
      </DialogTrigger>
      <DialogContent size="large">
        <div className="flex gap-8">
          <div className="flex flex-col gap-3 flex-1 text-[13px] text-gray-11 leading-relaxed">
            <DialogTitle>{t("icon.about.title")}</DialogTitle>
            <p>{t("icon.about.desc1")}</p>
            <p>{t("icon.about.desc2")}</p>
            <p>{t("icon.about.desc3")}</p>
            <p>
              <a href="https://developers.raycast.com/" className="text-gray-12 underline underline-offset-2">
                {t("icon.about.viewDocs")}
              </a>
            </p>
            <h2 className="text-base font-medium text-gray-12">{t("common.contribute")}</h2>
            <p>{t("icon.about.contribute")}</p>
            <p>{t("icon.about.feedback")}</p>
            <SocialFooter referral="icon" />
          </div>

          <div className="w-px h-full bg-gray-a3" />

          <div className="flex-1 flex flex-col gap-2">
            <h2 className="font-medium -mt-[3px]">{t("icon.shortcuts")}</h2>
            <div className="flex flex-col gap-4">
              <Shortcut keys={["⌘", "Z"]}>{t("icon.shortcuts.undo")}</Shortcut>
              <Shortcut keys={["⌘", "⇧", "Z"]}>{t("icon.shortcuts.redo")}</Shortcut>
              <Shortcut keys={["⌘", "F"]}>{t("icon.shortcuts.search")}</Shortcut>
              <Shortcut keys={["⌘", "."]}>{t("icon.shortcuts.toggleInterface")}</Shortcut>
              <Shortcut keys={["⌘", "K"]}>{t("icon.shortcuts.toggleExportMenu")}</Shortcut>
              <Shortcut keys={["⌘", "⇧", "E"]}>{t("icon.shortcuts.export")}</Shortcut>
              <Shortcut keys={["⌘", "C"]}>{t("icon.shortcuts.copyImage")}</Shortcut>
              <Shortcut keys={["⌘", "shift", "C"]}>{t("icon.shortcuts.copyUrl")}</Shortcut>
              <Shortcut keys={["?"]}>{t("icon.shortcuts.openShortcuts")}</Shortcut>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
