# Bande-annonce du livre « Comment préparer et réussir une nouvelle année ? » — prompts

Formats : 30 s, 15 s et 6 s en 9:16 (Reels, Stories) ; 30 s et 15 s en 4:5 (fil d'actualité).
Code : `src/livre/` · compositions `Livre30-9x16`, `Livre15-9x16`, `Livre6-9x16`, `Livre30-4x5`, `Livre15-4x5`.
Médias à déposer dans `video\public\private\livre\` (hors Git), puis à déclarer dans `src/livre/config.ts`.

---

## 1. Plans IA — Higgsfield → `livre\broll\<id>.mp4`
Format **9:16**, ≥ 1080×1920, 5 à 8 s, sans texte, sans visage reconnaissable. Le 4:5 est recadré
automatiquement dans le 9:16. Étalonnage : noirs profonds, hautes lumières dorées, grain film.

### L1 — Calendrier → `calendrier.mp4` (accroche « 2027 comme 2026 ? »)
```
Cinematic vertical shot, dark room, pages of an old paper wall calendar tearing off one by one and flying toward the camera in slow motion, warm golden backlight shining through the paper, floating dust particles, deep black background, shallow depth of field, anamorphic lens, moody and suspenseful film trailer look, 24fps. No readable text or numbers, no people.
```

### L2 — Horloge → `horloge.mp4` (« Pas un simple changement de calendrier »)
```
Cinematic vertical extreme close-up of an antique golden clock face, the minute hand clicking onto midnight in slow motion, gears subtly visible, warm golden rim light, dark navy background, dust in the light beam, slow push-in, tense and majestic film trailer mood, 24fps. No text, no people.
```

### L3 — Échecs → `echecs.mp4` (« Un champ de bataille spirituel »)
```
Cinematic vertical shot of a chessboard in darkness, a single golden king chess piece standing tall in the center while silver chess pieces topple and fall around it in dramatic slow motion, a powerful golden spotlight from above, dust particles exploding on impact, low camera angle, epic and victorious film trailer mood, anamorphic lens, 24fps. No text, no people.
```

### L4 — Portes → `portes.mp4` (« Les 4 portes de l'année »)
```
Cinematic vertical shot of four monumental ancient doors standing in a dark hall, the doors slowly opening one after another, intense warm golden light pouring out through the openings, volumetric light beams and dust, slow forward dolly, mysterious and majestic spiritual atmosphere, film trailer look, 24fps. No text, no people.
```

---

## 2. Voix off — ElevenLabs v3 → `livre\vo\<format>-<id>.mp3`
**Même voix féminine que la vidéo du site.** Une phrase par fichier, chacune tenant dans sa durée max.
Textes v3 prêts à coller (balises de ton entre crochets) :

| Fichier | Texte | Max |
|---|---|---|
| 30-01 | `[intrigued] Et si l'année prochaine ressemblait… à celle-ci ?` | 2,3 s |
| 30-02 | `[energetic] Mêmes combats. Mêmes blocages. Mêmes déceptions.` | 2,6 s |
| 30-03 | `[confident] Une nouvelle année n'est pas un simple changement de calendrier.` | 2,8 s |
| 30-04 | `[excited] C'est un champ de bataille spirituel !` | 2,2 s |
| 30-05 | `[warmly] Dans ce livre, le Pasteur Alexandre Amazou vous révèle` | 3,4 s |
| 30-06 | `[confident] les quatre portes de l'année,` | 1,9 s |
| 30-07 | `[confident] les quatre armes de commandement,` | 2,2 s |
| 30-08 | `[excited] et un plan d'action pour la gagner !` | 2,5 s |
| 30-09 | `[confident] Ne subissez plus votre année.` | 1,8 s |
| 30-10 | `[shouts] Commandez-la !` | 1,3 s |
| 30-11 | `[warmly] Disponible dès maintenant sur Amazon.` | 3,5 s |
| 15-01 | `[intrigued] Et si l'année prochaine ressemblait à celle-ci ?` | 2,1 s |
| 15-02 | `[confident] Une nouvelle année est un champ de bataille spirituel.` | 2,8 s |
| 15-03 | `[excited] Découvrez les quatre portes et les quatre armes pour la gagner !` | 3,4 s |
| 15-04 | `[confident] Ne subissez plus votre année. [excited] Commandez-la !` | 2,7 s |
| 15-05 | `[warmly] Disponible sur Amazon.` | 2,4 s |
| 6-01 | reprendre 30-09 | 1,9 s |
| 6-02 | reprendre 30-10 | 1,2 s |
| 6-03 | `[warmly] Sur Amazon.` | 1,7 s |

Une fois déposés : passer `voix: true` dans `src/livre/config.ts`.

---

## 3. Musique — ElevenLabs Music → `livre\musique-30.mp3` (30 s) + `livre\musique-15.mp3` (15 s)

### 30 s
```
Instrumental cinematic trailer music, exactly 30 seconds, no vocals. Modern hybrid trailer: ticking clock pulse, deep sub booms, staccato strings, taiko and hybrid percussion, braams, risers. Mood: suspense turning into victory, hopeful and powerful. 100 BPM. Leave the mid-range clear for a female French voice-over.
Structure (strict): 0:00 ticking clock and a low drone, tension. 0:02.4 three sharp percussive hits at 0:02.4, 0:03.4 and 0:04.4. 0:08.3 BIG IMPACT with braam, then driving epic percussion and strings. 0:21.5 short riser, 0:21.7 silence for half a second, 0:22.2 triumphant hit and a big major chord. 0:25.5 to 0:30 warm triumphant resolution, final hit at 0:25.5, clean ending at 0:30.
```

### 15 s
```
Instrumental cinematic trailer music, exactly 15 seconds, no vocals. Same style: ticking clock, sub booms, staccato strings, hybrid percussion, braams. Suspense turning into victory. 100 BPM, mid-range clear for a voice-over.
Structure (strict): 0:00 ticking clock tension. 0:02.3 BIG IMPACT with braam and driving percussion. 0:09.0 riser, 0:09.1 quick stop, 0:10.5 triumphant hit and major chord. 0:12 to 0:15 triumphant resolution, clean ending at 0:15.
```
La version 6 s réutilise la fin de la piste 15 s.
