# Vidéo promo — prompts de production

Concept A : « De l'ordinaire à l'extraordinaire ». Deux formats : 16:9 (60 s) et 9:16 (30 s).
Une fois générés, déposer les fichiers dans `video/public/private/` (non commité) puis les
déclarer dans `src/media.ts`.

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

### B3 — Foule en louange → `broll/foule.mp4` (0:17–0:20 et version verticale 0:02–0:04)
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

## 3. Musique (Artlist / Epidemic Sound) → `musique.mp3`

Mots-clés : *epic inspirational trailer, hybrid orchestral, cinematic build, emotional piano intro*.
Structure recherchée : intro calme (0–8 s) → montée avec percussions (8–29 s) → impact (31 s) →
section épique (31–45 s) → **coupure nette** (46 s) → résolution chorale (47–60 s).

---

## 4. Rendus

```
cd video
npm run studio       # prévisualisation interactive
npm run render:16x9  # out/promo-16x9.mp4
npm run render:9x16  # out/promo-9x16.mp4
```
Avant le rendu final : passer `SHOW_PLACEHOLDER_LABELS` à `false` dans `src/media.ts`.
