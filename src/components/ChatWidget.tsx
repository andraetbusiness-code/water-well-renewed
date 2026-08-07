/**
 * GHL Lead Connector chat widget — A2P 10DLC compliance surface.
 *
 * This domain (selectsourcewaterusa.com) serves the RECRUITING widget on every
 * page, deliberately. It is the registered Business Website for the SSW
 * Recruiting A2P brand, so GHL's compliance checker fetches it looking for THIS
 * sub-account's widget. Previously this component swapped in the customer
 * widget on non-recruiting routes, which meant a checker that executes
 * JavaScript would land on "/" and see the wrong widget.
 *
 * There are no customers to protect here: this is an internal, noindex
 * deployment. The public customer-facing site is https://selectsourcewater.com
 * and carries its own separate widget.
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
