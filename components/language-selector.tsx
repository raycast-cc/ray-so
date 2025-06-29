"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectItemText } from "./select";
import { useLanguage } from "@/utils/useLanguage";

export function LanguageSelector({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage();

  return (
    <Select value={language} onValueChange={(value) => setLanguage(value as "en" | "zh")}>
      <SelectTrigger className={className}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">
          <SelectItemText>English</SelectItemText>
        </SelectItem>
        <SelectItem value="zh">
          <SelectItemText>中文</SelectItemText>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
