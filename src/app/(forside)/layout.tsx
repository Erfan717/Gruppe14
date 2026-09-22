import Header from '@/components/Header';

/**
 * Forsiden: headeren starter gjennomsiktig oppå bildet i Hero, og <main>
 * trenger ingen luft på toppen fordi bildet skal ligge helt opp under headeren.
 */
export default function ForsideLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header overlay />
      <main id="innhold">{children}</main>
    </>
  );
}
