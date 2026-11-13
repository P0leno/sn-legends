export interface TrackItem {
  id: string;
  title: string;
  artist: string;
  sourceLabel: string;
  soundcloudUrl: string;
  audioSrc?: string;
  durationLabel: string;
  durationSeconds: number;
  cover?: string;
}

export interface AppScreenItem {
  id: string;
  title: string;
  caption: string;
  src: string;
}

export interface TelegramLinkItem {
  id: string;
  handle: string;
  note: string;
  href: string;
}

export const PROFILE = {
  name: 'сн легендс',
  heroTitle: 'сн легендс',
  heroSubtitle: 'Создатель QUARK в Telegram',
  quarkBot: 'https://t.me/quarkgiftbot',
  quarkChannel: 'https://t.me/quarkgift',
};

export const APP_SCREENS: AppScreenItem[] = [
  {
    id: 'crash',
    title: 'Краш',
    caption: 'Живой множитель раунда и цели в один тап.',
    src: './assets/quark/app-crash-hd.jpg',
  },
  {
    id: 'menu',
    title: 'Меню режимов',
    caption: 'Краш, кейсы, апгрейдер, ивенты и инвентарь подарков.',
    src: './assets/quark/app-menu-hd.jpg',
  },
  {
    id: 'case',
    title: 'Кейсы',
    caption: 'Рулетка кейсов с редкими Telegram-подарками.',
    src: './assets/quark/app-case-hd.jpg',
  },
];

export const TELEGRAM_LINKS: TelegramLinkItem[] = [
  {
    id: 'tg-bot',
    handle: '@quarkgiftbot',
    note: 'Бот и QuarkApp',
    href: 'https://t.me/quarkgiftbot',
  },
  {
    id: 'tg-channel',
    handle: '@quarkgift',
    note: 'Канал',
    href: 'https://t.me/quarkgift',
  },
];

export const FEATURED_TRACK: TrackItem = {
  id: 'madk1d-8-milya',
  title: '8 миля',
  artist: 'madk1d, VILLIAN',
  sourceLabel: 'SoundCloud',
  soundcloudUrl: 'https://soundcloud.com/madk1d9/8-milya',
  audioSrc: './assets/music/8-milya.mp3',
  durationLabel: '01:54',
  durationSeconds: 114,
  cover: './assets/music/8-milya-cover.jpg',
};
