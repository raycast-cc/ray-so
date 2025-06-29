import { Button } from "@/components/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/dialog";
import { Info02Icon } from "@raycast/icons";
import { Shortcut } from "@/components/kbd";
import { useCallback, useState } from "react";
import useHotkeys from "@/utils/useHotkeys";
import { SocialFooter } from "@/components/social-footer";
import { useTranslation } from "@/utils/useLanguage";

export function InfoDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), [setIsOpen]);
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
            <DialogTitle>{t("presets.about.title")}</DialogTitle>
            <p>{t("presets.about.desc1")}</p>
            <p>{t("presets.about.desc2")}</p>
            <h2 className="text-base font-medium text-gray-12">{t("common.contribute")}</h2>
            <p>{t("presets.about.contribute")}</p>
            <p>{t("presets.about.feedback")}</p>
            <SocialFooter referral="presets" />
          </div>

          <div className="w-px h-full bg-gray-a3" />

          <div className="flex-1 flex flex-col gap-2">
            <h2 className="font-medium -mt-[3px]">{t("presets.shortcuts")}</h2>
            <div className="flex flex-col gap-4">
              <Shortcut keys={["⌘", "⏎"]}>{t("presets.shortcuts.addToRaycast")}</Shortcut>
              <Shortcut keys={["⌘", "D"]}>{t("presets.shortcuts.downloadJSON")}</Shortcut>
              <Shortcut keys={["⌘", "⌥", "C"]}>{t("presets.shortcuts.copyJSON")}</Shortcut>
              <Shortcut keys={["⌘", "K"]}>{t("presets.shortcuts.toggleExportMenu")}</Shortcut>
              <Shortcut keys={["⌘", "⇧", "C"]}>{t("presets.shortcuts.copyURL")}</Shortcut>
              <Shortcut keys={["?"]}>{t("presets.shortcuts.openShortcuts")}</Shortcut>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
