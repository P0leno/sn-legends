import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const cardData = [
  {
    id: 1,
    title: "QUARK Bot",
    description: "Экосистема для Telegram NFT-подарков (@quarkgiftbot).",
    color: "rgba(62, 180, 114, 0.8)",
  },
  {
    id: 2,
    title: "Жидкое стекло",
    description: "Матовые поверхности, спекулярные грани и точная физика движения.",
    color: "rgba(90, 212, 144, 0.8)",
  },
  {
    id: 3,
    title: "Хвойный минимализм",
    description: "Чёрный фон #040505 и органический зелёный акцент без лишнего шума.",
    color: "rgba(47, 138, 88, 0.8)",
  },
];
