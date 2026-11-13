import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { SFArrowUpRightIcon, SFGiftIcon, SFMegaphoneIcon, SFPaperplaneIcon } from '@/components/ui/sf-icons';
import { PROFILE } from '../data/profile';
import './ProjectsSection.css';

type EcosystemTabId = 'app' | 'bot' | 'channel';

interface ShowcaseGift {
  name: string;
  collection: string;
  src: string;
}

const SHOWCASE_GIFTS: ShowcaseGift[] = [
  {
    name: 'Plush Pepe',
    collection: 'Редкий гифт',
    src: 'https://cdn.changes.tg/gifts/models/Plush%20Pepe/png/Original.png',
  },
  {
    name: "Durov's Cap",
    collection: 'Коллекция',
    src: "https://cdn.changes.tg/gifts/models/Durov's%20Cap/png/Original.png",
  },
  {
    name: 'Kissed Frog',
    collection: 'Топ-пул',
    src: 'https://cdn.changes.tg/gifts/models/Kissed%20Frog/png/Original.png',
  },
  {
    name: 'Astral Shard',
    collection: 'Аукцион',
    src: 'https://cdn.changes.tg/gifts/models/Astral%20Shard/png/Original.png',
  },
];

interface EcosystemTab {
  id: EcosystemTabId;
  title: string;
  handle: string;
  heading: string;
  summary: string;
  detail: string;
  ctaLabel: string;
  href: string;
}

