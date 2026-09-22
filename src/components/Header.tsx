'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { site, nav } from '@/data/site';
import s from '@/styles/components/Header.module.css';

/**
 * Toppmenyen.
 *
 * To tilstander:
 *   overlay — ligger gjennomsiktig oppå gruppebildet på forsiden. Bare teksten
 *             synes, bakgrunnsbildet skinner gjennom.
 *   solid   — mørk flate med blur. Dette er utgangspunktet på alle andre
 *             sider, og det forsiden bytter til når du har scrollet forbi bildet.
 *
 * Tilstanden bestemmes av layouten: (forside) sender overlay, (sider) gjør det
 * ikke. Begge rendres ferdig fra serveren, så headeren blinker ikke ved lasting.
 */
type Props = {
  overlay?: boolean;
};

// Gjør at /about og /about/ regnes som samme side.
const normalize = (path: string) => (path.endsWith('/') ? path : `${path}/`);

export default function Header({ overlay = false }: Props) {
  const current = normalize(usePathname() ?? '/');
  const [solid, setSolid] = useState(!overlay);

  // Headeren blir mørk i det elementet den ligger oppå har scrollet forbi.
  // Elementet merkes med data-header-watch — i praksis gruppebildet på forsiden.
  // Finnes det ikke, gjør dette ingenting, og headeren blir stående slik den
  // ble rendret fra serveren.
  useEffect(() => {
    const watched = document.querySelector('[data-header-watch]');
    if (!overlay || !watched) return;

    // rootMargin trekker toppen av "vinduet" ned med headerens egen høyde, så
    // byttet skjer nøyaktig når bildet slipper undersiden av headeren.
    const offset =
      parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--header-height'),
        10
      ) || 76;

    const observer = new IntersectionObserver(
      ([entry]) => setSolid(!entry.isIntersecting),
      { rootMargin: `-${offset}px 0px 0px 0px`, threshold: 0 }
    );

    observer.observe(watched);
    return () => observer.disconnect();
  }, [overlay]);

  return (
    <header className={`${s.header} ${solid ? s['is-solid'] : s['is-overlay']}`}>
      <div className={s['header__inner']}>
        <Link className={s.logo} href="/" aria-label={`${site.name} — til forsiden`}>
          <span className={s['logo__mark']}>{site.mark}</span>
          <span className={s['logo__word']}>{site.name}</span>
        </Link>

        <nav aria-label="Hovedmeny">
          <ul className={s.nav}>
            {nav.map((item) => {
              const isActive = normalize(item.href) === current;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`${s['nav__link']}${isActive ? ` ${s['is-active']}` : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
