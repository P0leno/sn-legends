export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  role: string;
  category: string;
  summary: string;
  description: string;
  highlights: string[];
  stack: string[];
  banner?: string;
  gallery?: string[];
  links: {
    demo?: string;
    channel?: string;
    github?: string;
  };
}

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

export const PROFILE = {
  name: 'сн легендс',
  handle: '@sn_legends',
  location: 'Telegram · 2026',
  availability: '@sn_legends · QUARK',
  heroTitle: 'сн легендс',
  heroSubtitle:
    'Создаю экосистему QUARK в Telegram: игровой мини-апп QuarkApp, бота @quarkgiftbot и канал @quarkgift.',
  telegram: 'https://t.me/sn_legends',
  quarkBot: 'https://t.me/quarkgiftbot',
  quarkChannel: 'https://t.me/quarkgift',
};

export const FEATURED_TRACK: TrackItem = {
  id: 'madk1d-8-milya',
  title: '8 миля',
  artist: 'madk1d, VILLIAN',
  sourceLabel: 'SoundCloud',
  soundcloudUrl: 'https://soundcloud.com/search/sounds?q=madk1d%208%20%D0%BC%D0%B8%D0%BB%D1%8F',
  audioSrc: '',
  durationLabel: '02:44',
  durationSeconds: 164,
  cover: './assets/quark/quark-bot.jpg',
};

export const PROJECTS: ProjectItem[] = [
  {
    id: 'quark-gift-bot',
    title: 'QUARK',
    subtitle: 'QuarkApp · @quarkgiftbot · @quarkgift',
    year: '2026',
    role: 'Создатель',
    category: 'Telegram Mini App · Gifts',
    summary:
      'Игровой мини-апп QuarkApp и инфраструктура для операций с Telegram-подарками. Быстрые раунды, расчёты без задержек и единая тёмная хвойная эстетика.',
    description:
      'QUARK связывает три точки входа в одну систему: игровую мини-аппку QuarkApp внутри Telegram WebView, бота @quarkgiftbot для управления балансом и подарками, и канал @quarkgift с обновлениями. Ставка сделана на скорость отклика, предсказуемую логику и чистый визуал без перегруза.',
    highlights: [
      'QuarkApp — игровой мини-апп внутри Telegram с плавной анимацией и мгновенным расчётом',
      '@quarkgiftbot — депозиты, выводы, профиль и автоматизация операций с подарками',
      '@quarkgift — единый визуальный язык, анонсы обновлений и комьюнити проекта',
    ],
    stack: ['QuarkApp', '@quarkgiftbot', '@quarkgift', 'Telegram Mini Apps'],
    banner: './assets/quark/quark-coming-soon.jpg',
    gallery: [
      './assets/quark/quark-bot.jpg',
      './assets/quark/quark-welcome.jpg',
      './assets/quark/quark-support.jpg',
      './assets/quark/quark-channel.jpg',
    ],
    links: {
      demo: 'https://t.me/quarkgiftbot',
      channel: 'https://t.me/quarkgift',
    },
  },
];
