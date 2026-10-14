# Vidéo promo — prompts de production

Concept A : « De l'ordinaire à l'extraordinaire ». Deux formats : 16:9 (60 s) et 9:16 (30 s).

---

## 0. Instructions pour Claude — mission en cours : nouvelle voix off dynamique

### Pourquoi
La première voix off a été refusée : **trop molle, trop lente**. On veut une voix **dynamique,
rapide, vivante**, qui donne de l'élan, comme une bande-annonce de film américain.
La musique est validée : on n'y touche pas.

### État du projet (ne pas refaire)
Déjà livrés — **ne rien régénérer, ne rien écraser, ne rien déplacer** : tous les plans de
`broll\`, `musique.mp3`, `musique-9x16.mp3`, le dossier `_alt\`, et les anciennes voix
`vo-16x9.mp3` / `vo-9x16.mp3` (abandonnées mais conservées).

### Ta mission
Générer avec le connecteur **ElevenLabs** **une phrase par fichier** (section 2) : 19 phrases
pour la version 16:9 et 10 pour la 9:16. Chaque phrase est posée au montage à un instant précis :
elle doit **tenir dans sa durée maximale**.

### Dossier de destination (le seul où écrire)
```
C:\Users\jcngu\OneDrive\Desktop\Projets Claude\Alexandre-Amazou\video\public\private\vo2\
```
Créer `vo2\` s'il n'existe pas. Exclu de Git : n'écris rien ailleurs, ne commite rien.

### Noms de fichiers — exacts
- Version 16:9 : `16x9-01.mp3` … `16x9-19.mp3`
- Version 9:16 : `9x16-01.mp3` … `9x16-10.mp3`
- Prises non retenues (facultatif) : `vo2\_alt\<même nom>`

### Déroulé
1. **Choix de la voix** (une seule pour les 29 fichiers) : dans la Voice Library, une voix
   masculine **française**, énergique, chaleureuse et assurée, style « promo / bande-annonce /
   annonceur ». Fais 2 essais sur la phrase 16x9-04 avec 2 ou 3 voix et garde la plus vivante.
   Indique à JC laquelle tu as choisie.
2. **Réglages** (identiques pour tous les fichiers, pour un rendu homogène) :
   - Modèle : *Eleven Multilingual v2* (ou *Eleven v3* si disponible, plus expressif) ;
   - Stability ≈ **30 %**, Similarity ≈ 80 %, Style ≈ **60 %**, Speaker boost activé ;
   - Vitesse (*speed*) ≈ **1,12** ;
   - Intention : débit soutenu, attaque nette, sourire dans la voix, montée d'énergie sur les
     points d'exclamation. Pas de pauses longues, pas de ton solennel ni chuchoté.
3. **Génération** : un fichier par ligne du tableau, texte **exact** (sans les guillemets).
   Pas de silence en début de fichier (moins de 0,1 s), ni plus de 0,3 s à la fin.
4. **Contrôle de durée** : chaque fichier doit durer **au plus** sa colonne « Max ».
   ```
   ffprobe -v error -show_entries format=duration -of csv=p=0 "<fichier>"
   ```
   Trop long ? Régénère avec une vitesse plus élevée (jusqu'à 1,2), sinon signale-le.
5. **Déclaration** : dans `video\src\media.ts`, passer `voixDynamique: false` à
   `voixDynamique: true`. Ne modifier rien d'autre.
6. **Compte rendu** à JC : voix choisie, réglages, et la liste des 29 fichiers avec leur durée
   (en signalant ceux qui dépassent). Ne lance aucun rendu vidéo.

### Interdits
- Ne modifier aucun autre fichier que la ligne `voixDynamique` de `video\src\media.ts`.
- Ne pas imiter la voix d'une personne réelle (ni celle du Pasteur).
- Ne pas écraser la musique ni les plans existants.

---

## 1. Plans IA — Higgsfield (secours : Veo dans Gemini)

Règles pour tous les plans :
- **Ne jamais générer le visage du Pasteur**, ni animer ses photos.
- 1080p minimum, 16:9. Générer **aussi en 9:16** les plans B3 (foule), qui sert dans la version verticale.
- Durée : 5 à 8 s (on recadre au montage). Pas de texte à l'image.
- Étalonnage commun : noirs profonds bleutés, hautes lumières dorées et chaudes, grain film léger.

### B1 — Bible dans la lumière → `broll/bible.mp4` (0:04–0:08)
```
Cinematic macro shot of an old leather Bible lying open on a dark wooden table, pages slowly turning by themselves in slow motion, a single shaft of warm golden volumetric light falling from above through floating dust particles, deep navy-black background, shallow depth of field, anamorphic lens, 85mm, subtle lens flare, slow dolly-in, moody, reverent, epic film trailer look, 24fps, high contrast, golden highlights, film grain. No text, no people.
```

### B2 — Abidjan au lever du soleil → `broll/abidjan.mp4` (0:14–0:17)
```
Epic aerial drone shot at sunrise over a modern West African coastal city with a lagoon and skyscrapers (Abidjan, Plateau district, Côte d'Ivoire), golden hour light breaking through morning haze, sun rays over the water, slow forward drone push with gentle descent, cinematic teal-and-gold color grade, anamorphic lens flare, majestic and hopeful mood, film trailer look, ultra detailed, 24fps. No text.
```

### B3 — Foule en louange → `broll/foule.mp4` (16:9, 0:17–0:20) + `broll/foule-9x16.mp4` (9:16, version verticale 0:02–0:04)
```
Cinematic wide shot from behind a large crowd in a dark stadium-sized church, thousands of people raising their hands in worship, silhouettes against powerful golden stage lights and volumetric haze, light beams sweeping slowly, slow-motion, camera slowly rising (crane up), emotional and triumphant atmosphere, warm gold and deep navy color grade, anamorphic flares, film grain, 24fps. Faces not visible, no text, no logos.
```

### B4 — Livre fermé sur un pupitre → `broll/pupitre.mp4` (0:29–0:31)
```
Dramatic close-up of a closed hardcover book standing on a dark wooden pulpit in an empty dark auditorium, intense warm golden light leaking out from between its pages as if something powerful is inside, dust particles glowing in the beam, slow push-in, deep shadows, mysterious and epic film trailer mood, anamorphic lens, shallow depth of field, 24fps, film grain. No text, no people.
```

---

## 2. Voix off — ElevenLabs, version dynamique (une phrase par fichier)

Voix masculine française énergique, débit soutenu, vivante (voir réglages en section 0).
Les textes et les instants de pose sont aussi dans `src/voix.ts` (source de vérité du montage).

### Version 16:9 (60 s) → `vo2\16x9-XX.mp3`
| Fichier | Posée à | Max | Texte |
|---|---|---|---|
| 16x9-01 | 0:00,3 | 2,0 s | Certaines voix passent. |
| 16x9-02 | 0:02,6 | 2,8 s | D'autres… transforment des vies ! |
| 16x9-03 | 0:05,6 | 2,3 s | Depuis plus de trente ans, une mission : |
| 16x9-04 | 0:08,0 | 3,5 s | transformer des personnes ordinaires en de véritables leaders ! |
| 16x9-05 | 0:11,8 | 4,5 s | Partie d'Abidjan, cette voix résonne aujourd'hui dans les nations. |
| 16x9-06 | 0:18,6 | 4,8 s | De Montréal à Paris, de Genève à Kinshasa. |
| 16x9-07 | 0:24,0 | 1,7 s | Dix mille personnes chaque année. |
| 16x9-08 | 0:25,8 | 2,4 s | Plus de mille cinq cents leaders formés. |
| 16x9-09 | 0:28,5 | 2,3 s | Son enseignement ne s'écoute pas seulement… |
| 16x9-10 | 0:30,9 | 0,9 s | Il se vit ! |
| 16x9-11 | 0:31,9 | 2,3 s | La Réalité du Monde des Esprits. |
| 16x9-12 | 0:34,3 | 2,3 s | Quarante jours de combat spirituel. |
| 16x9-13 | 0:36,7 | 2,4 s | Comment préparer et réussir une nouvelle année. |
| 16x9-14 | 0:39,2 | 1,9 s | Mon Journal de victoire. |
| 16x9-15 | 0:41,2 | 2,3 s | Onze ouvrages pour bâtir votre victoire ! |
| 16x9-16 | 0:43,6 | 3,3 s | Sur Amazon, à la Librairie Alliance et sur alexandreamazou.com. |
| 16x9-17 | 0:49,0 | 2,6 s | Votre histoire n'est pas terminée. |
| 16x9-18 | 0:54,6 | 2,2 s | Enseignements, livres, podcast… |
| 16x9-19 | 0:57,0 | 2,5 s | Abonnez-vous. Rejoignez-nous ! |

### Version 9:16 (30 s) → `vo2\9x16-XX.mp3`
| Fichier | Posée à | Max | Texte |
|---|---|---|---|
| 9x16-01 | 0:00,1 | 1,8 s | Trente ans. Une mission. |
| 9x16-02 | 0:02,0 | 3,3 s | Transformer des personnes ordinaires en véritables leaders ! |
| 9x16-03 | 0:05,5 | 3,0 s | D'Abidjan à Montréal, de Paris à Genève. |
| 9x16-04 | 0:08,6 | 1,3 s | Dix mille personnes par an ! |
| 9x16-05 | 0:10,1 | 2,6 s | La Réalité du Monde des Esprits. |
| 9x16-06 | 0:13,1 | 2,6 s | Quarante jours de combat spirituel. |
| 9x16-07 | 0:16,1 | 2,8 s | Comment préparer et réussir une nouvelle année. |
| 9x16-08 | 0:19,1 | 4,4 s | Sur Amazon, à la Librairie Alliance et sur alexandreamazou.com. |
| 9x16-09 | 0:23,8 | 2,4 s | Votre histoire n'est pas terminée. |
| 9x16-10 | 0:26,8 | 2,9 s | Abonnez-vous. Rejoignez-nous ! |

### Enregistrement du Pasteur (recommandé)
Au téléphone, pièce calme, à 20 cm du micro, 3 prises **avec énergie**, pas trop lentes
(moins de 2,5 s) : « Votre histoire n'est pas terminée. » → `pasteur-fin.mp3`.

---

## 3. Musique — ElevenLabs Music (ou Gemini) → `musique.mp3` + `musique-9x16.mp3`

Deux pistes **instrumentales** (aucune parole), calées sur le montage. Les repères en secondes
correspondent aux images : les respecter à ±0,5 s. La voix off est mixée par-dessus : garder les
médiums dégagés pendant qu'elle parle (pas de lead mélodique chargé).

Déposer dans `video\public\private\` puis déclarer dans `video\src\media.ts` :
`musique: 'private/musique.mp3'` et `musique9x16: 'private/musique-9x16.mp3'`.

### Piste 16:9 — 60 s exactement → `musique.mp3`
```
Instrumental cinematic trailer score, exactly 60 seconds, no vocals, no lyrics (wordless choir "ah" allowed only at the end). Style: Hollywood epic inspirational trailer, hybrid orchestral — strings, low brass, piano, deep taiko and hybrid percussion, sub-bass braams, risers, airy pads. Mood: reverent, hopeful, majestic, spiritual, goosebumps. Key: D minor resolving to D major at the end. Tempo 90 BPM with a half-time feel. Leave the mid-range clear for a male French voice-over: no busy lead melody.

Structure (timestamps are strict):
0:00–0:08 Intro — near silence, low drone, slow heartbeat pulse, soft felt-piano notes, distant shimmer. A deep sub "braam" at 0:04.
0:08–0:20 Rise — warm string ostinato enters, gentle pulse, piano motif, steady build of hope.
0:20–0:29 Momentum — tom and taiko groove enters, strings swell; two clean percussive hits at 0:25 and 0:27.
0:29–0:31 Tension — reverse swell and riser, everything sucks out.
0:31 MASSIVE IMPACT — huge hit plus braam, then full epic section.
0:31–0:47 Epic — driving hybrid percussion, soaring strings and brass, triumphant and powerful, intensity growing to a peak at 0:46.
0:47–0:48 Hard stop — complete silence for about 1 second.
0:48–0:54 Resolution — one big emotional major chord, wordless choir and strings bloom, slow and majestic.
0:54–0:60 Outro — warm sustained chord with a final gentle hit at 0:54, then a soft fade to silence by 0:60.
```

### Piste 9:16 — 30 s exactement → `musique-9x16.mp3`
```
Instrumental cinematic trailer score, exactly 30 seconds, no vocals, no lyrics. Same style as an epic inspirational Hollywood trailer: hybrid orchestral strings, low brass, piano, taiko and hybrid percussion, braams, risers. Reverent, hopeful, majestic. D minor resolving to D major. 90 BPM, half-time feel. Keep the mid-range clear for a voice-over.

Structure (timestamps are strict):
0:00 Immediate impact hit with a bright shimmer (hook, no slow intro).
0:00–0:10 Fast build — string ostinato and pulse, percussion grows.
0:10 Big impact plus braam.
0:10–0:23 Epic section — driving percussion, soaring strings and brass, triumphant.
0:23–0:24 Short stop, half a second of silence.
0:24–0:30 Resolution — big emotional major chord with wordless choir, final hit at 0:27, fade out by 0:30.
```

### Conseils de génération
- **ElevenLabs Music** : coller le prompt, régler la durée sur 60 s (puis 30 s), forcer
  l'instrumental. Si l'outil propose un plan de composition par sections, reprendre les
  sections et durées ci-dessus. Générer 3 versions et garder celle dont l'impact tombe le plus
  près de 0:31 (16:9) ou 0:10 (9:16).
- **Gemini** : la génération musicale y est limitée à des pistes courtes (environ 30 s). Elle
  convient pour la piste 9:16, pas pour celle de 60 s.
- Vérifier la durée avec `ffprobe` ; si la piste dépasse légèrement, je la recale au montage.

---

## 4. Rendus

```
cd video
npm run studio       # prévisualisation interactive
npm run render:16x9  # out/promo-16x9.mp4
npm run render:9x16  # out/promo-9x16.mp4
```
Avant le rendu final : passer `SHOW_PLACEHOLDER_LABELS` à `false` dans `src/media.ts`.
