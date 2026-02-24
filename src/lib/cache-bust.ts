const ASSET_VERSION = "20260224";

export function cacheBust(url: string): string {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}v=${ASSET_VERSION}`;
}
