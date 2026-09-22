/**
 * Finner gruppebildet, presentasjonsvideoen og profil-/prosjektbildene i public/.
 *
 * Poenget er at siden skal bygge selv om filene ikke finnes ennå: mangler en
 * fil, returnerer disse null, og komponentene viser en «kommer»-plassholder i
 * stedet. Legg fila inn med riktig navn, så plukkes den opp ved neste bygg —
 * ingen kode trenger å endres.
 *
 * Mappene leses fra disk mens sidene bygges. Fila brukes derfor bare fra
 * serverkomponenter, aldri fra noe med 'use client'.
 */
import fs from 'node:fs';
import path from 'node:path';

const IMAGE_EXT = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];
const VIDEO_EXT = ['.mp4', '.webm', '.mov'];

function list(dir: string): string[] {
  try {
    return fs.readdirSync(path.join(process.cwd(), 'public', dir));
  } catch {
    return [];
  }
}

/** Finner en fil på filnavn uten filendelse, så .jpg og .webp funker like godt. */
function findByBasename(dir: string, basename: string, exts: string[]): string | null {
  const match = list(dir).find((file) => {
    const ext = path.extname(file).toLowerCase();
    return exts.includes(ext) && path.basename(file, path.extname(file)) === basename;
  });
  return match ? `/${dir}/${match}` : null;
}

/** Slår opp et bilde på eksakt filnavn, som i team.ts og projects.ts. */
export function findImage(dir: 'team' | 'projects', filename?: string | null): string | null {
  if (!filename) return null;
  const ext = path.extname(filename).toLowerCase();
  return IMAGE_EXT.includes(ext) && list(dir).includes(filename) ? `/${dir}/${filename}` : null;
}

/** Gruppebildet bak forsiden. Legg det i public/media/gruppebilde.jpg */
export const heroImage = findByBasename('media', 'gruppebilde', IMAGE_EXT);

/** Presentasjonsvideoen. Legg den i public/media/gruppepresentasjon.mp4 */
export const groupVideo = findByBasename('media', 'gruppepresentasjon', VIDEO_EXT);

/** Valgfritt plakatbilde som vises før videoen spilles av. */
export const videoPoster = findByBasename('media', 'video-poster', IMAGE_EXT);
