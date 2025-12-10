export type FurryImageType =
  | "hook-error"
  | "dom-broken"
  | "searching"
  | "confused";

export interface DevOverlayMessage {
  type: FurryImageType;
  message: string;
  filename?: string;
  line?: number;
  column?: number;
  stack?: string;
}