"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useSectionInView, useSectionInViewObserver } from "@/utils/useSectionInViewObserver";
import { SelectionArea, SelectionEvent } from "@viselect/react";
import { Category, Prompt, categories } from "../prompts";
import { extractPrompts } from "../utils/extractPrompts";
import { addToRaycast, copyData, downloadData, makeUrl } from "../utils/actions";
import copy from "copy-to-clipboard";
import { isTouchDevice } from "../utils/isTouchDevice";
import styles from "./prompts.module.css";
import { ButtonGroup } from "@/components/button-group";
import { Button } from "@/components/button";
import {
  AtSymbolIcon,
  ChevronDownIcon,
  CopyClipboardIcon,
  DownloadIcon,
  LinkIcon,
  MinusCircleIcon,
  PlusCircleIcon,
  StarsIcon,
  StarsSquareIcon,
  TrashIcon,
} from "@raycast/icons";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/dropdown-menu";
import { Toast, ToastTitle } from "../components/Toast";
import { ScrollArea } from "@/components/scroll-area";
import { Instructions } from "../components/Instructions";
import * as Collapsible from "@radix-ui/react-collapsible";
import * as ContextMenu from "@radix-ui/react-context-menu";
import CreativityIcon from "../components/CreativityIcon";
import { NavigationActions } from "@/components/navigation";
import { Kbd, Kbds } from "@/components/kbd";
import { InfoDialog } from "../components/InfoDialog";
import { AiModel } from "@/api/ai";
import { Tooltip, TooltipContent } from "@/components/tooltip";
import { TooltipTrigger } from "@/components/tooltip";
import { Extension } from "@/api/store";
import { AIExtension } from "@/components/ai-extension";
import { LanguageSelector } from "@/components/language-selector";
import { useLanguage } from "@/utils/useLanguage";

type Props = {
  models: AiModel[];
  extensions: Extension[];
};

