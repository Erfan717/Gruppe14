import { stack } from '@/data/site';
import s from '@/styles/components/TechStack.module.css';

/**
 * Teknologiene gruppa har jobbet med. Dette er det en arbeidsgiver ser etter
 * først, så det får sin egen seksjon i stedet for å ligge gjemt i bioene.
 *
 * Lista ligger i site.ts — legg til noe der, så dukker det opp her.
 */
export default function TechStack() {
  return (
    <section className={s.stack}>
      <div className="container">
        <p className="label">Verktøy vi har erfaring med</p>

        <ul className={s['stack__grid']}>
          {stack.map((item, i) => (
            <li key={item.name} className={s['stack__item']}>
              <span className={s['stack__num']}>{String(i + 1).padStart(2, '0')}</span>
              <span className={s['stack__name']}>{item.name}</span>
              <span className={s['stack__note']}>{item.note}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
