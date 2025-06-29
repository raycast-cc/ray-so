import { useAtom } from "jotai";
import React from "react";
import { showBackgroundAtom } from "../store";
import useHotkeys from "../../../../utils/useHotkeys";
import ControlContainer from "./ControlContainer";
import { Switch } from "@/components/switch";
import { useTranslation } from "@/utils/useLanguage";

const BackgroundControl: React.FC = () => {
  const [showBackground, setShowBackground] = useAtom(showBackgroundAtom);
  const { t } = useTranslation();

  useHotkeys("b", () => {
    setShowBackground((old) => !old);
  });

  return (
    <ControlContainer title={t("code.controls.background")}>
      <Switch checked={showBackground} onCheckedChange={setShowBackground} />
    </ControlContainer>
  );
};

export default BackgroundControl;
