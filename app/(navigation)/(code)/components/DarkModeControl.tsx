import { useAtom } from "jotai";
import React, { useCallback } from "react";
import { darkModeAtom } from "../store/themes";
import useHotkeys from "../../../../utils/useHotkeys";
import ControlContainer from "./ControlContainer";
import { Switch } from "@/components/switch";
import { useTranslation } from "@/utils/useLanguage";

const BackgroundControl: React.FC = () => {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);
  const { t } = useTranslation();

  const toggleDarkMode = useCallback(() => setDarkMode((old) => !old), [setDarkMode]);

  useHotkeys("d", toggleDarkMode);

  return (
    <ControlContainer title={t("code.controls.darkMode")}>
      <Switch checked={darkMode} onCheckedChange={setDarkMode} />
    </ControlContainer>
  );
};

export default BackgroundControl;
