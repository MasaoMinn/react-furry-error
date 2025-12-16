import type { FurryImageType } from "./types";


import hook from './emotes/hook.png';
import dom from './emotes/dom.png';
import confused from './emotes/confused.png';



export const images: Record<FurryImageType, string> = {
  "hook-error": hook,
  "dom-broken": dom,
  "searching": confused,
  "confused": confused,
};