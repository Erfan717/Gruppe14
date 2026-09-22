import Icon from './Icon';
import type { SocialKey } from '@/data/team';
import s from '@/styles/components/SocialLinks.module.css';

/**
 * Lenkeraden på et personkort. Tar imot links-objektet fra team.ts og hopper
 * over de som mangler, så et medlem uten GitHub bare får færre ikoner.
 */
type Props = {
  links: Partial<Record<SocialKey, string>>;
  /** Navnet brukes i aria-label, så skjermlesere hører hvem lenka gjelder. */
  person: string;
  className?: string;
};

const labels: Record<SocialKey, string> = {
  github: 'GitHub',
  linkedin: 'LinkedIn',
  website: 'Nettside',
};

export default function SocialLinks({ links, person, className }: Props) {
  const entries = (Object.keys(labels) as SocialKey[])
    .filter((key) => Boolean(links[key]))
    .map((key) => ({ key, href: links[key] as string, label: labels[key] }));

  if (entries.length === 0) return null;

  return (
    <ul className={className ? `${s.social} ${className}` : s.social}>
      {entries.map(({ key, href, label }) => (
        <li key={key}>
          <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} — ${person}`}>
            <Icon name={key} size={18} />
          </a>
        </li>
      ))}
    </ul>
  );
}
