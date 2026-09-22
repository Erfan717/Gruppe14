import s from '@/styles/components/MediaPlaceholder.module.css';

/**
 * Vises der et bilde eller en video ennå ikke er lagt inn.
 *
 * Poenget er at siden skal se ferdig ut mens gruppa venter på innholdet —
 * ikke som en ødelagt side. Legges fila inn i public/media/, forsvinner
 * denne av seg selv.
 */
type Props = {
  label: string;
  /** 'light' på hvit bakgrunn, 'dark' oppå en mørk flate. */
  tone?: 'light' | 'dark';
};

export default function MediaPlaceholder({ label, tone = 'light' }: Props) {
  return (
    <div className={`${s.placeholder} ${s[`placeholder--${tone}`]}`}>
      <div className={s['placeholder__inner']}>
        <span className={s['placeholder__label']}>{label}</span>
      </div>
    </div>
  );
}
