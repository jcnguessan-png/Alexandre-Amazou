import { loadFont as loadSerif } from '@remotion/google-fonts/CormorantGaramond';
import { loadFont as loadSans } from '@remotion/google-fonts/Archivo';

const serif = loadSerif('normal', { weights: ['500', '600', '700'], subsets: ['latin', 'latin-ext'] });
const serifItalic = loadSerif('italic', { weights: ['500', '600'], subsets: ['latin', 'latin-ext'] });
const sans = loadSans('normal', { weights: ['500', '600', '700'], subsets: ['latin', 'latin-ext'] });

/** Charte du site (Direction C) : bleu nuit + or. */
export const C = {
  ink: '#05050c',
  navy900: '#0d0d1e',
  navy800: '#12122b',
  navy600: '#222248',
  gold: '#c9a84c',
  goldBright: '#e4c977',
  goldDeep: '#9a7b2e',
  cream: '#f4eedf',
  serif: serif.fontFamily,
  serifItalic: serifItalic.fontFamily,
  sans: sans.fontFamily,
};

/** Dégradé or « métal » pour les titres (background-clip: text). */
export const GOLD_GRADIENT =
  'linear-gradient(100deg, #9a7b2e 0%, #e4c977 28%, #fff4cf 46%, #e4c977 62%, #b8923a 100%)';

export const FPS = 30;
export const s = (seconds: number) => Math.round(seconds * FPS);
