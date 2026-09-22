import Link from 'next/link';
import { site, nav, mailtoHref } from '@/data/site';
import s from '@/styles/components/Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={s.footer}>
      <div className={`container ${s['footer__inner']}`}>
        <div className={s['footer__brand']}>
          <Link className={s.logo} href="/">
            <span className={s['logo__mark']}>{site.mark}</span>
            <span>{site.name}</span>
          </Link>
          <p className={s['footer__tagline']}>{site.tagline}</p>
        </div>

        <nav className={s['footer__nav']} aria-label="Bunnmeny">
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <Link className="link-underline" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={s['footer__contact']}>
          <p className={s['footer__label']}>Ta kontakt</p>
          <a className="link-underline" href={mailtoHref}>
            {site.email}
          </a>
        </div>
      </div>

      <div className={`container ${s['footer__legal']}`}>
        <span>
          © {year} {site.name}
        </span>
        <span>Universitetet i Agder</span>
      </div>
    </footer>
  );
}
