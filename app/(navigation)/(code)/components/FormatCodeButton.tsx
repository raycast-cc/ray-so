"use client";

import { WandIcon } from "@raycast/icons";
import formatCode, { formatterSupportedLanguages } from "../util/formatCode";
import { useAtom } from "jotai";
import { codeAtom, selectedLanguageAtom } from "../store/code";
import useHotkeys from "@/utils/useHotkeys";
import { Button } from "@/components/button";
import { toast } from "@/components/toast";
import { cn } from "@/utils/cn";
import { useEffect, useState } from "react";
import { useTranslation } from "@/utils/useLanguage";

const FormatButton: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useAtom(selectedLanguageAtom);
  const [code, setCode] = useAtom(codeAtom);
  const [isClient, setIsClient] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleFormatCode = () => {
    const isSupportedLanguage = formatterSupportedLanguages.includes(selectedLanguage?.name || "");
    if (!isSupportedLanguage) {
      return toast.error(t("code.format.notSupported"));
    }
    if (!code || !selectedLanguage) {
      return;
    }
    const language = selectedLanguage;
    toast.promise(
      formatCode(code, language).then((formatted) => {
        setCode(formatted);
        // Sometimes hljs thinks the formatted code is a different language
        // than the original, so we enforce the original language here
        setSelectedLanguage(language);
      }),
      {
        loading: t("code.format.loading"),
        success: t("code.format.success"),
        error: (error) => {
          const errorMessage = error.message;
          return {
            message: t("code.format.failed"),
            description: () => (
              <pre className="w-full overflow-auto text-xs scrollbar-hide bg-gray-a3 p-2.5 rounded max-w-[300px]">
                <code className="w-full">{errorMessage}</code>
              </pre>
            ),
          };
        },
      },
    );
  };

  useHotkeys("shift+option+f", (event) => {
    event.preventDefault();
    handleFormatCode();
  });

  if (!isClient) {
    return null;
  }

  return (
    <Button
      onClick={handleFormatCode}
      variant="transparent"
      className={cn(
        "hidden",
        selectedLanguage && formatterSupportedLanguages.includes(selectedLanguage.name) && "md:inline-flex",
      )}
    >
      <WandIcon width={16} height={16} />
      {t("common.format")}
    </Button>
  );
};

export default FormatButton;
