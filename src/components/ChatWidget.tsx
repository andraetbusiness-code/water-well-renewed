import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * GHL Lead Connector chat widget — A2P 10DLC compliance surface.
 *
 * There are TWO widgets, because there are two separate messaging programs with
 * separate A2P registrations and separate consent records:
 *
 *   CUSTOMER   69dc8296d0d6ea566ec47460 — the water business
 *   RECRUITING 6a74af1597ea74e60a4c73c6 — the recruiting line
 *
 * Only one may load per page. Two loader scripts render two chat bubbles, and
 * worse, it becomes ambiguous which messaging program a visitor consented to
 * when they started a chat. The consent surface has to match the program.
 *
 * So: recruiting pages get the recruiting widget, everything else gets the
 * customer widget. Someone chatting from the apply page is a candidate;
 * someone chatting from the homepage is a customer.
 *
 * This lives in React rather than index.html because index.html is static and
 * cannot branch on route.
 */

const CUSTOMER_WIDGET_ID = "69dc8296d0d6ea566ec47460";
const RECRUITING_WIDGET_ID = "6a74af1597ea74e60a4c73c6";

/** Routes that belong to the recruiting messaging program. */
function isRecruitingRoute(pathname: string): boolean {
  return pathname.startsWith("/apply") || pathname.startsWith("/careers");
}

export function ChatWidget() {
  const { pathname } = useLocation();

  // The `careers.` subdomain serves recruiting content at "/", so path alone
  // isn't enough there.
  const isCareersSubdomain =
    typeof window !== "undefined" &&
    window.location.hostname.split(".")[0] === "careers";

  const widgetId =
    isRecruitingRoute(pathname) || isCareersSubdomain
      ? RECRUITING_WIDGET_ID
      : CUSTOMER_WIDGET_ID;

  useEffect(() => {
    const SCRIPT_ID = "ghl-chat-widget";

    // Already showing the right one — leave it alone. Tearing the widget down
    // and rebuilding it on every navigation would drop an in-progress chat.
    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (existing?.dataset.widgetId === widgetId) return;

    // Switching programs (or first mount): remove the old widget and everything
    // it injected, so the two can never be on the page at once.
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
    script.dataset.widgetId = widgetId;
    script.dataset.source = "WEB_USER";
    document.body.appendChild(script);
  }, [widgetId]);

  return null;
}
