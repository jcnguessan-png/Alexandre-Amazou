# Vidéo promo — prompts de production

Concept A : « De l'ordinaire à l'extraordinaire ». Deux formats : 16:9 (60 s) et 9:16 (30 s).

---

## 0. Instructions pour Claude — mission en cours : la musique

### État du projet (ne pas refaire)
Déjà livrés et branchés dans le montage — **ne rien régénérer, ne rien écraser, ne rien déplacer** :
- `broll\bible.mp4`, `broll\abidjan.mp4`, `broll\foule.mp4`, `broll\foule-9x16.mp4`, `broll\pupitre.mp4`
- `vo-16x9.mp3`, `vo-9x16.mp3`
- le dossier `_alt\` (variantes de secours)

### Ta mission
Générer **les deux pistes musicales instrumentales** de la section 3 avec le connecteur
**ElevenLabs** (ElevenLabs Music), les déposer dans le projet et les déclarer.

### Dossier de destination (le seul où écrire)
```
C:\Users\jcngu\OneDrive\Desktop\Projets Claude\Alexandre-Amazou\video\public\private\
```
Ce dossier est exclu de Git (médias privés) : n'écris rien ailleurs, ne commite rien.

### Fichiers attendus — noms exacts
| Fichier | Contenu | Durée | Format |
|---|---|---|---|
| `musique.mp3` | Piste 16:9 (section 3) | **60 s** | MP3 44,1 kHz, stéréo |
| `musique-9x16.mp3` | Piste 9:16 (section 3) | **30 s** | MP3 44,1 kHz, stéréo |
| `_alt\musique-alt.mp3`, `_alt\musique-9x16-alt.mp3` | Meilleure variante non retenue | — | idem |

Ne génère **pas** `pasteur-fin.mp3` : JC le fournit.

### Déroulé
1. **Génération** : pour chaque piste, colle le prompt de la section 3 **tel quel** (en anglais),
   règle la durée exacte (60 s puis 30 s) et force le mode **instrumental** (aucune parole).
   Si l'outil propose un plan de composition par sections, reprends les sections et leurs
   durées. Génère **3 versions** de chaque piste.
2. **Choix** : garde la version dont l'impact principal tombe le plus près du repère
   (**0:31** pour la piste 16:9, **0:10** pour la 9:16), qui a bien le silence prévu
   (0:47–0:48 en 16:9, 0:23 en 9:16), et sans voix chantée. La deuxième meilleure va dans `_alt\`.
3. **Téléchargement** sous le nom exact, par exemple :
   ```
   curl -L "<url>" -o "C:\Users\jcngu\OneDrive\Desktop\Projets Claude\Alexandre-Amazou\video\public\private\musique.mp3"
   ```
4. **Vérification** (le fichier existe, n'est pas vide, durée correcte à ±1 s) :
   ```
   ffprobe -v error -show_entries format=duration -of compact "<fichier>"
   ```
5. **Déclaration** dans `video\src\media.ts` — remplacer **uniquement** ces deux lignes :
   ```ts
   musique: 'private/musique.mp3' as string | null, // 60 s, version 16:9
   musique9x16: 'private/musique-9x16.mp3' as string | null, // 30 s, version 9:16
   ```
6. **Compte rendu** à JC : pour chaque piste retenue, sa durée, l'instant réel de l'impact
   principal et du silence (à l'oreille ou par analyse), et ce qui a échoué. Ne lance aucun rendu
   vidéo : c'est fait de l'autre côté.

### Interdits
- Ne modifier aucun autre fichier que `video\src\media.ts` (et seulement les deux lignes ci-dessus).
- Ne pas écraser ni supprimer les plans vidéo et voix off existants.
- Pas de musique avec paroles, ni imitant un artiste ou une œuvre existante.

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

## 2. Voix off — ElevenLabs

Voix : homme, français, grave, chaleureux, posé — type « bande-annonce ».
Réglages de départ : Stability ≈ 40 %, Similarity ≈ 75 %, Style ≈ 30 %, Speaker boost activé.
Exporter en MP3 44,1 kHz. Générer 2 ou 3 prises et garder la plus habitée.

### Version 16:9 (60 s) → `vo-16x9.mp3`
Les `<break>` calent la voix sur l'image. Si le rythme diffère, j'ajuste le montage.
```
Il y a des voix... qu'on entend. <break time="1.2s" />
Et il y a des voix... qui changent une vie. <break time="1.5s" />
Depuis plus de trente ans, une mission... <break time="0.6s" />
transformer des personnes ordinaires... en de véritables leaders. <break time="1.0s" />
D'Abidjan à Montréal. De Paris à Genève. <break time="0.8s" />
Dix mille personnes chaque année. Mille cinq cents leaders formés. <break time="1.0s" />
Un enseignement... qui ne s'écoute pas seulement. <break time="0.7s" />
Il se vit. <break time="8.5s" />
Onze ouvrages pour bâtir votre victoire. Sur Amazon, à la Librairie Alliance, et sur alexandreamazou.com. <break time="3.0s" />
Votre histoire... n'est pas terminée. <break time="2.5s" />
Enseignements. Livres. Podcast. <break time="0.5s" />
Rejoignez-nous.
```
Si le Pasteur enregistre lui-même « Votre histoire n'est pas terminée », retirer cette phrase de la
voix off et déposer son enregistrement dans `pasteur-fin.mp3`.

### Version 9:16 (30 s) → `vo-9x16.mp3`
```
Trente ans. Une mission. <break time="0.3s" />
Transformer des personnes ordinaires en véritables leaders. <break time="0.4s" />
D'Abidjan à Montréal, de Paris à Genève. <break time="0.3s" />
Dix mille personnes chaque année. <break time="0.6s" />
Des enseignements qui se vivent. <break time="6.5s" />
Sur Amazon, à la Librairie Alliance et sur alexandreamazou.com. <break time="0.5s" />
Votre histoire n'est pas terminée. <break time="0.8s" />
Abonnez-vous. Rejoignez-nous.
```

### Enregistrement du Pasteur (recommandé)
Au téléphone, pièce calme, à 20 cm du micro, 3 prises lentes avec une pause entre chaque :
« Votre histoire... n'est pas terminée. »

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
