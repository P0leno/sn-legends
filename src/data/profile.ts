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

export interface QuarkNodeItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  href: string;
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
  location: 'Telegram, 2026',
  availability: '@sn_legends',
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
  soundcloudUrl: 'https://soundcloud.com/madk1d9/8-milya',
  audioSrc: './assets/music/8-milya.mp3',
  durationLabel: '01:54',
  durationSeconds: 114,
  cover: './assets/music/8-milya-cover.jpg',
};

export const QUARK_NODES: QuarkNodeItem[] = [
  {
    id: 'quark-bot',
    title: '@quarkgiftbot',
    subtitle: 'Бот для депозитов, вывода Telegram Gifts и быстрого входа в QuarkApp.',
    image: './assets/quark/quark-bot.jpg',
    href: 'https://t.me/quarkgiftbot',
  },
  {
    id: 'quark-channel',
    title: '@quarkgift',
    subtitle: 'Основной канал с релизами, раздачами подарков и новостями платформы.',
    image: './assets/quark/quark-channel.jpg',
    href: 'https://t.me/quarkgift',
  },
  {
    id: 'quark-support',
    title: 'Support',
    subtitle: 'Прямая поддержка игроков и помощь по любым операциям с подарками.',
    image: './assets/quark/quark-support.jpg',
    href: 'https://t.me/quarkgiftbot',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'quark-gift-bot',
    title: 'QUARK',
    subtitle: 'Игровая экосистема и обмен подарков внутри Telegram',
    year: '2026',
    role: 'Создатель',
    category: 'Telegram Mini App',
    summary:
      'Игровой мини-апп QuarkApp, бот @quarkgiftbot и канал @quarkgift. Быстрые раунды, депозиты и вывод подарков без задержек внутри Telegram.',
    description:
      'QUARK связывает игровой мини-апп QuarkApp внутри Telegram WebView, бота @quarkgiftbot для баланса и подарков, а также канал @quarkgift с обновлениями.',
    highlights: [
      'QuarkApp: игровой мини-апп внутри Telegram с мгновенным расчётом',
      '@quarkgiftbot: депозиты, выводы, профиль и операции с подарками',
      '@quarkgift: обновления, анонсы и комьюнити проекта',
    ],
    stack: ['QuarkApp', '@quarkgiftbot', '@quarkgift'],
    banner: './assets/quark/quark-welcome.jpg',
    gallery: [
      './assets/quark/quark-bot.jpg',
      './assets/quark/quark-channel.jpg',
      './assets/quark/quark-support.jpg',
    ],
    links: {
      demo: 'https://t.me/quarkgiftbot',
      channel: 'https://t.me/quarkgift',
    },
  },
];
