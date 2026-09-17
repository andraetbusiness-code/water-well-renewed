/**
 * GHL Lead Connector chat widget — A2P 10DLC compliance surface.
 *
 * This is the recruiting-specific widget and is mounted only on careers and
 * application routes. Customer-facing pages must not load the recruiting chat.
 */

import { useEffect } from "react";

const RECRUITING_WIDGET_ID = "6a74af1597ea74e60a4c73c6";

export function ChatWidget() {
  useEffect(() => {
    const SCRIPT_ID = "ghl-chat-widget";

    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (existing?.dataset.widgetId === RECRUITING_WIDGET_ID) return;

    if (existing) {
      existing.remove();
      document
        .querySelectorAll("chat-widget, [id^='lc_text-widget'], [class*='lc_text-widget']")
        .forEach((el) => el.remove());
    }

    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = "https://widgets.leadconnectorhq.com/loader.js";
    script.dataset.resourcesUrl =
      "https://widgets.leadconnectorhq.com/chat-widget/loader.js";
    script.dataset.widgetId = RECRUITING_WIDGET_ID;
    script.dataset.source = "WEB_USER";
    document.body.appendChild(script);
  }, []);

  return null;
}
