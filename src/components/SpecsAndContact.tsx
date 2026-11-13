import { SFArrowUpRightIcon } from '@/components/ui/sf-icons';
import { PROFILE } from '../data/profile';
import './SpecsAndContact.css';

const CURRENT_YEAR = new Date().getFullYear();

const CONTACT_DIRECTORY = [
  {
    id: 'tg-personal',
    label: PROFILE.handle,
    role: 'Личный Telegram',
    href: PROFILE.telegram,
  },
  {
    id: 'tg-bot',
    label: '@quarkgiftbot',
    role: 'Бот и Mini App',
    href: PROFILE.quarkBot,
  },
  {
    id: 'tg-channel',
    label: '@quarkgift',
    role: 'Канал и новости',
    href: PROFILE.quarkChannel,
  },
];

export function SpecsAndContact() {
  return (
    <>
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="contact-split">
            <div className="contact-intro">
              <h2 className="type-section contact-title">Связь</h2>
              <p className="type-body contact-lead">
                По вопросам QUARK, QuarkApp и совместных проектов — напрямую в Telegram.
              </p>
            </div>

            <div className="contact-directory">
              {CONTACT_DIRECTORY.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-dir-item tactile"
                >
                  <span className="contact-dir-handle">{item.label}</span>
                  <span className="contact-dir-role">{item.role}</span>
                  <SFArrowUpRightIcon size={16} className="contact-dir-arrow" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-inner">
          <span className="footer-copy tabular-nums">
            © {CURRENT_YEAR} {PROFILE.name}
          </span>
          <span className="footer-meta">QUARK · Telegram</span>
        </div>
      </footer>
    </>
  );
}
