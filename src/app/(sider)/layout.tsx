import Header from '@/components/Header';
import s from '@/styles/pages/pages-layout.module.css';

/**
 * Alle sider unntatt forsiden: headeren er mørk fra start, og innholdet
 * skyves ned med headerens høyde så det ikke havner under den.
 */
export default function SiderLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="innhold" className={s['is-offset']}>
        {children}
      </main>
    </>
  );
}