const ECOSYSTEM_TABS: EcosystemTab[] = [
  {
    id: 'app',
    title: 'QuarkApp',
    handle: 'Mini App',
    heading: 'Игровые раунды и инвентарь подарков в Telegram WebView',
    summary:
      'QuarkApp объединяет быстрые пулы на коллекционные Telegram Gifts, мгновенный расчёт раундов и управление инвентарём внутри мессенджера.',
    detail: 'Запуск без лишних регистраций — сразу через аккаунт Telegram.',
    ctaLabel: 'Открыть QuarkApp',
    href: PROFILE.quarkBot,
  },
  {
    id: 'bot',
    title: '@quarkgiftbot',
    handle: 'Бот и баланс',
    heading: 'Мгновенные депозиты и вывод подарков без задержек',
    summary:
      'Официальный бот платформы принимает коллекционные Telegram Gifts на баланс, открывает QuarkApp в один клик и отправляет выигрыш на ваш аккаунт.',
    detail: 'Вся история операций и реферальные бонусы хранятся в профиле.',
    ctaLabel: 'Запустить бота',
    href: PROFILE.quarkBot,
  },
  {
    id: 'channel',
    title: '@quarkgift',
    handle: 'Канал и саппорт',
    heading: 'Релизы обновлений, раздачи редких гифтов и поддержка 24/7',
    summary:
      'В основном канале публикуются новые режимы, патчи экосистемы, конкурсы с редкими подарками и прямой контакт службы поддержки игроков.',
    detail: 'Оперативная помощь по депозитам, выводу и любым вопросам.',
    ctaLabel: 'Перейти в канал',
    href: PROFILE.quarkChannel,
  },
];

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState<EcosystemTabId>('app');
  const shouldReduceMotion = Boolean(useReducedMotion());
  const currentTab = ECOSYSTEM_TABS.find((t) => t.id === activeTab) ?? ECOSYSTEM_TABS[0];

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-header">
          <h2 className="type-section section-title">Экосистема QUARK</h2>
          <p className="type-body section-lead">
            Единая связка мини-аппа QuarkApp, бота @quarkgiftbot и канала @quarkgift для работы с подарками Telegram.
          </p>
        </div>

        <div className="quark-showcase-grid">
          {/* Left: Clean Segmented Pill Switcher + Editorial Copy */}
          <div className="quark-controls-col">
            <div className="quark-segmented" role="tablist" aria-label="Разделы экосистемы QUARK">
              {ECOSYSTEM_TABS.map((tab) => {
                const isActive = tab.id === activeTab;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`quark-segment-btn ${isActive ? 'is-active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.title}
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentTab.id}
                className="quark-active-copy"
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
              >
                <h3 className="quark-active-heading">{currentTab.heading}</h3>
                <p className="type-body quark-active-summary">{currentTab.summary}</p>
                <p className="quark-active-detail">{currentTab.detail}</p>
              </motion.div>
            </AnimatePresence>

            <div className="project-cta-row">
              <a
                href={currentTab.href}
                target="_blank"
                rel="noopener noreferrer"
                className="ui-btn ui-btn--primary"
              >
                <span>{currentTab.ctaLabel}</span>
                <SFArrowUpRightIcon size={15} />
              </a>

              <a
                href={PROFILE.quarkChannel}
                target="_blank"
                rel="noopener noreferrer"
                className="ui-btn ui-btn--secondary"
              >
                <span>Канал @quarkgift</span>
                <SFArrowUpRightIcon size={15} />
              </a>
            </div>
          </div>

          {/* Right: Interactive Mini App UI Fragment (data-ui) */}
          <div className="quark-stage-frame" data-ui aria-live="polite">
            <div className="stage-chrome">
              <div className="stage-brand">
                <img
                  src="./assets/quark/quark-logo.png"
                  alt=""
                  width={20}
                  height={20}
                  className="stage-brand-icon"
                  draggable={false}
                />
                <span className="stage-brand-name">QUARK</span>
              </div>
              <span className="stage-pill">{currentTab.handle}</span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                className="stage-body"
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
              >
                {activeTab === 'app' && (
                  <>
                    <div className="stage-caption-row">
                      <span className="stage-caption-title">Пул коллекционных гифтов</span>
                      <span className="stage-status-dot">Live</span>
                    </div>

                    <div className="stage-gifts-grid">
                      {SHOWCASE_GIFTS.map((gift) => (
                        <div key={gift.name} className="stage-gift-tile">
                          <img
                            src={gift.src}
                            alt={gift.name}
                            className="stage-gift-img"
                            loading="eager"
                            draggable={false}
                          />
                          <div className="stage-gift-meta">
                            <span className="stage-gift-name">{gift.name}</span>
                            <span className="stage-gift-sub">{gift.collection}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {activeTab === 'bot' && (
                  <>
                    <div className="stage-caption-row">
                      <span className="stage-caption-title">@quarkgiftbot</span>
                      <span className="stage-status-muted">Instant Bot</span>
                    </div>

                    <div className="stage-rows-list">
                      <div className="stage-list-row">
                        <span className="stage-row-icon">
                          <SFGiftIcon size={16} />
                        </span>
                        <div className="stage-row-text">
                          <span className="stage-row-name">Депозит Telegram Gifts</span>
                          <span className="stage-row-sub">Автоматическое зачисление в инвентарь QuarkApp</span>
                        </div>
                      </div>

                      <div className="stage-list-row">
                        <span className="stage-row-icon">
                          <SFPaperplaneIcon size={16} />
                        </span>
                        <div className="stage-row-text">
                          <span className="stage-row-name">Моментальный вывод</span>
                          <span className="stage-row-sub">Прямая отправка подарка на ваш аккаунт в Telegram</span>
                        </div>
                      </div>
                    </div>

                    <div className="stage-gift-pair">
                      <img
                        src="https://cdn.changes.tg/gifts/models/Signet%20Ring/png/Original.png"
                        alt="Signet Ring"
                        className="stage-pair-img"
                        loading="eager"
                        draggable={false}
                      />
                      <img
                        src="https://cdn.changes.tg/gifts/models/Scared%20Cat/png/Original.png"
                        alt="Scared Cat"
                        className="stage-pair-img"
                        loading="eager"
                        draggable={false}
                      />
                    </div>
                  </>
                )}

                {activeTab === 'channel' && (
                  <>
                    <div className="stage-caption-row">
                      <span className="stage-caption-title">@quarkgift</span>
                      <span className="stage-status-muted">Новости и саппорт</span>
                    </div>

                    <div className="stage-rows-list">
                      <div className="stage-list-row">
                        <span className="stage-row-icon">
                          <SFMegaphoneIcon size={16} />
                        </span>
                        <div className="stage-row-text">
                          <span className="stage-row-name">Релизы и раздачи</span>
                          <span className="stage-row-sub">Обновления режимов, анонсы и дропы подарков</span>
                        </div>
                      </div>

                      <div className="stage-list-row">
                        <span className="stage-row-icon">
                          <SFGiftIcon size={16} />
                        </span>
                        <div className="stage-row-text">
                          <span className="stage-row-name">Поддержка 24/7</span>
                          <span className="stage-row-sub">Быстрая помощь по депозитам и выводу гифтов</span>
                        </div>
                      </div>
                    </div>

                    <div className="stage-gift-pair">
                      <img
                        src="https://cdn.changes.tg/gifts/models/Magic%20Potion/png/Original.png"
                        alt="Magic Potion"
                        className="stage-pair-img"
                        loading="eager"
                        draggable={false}
                      />
                      <img
                        src="https://cdn.changes.tg/gifts/models/Loot%20Bag/png/Original.png"
                        alt="Loot Bag"
                        className="stage-pair-img"
                        loading="eager"
                        draggable={false}
                      />
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
