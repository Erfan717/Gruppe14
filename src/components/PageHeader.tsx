import s from '@/styles/components/PageHeader.module.css';

/**
 * Toppen av en underside. Samme oppbygning på alle sider som ikke er forsiden,
 * så de får lik rytme uten at markupen gjentas.
 */
type Props = {
  label?: string;
  title: string;
  lead?: string;
  /** Ekstra klasse på innholdet, f.eks. for å gi toppen samme bredde som
   *  resten av siden (brukes på /about/). */
  className?: string;
};

export default function PageHeader({ label, title, lead, className }: Props) {
  return (
    <section className={s['page-header']}>
      <div className={className ? `container ${className}` : 'container'}>
        {label && <p className="label">{label}</p>}
        <h1>{title}</h1>
        {lead && <p className={s['page-header__lead']}>{lead}</p>}
      </div>
    </section>
  );
}