export function Prompts({ models, extensions }: Props) {
  const { t } = useLanguage();
  const [enableViewObserver, setEnableViewObserver] = React.useState(false);
  useSectionInViewObserver({ headerHeight: 50, enabled: enableViewObserver });

  const router = useRouter();

  const [selectedPrompts, setSelectedPrompts] = React.useState<Prompt[]>([]);

  const [showToast, setShowToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");

  const [actionsOpen, setActionsOpen] = React.useState(false);
  const [isTouch, setIsTouch] = React.useState<boolean>();

  const onStart = ({ event, selection }: SelectionEvent) => {
    if (!isTouch && !event?.ctrlKey && !event?.metaKey) {
      selection.clearSelection();
      setSelectedPrompts([]);
    }
  };

  const onMove = ({
    store: {
      changed: { added, removed },
    },
  }: SelectionEvent) => {
    const addedPrompts = extractPrompts(added, categories);
    const removedPrompts = extractPrompts(removed, categories);

    setSelectedPrompts((prevPrompts) => {
      const prompts = [...prevPrompts];

      addedPrompts.forEach((prompt) => {
        if (!prompt) {
          return;
        }
        if (prompts.find((p) => p.id === prompt.id)) {
          return;
        }
        prompts.push(prompt);
      });

      removedPrompts.forEach((prompt) => {
        return prompts.filter((s) => s?.id !== prompt?.id);
      });

      return prompts;
    });
  };

  const handleDownload = React.useCallback(() => {
    downloadData(selectedPrompts);
  }, [selectedPrompts]);

  const handleCopyData = React.useCallback(() => {
    copyData(selectedPrompts);
    setToastMessage(t("prompts.copiedToClipboard"));
    setShowToast(true);
  }, [selectedPrompts, t]);

  const handleCopyUrl = React.useCallback(async () => {
    setToastMessage(t("prompts.copyingURL"));
    setShowToast(true);

    const url = makeUrl(selectedPrompts);
    let urlToCopy = url;
    const encodedUrl = encodeURIComponent(urlToCopy);
    const response = await fetch(`https://ray.so/api/shorten-url?url=${encodedUrl}&ref=prompts`).then((res) =>
      res.json(),
    );

    if (response.link) {
      urlToCopy = response.link;
    }

    copy(urlToCopy);
    setShowToast(true);
    setToastMessage(t("prompts.urlCopied"));
  }, [selectedPrompts, t]);

  const handleCopyText = React.useCallback(
    (prompt: Prompt) => {
      copy(prompt.prompt);
      setShowToast(true);
      setToastMessage(t("prompts.copiedToClipboard"));
    },
    [t],
  );

  const handleAddToRaycast = React.useCallback(() => addToRaycast(router, selectedPrompts), [router, selectedPrompts]);

  React.useEffect(() => {
    setIsTouch(isTouchDevice());
    setEnableViewObserver(true);
  }, [isTouch, setIsTouch, setEnableViewObserver]);

  React.useEffect(() => {
    const down = (event: KeyboardEvent) => {
      const { key, keyCode, metaKey, shiftKey, altKey } = event;

      if (key === "k" && metaKey) {
        if (selectedPrompts.length === 0) return;
        setActionsOpen((prevOpen) => {
          return !prevOpen;
        });
      }

      if (key === "d" && metaKey) {
        if (selectedPrompts.length === 0) return;
        event.preventDefault();
        handleDownload();
      }

      if (key === "Enter" && metaKey) {
        if (selectedPrompts.length === 0) return;
        event.preventDefault();
        handleAddToRaycast();
      }

      // key === "c" doesn't work when using alt key, so we use keCode instead (67)
      if (keyCode === 67 && metaKey && altKey) {
        if (selectedPrompts.length === 0) return;
        event.preventDefault();
        handleCopyData();
        setActionsOpen(false);
      }

      if (key === "c" && metaKey && shiftKey) {
        event.preventDefault();
        handleCopyUrl();
        setActionsOpen(false);
      }

      if (key === "a" && metaKey) {
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setActionsOpen, selectedPrompts, handleCopyData, handleDownload, handleCopyUrl, handleAddToRaycast]);

  React.useEffect(() => {
    if (showToast) {
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    }
  }, [showToast]);

  return (
    <div>
      <NavigationActions>
        <div className="flex gap-2 sm:hidden">
          <Button variant="primary" disabled={selectedPrompts.length === 0} onClick={() => handleCopyUrl()}>
            <LinkIcon /> {t("export.copyURLToShare")}
          </Button>
        </div>
        <div className="sm:flex gap-2 hidden">
          <LanguageSelector />
          <InfoDialog />
          <ButtonGroup>
            <Button variant="primary" disabled={selectedPrompts.length === 0} onClick={() => handleAddToRaycast()}>
              <PlusCircleIcon /> {t("export.addToRaycast")}
            </Button>

            <DropdownMenu open={actionsOpen} onOpenChange={setActionsOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="primary" disabled={selectedPrompts.length === 0} aria-label="Export options">
                  <ChevronDownIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem disabled={selectedPrompts.length === 0} onSelect={() => handleDownload()}>
                  <DownloadIcon /> {t("export.downloadJSON")}
                  <Kbds>
                    <Kbd>⌘</Kbd>
                    <Kbd>D</Kbd>
                  </Kbds>
                </DropdownMenuItem>
                <DropdownMenuItem disabled={selectedPrompts.length === 0} onSelect={() => handleCopyData()}>
                  <CopyClipboardIcon /> {t("export.copyJSON")}{" "}
                  <Kbds>
                    <Kbd>⌘</Kbd>
                    <Kbd>⌥</Kbd>
                    <Kbd>C</Kbd>
                  </Kbds>
                </DropdownMenuItem>
                <DropdownMenuItem disabled={selectedPrompts.length === 0} onSelect={() => handleCopyUrl()}>
                  <LinkIcon /> {t("export.copyURLToShare")}{" "}
                  <Kbds>
                    <Kbd>⌘</Kbd>
                    <Kbd>⇧</Kbd>
                    <Kbd>C</Kbd>
                  </Kbds>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ButtonGroup>
        </div>
      </NavigationActions>

      <Toast open={showToast} onOpenChange={setShowToast}>
        <ToastTitle className={styles.toastTitle}>
          <CopyClipboardIcon /> {toastMessage}
        </ToastTitle>
      </Toast>

      <div className={styles.main}>
        <div className={styles.sidebar}>
          <div className={styles.sidebarInner}>
            <ScrollArea>
              <div className={styles.sidebarContent}>
                <div className={styles.sidebarNav}>
                  <p className={styles.sidebarTitle}>{t("prompts.categories")}</p>

                  {categories.map((category) => (
                    <NavItem key={category.slug} category={category} />
                  ))}
                </div>

                {selectedPrompts.length === 0 && <Instructions />}

                {selectedPrompts.length > 0 && (
                  <div>
                    <p className={styles.sidebarTitle}>{t("export.addToRaycast")}</p>

                    <Collapsible.Root>
                      <Collapsible.Trigger asChild>
                        <button className={styles.summaryTrigger}>
                          {t(
                            selectedPrompts.length > 1
                              ? "prompts.selectedCountMultiple"
                              : "prompts.selectedCountSingle",
                            { count: selectedPrompts.length },
                          )}
                          <ChevronDownIcon />
                        </button>
                      </Collapsible.Trigger>

                      <Collapsible.Content className={styles.summaryContent}>
                        {selectedPrompts.map((prompt, index) => (
                          <div key={prompt.title + index} className={styles.summaryItem}>
                            {prompt.title}
                            <button
                              className={styles.summaryItemButton}
                              onClick={() => {
                                setSelectedPrompts(
                                  selectedPrompts.filter((selectedPrompt) => selectedPrompt.id !== prompt.id),
                                );
                              }}
                            >
                              <TrashIcon />
                            </button>
                          </div>
                        ))}
                      </Collapsible.Content>
                    </Collapsible.Root>

                    <div className={styles.summaryControls}>
                      <Button onClick={handleAddToRaycast} variant="primary">
                        {t("export.addToRaycast")}
                      </Button>

                      <Button onClick={() => setSelectedPrompts([])}>{t("prompts.clearSelected")}</Button>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>

        <div className={styles.container}>
          {isTouch !== null && (
            <SelectionArea
              className="pt-8"
              onStart={onStart}
              onMove={onMove}
              selectables=".selectable"
              features={{
                // Disable support for touch devices
                touch: isTouch ? false : true,
                range: true,
                singleTap: {
                  allow: true,
                  intersect: "native",
                },
              }}
            >
              {categories.map((category) => {
                return (
                  <div
                    key={category.name}
                    data-section-slug={`/prompts${category.slug}`}
                    style={{
                      outline: "none",
                    }}
                    tabIndex={-1}
                  >
                    <h2 className={styles.subtitle}>
                      <category.iconComponent /> {category.name}
                    </h2>
                    <div className={styles.prompts}>
                      {category.prompts.map((prompt, index) => {
                        const isSelected = selectedPrompts.some((selectedPrompt) => selectedPrompt.id === prompt.id);
                        const model = models?.find((m) => m.id === prompt.model);
                        const hasAIExtensions = prompt.prompt.includes("{id=") && prompt.prompt.includes("@");
                        return (
                          <ContextMenu.Root key={prompt.id}>
                            <ContextMenu.Trigger>
                              <div
                                className={`${styles.item} selectable group`}
                                data-selected={isSelected}
                                data-key={`${category.slug}-${index}`}
                              >
                                <div className={styles.promptTemplate}>
                                  <ScrollArea>
                                    <pre className={styles.template}>
                                      {prompt.prompt.split(/(@[a-zA-Z0-9-]+\{id=[^}]+\})/).map((part, index) => {
                                        const match = part.match(/@([a-zA-Z0-9-]+)\{id=([^}]+)\}/);
                                        if (match) {
                                          const extension = extensions.find((e) => e.id === match[2]);
                                          return (
                                            <AIExtension
                                              variant="secondary"
                                              key={index}
                                              extension={extension}
                                              fallback={match[1]}
                                            />
                                          );
                                        }
                                        return (
                                          <span
                                            key={index}
                                            dangerouslySetInnerHTML={{
                                              __html: part.replace(
                                                /\{[^}]+\}/g,
                                                `<span class="${styles.placeholder}">$&</span>`,
                                              ),
                                            }}
                                          />
                                        );
                                      })}
                                    </pre>
                                  </ScrollArea>
                                </div>
                                <div className={styles.prompt}>
                                  <span className={styles.name}>
                                    <prompt.iconComponent />
                                    {prompt.title}
                                    {prompt.author ? (
                                      <span className={styles.promptAuthor}>
                                        by{" "}
                                        {prompt.author.link ? (
                                          <a href={prompt.author.link} target="_blank" rel="noopener noreferrer">
                                            {prompt.author.name}
                                          </a>
                                        ) : (
                                          prompt.author.name
                                        )}
                                      </span>
                                    ) : null}
                                  </span>
                                  {prompt.model ? (
                                    <span
                                      className={styles.promptModel}
                                      title={`${model?.provider_name} ${model?.name}`}
                                    >
                                      {model?.name}
                                    </span>
                                  ) : null}
                                  {prompt.creativity ? <CreativityIcon creativity={prompt.creativity} /> : null}

                                  {hasAIExtensions ? (
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <StarsSquareIcon />
                                      </TooltipTrigger>
                                      <TooltipContent>{t("prompts.includesAIExtensions")}</TooltipContent>
                                    </Tooltip>
                                  ) : null}
                                </div>
                              </div>
                            </ContextMenu.Trigger>
                            <ContextMenu.Portal>
                              <ContextMenu.Content className={styles.contextMenuContent}>
                                <ContextMenu.Item
                                  className={styles.contextMenuItem}
                                  onSelect={() => {
                                    if (isSelected) {
                                      return setSelectedPrompts((prevPrompts) =>
                                        prevPrompts.filter((prevPrompt) => prevPrompt.id !== prompt.id),
                                      );
                                    }
                                    setSelectedPrompts((prevPrompts) => [...prevPrompts, prompt]);
                                  }}
                                >
                                  {isSelected ? <MinusCircleIcon /> : <PlusCircleIcon />}
                                  {isSelected ? t("prompts.deselectPrompt") : t("prompts.selectPrompt")}
                                </ContextMenu.Item>
                                <ContextMenu.Item
                                  className={styles.contextMenuItem}
                                  onSelect={() => handleCopyText(prompt)}
                                >
                                  <CopyClipboardIcon /> {t("prompts.copyPromptText")}{" "}
                                </ContextMenu.Item>
                              </ContextMenu.Content>
                            </ContextMenu.Portal>
                          </ContextMenu.Root>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </SelectionArea>
          )}
        </div>
      </div>
    </div>
  );
}

function NavItem({ category }: { category: Category }) {
  const activeSection = useSectionInView();

  return (
    <a
      onClick={(e) => {
        e.preventDefault();
        window.history.pushState(null, "", `/prompts${category.slug}`);
      }}
      className={styles.sidebarNavItem}
      data-active={activeSection === `/prompts${category.slug}`}
    >
      {category.icon ? <category.iconComponent /> : <StarsIcon />}

      {category.name}
      <span className={styles.badge}>{category.prompts.length}</span>
    </a>
  );
}
