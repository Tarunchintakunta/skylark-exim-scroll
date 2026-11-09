# BRIEF: Skylark Exim scroll story

**Self-authored under explicit creative delegation.** The owner said "Work fully autonomously; don't stop to ask me" and set hard rules in the build request. Those rules are quoted where they apply. Everything else is an authored decision, labelled as such.

Facts come only from the v3 files (`docs/CONTENT.md`, `FINAL_REPORT.md`, `src/config/chapters.ts`). Nothing is invented.

## The eight topics

1. **Vibe.** Authored: crisp, cold, working, exact. References: the owner named terminal-industries.com for feel ("crisp, fast, cinematic"). Authored film reference: a documentary cold open that never cuts away from the work.
2. **The journey, in the owner's words.** "sea catch, unloading, intake, washing/grading, processing, freezing/cold store, documents, port, sailing, world markets, plus the farmed-shrimp path (ponds, harvest, intake, peel, IQF, pack)."
3. **Energy curve.** Authored: calm dawn, a burst of effort on deck, then the plant runs steady and exact, the cold store goes nearly still, the port is the loudest, the open sea is the release, the world map lands quiet and sure.
4. **Feeling, and the one moment.** See the curve and peak below.
5. **The one thing no other site does.** Authored: the navigation is the supply chain. A forked route (two origins, sea and pond, joining at the Anandapuram plant and running to the port and the world) is drawn by your own scroll, and you can switch origin on it.
6. **Range.** Authored: dense-industrial leaning premium-minimal. Off-black ground, cold steel ink, one signal accent (reefer-container orange is avoided as a cliché; chosen accent is a cold "ice" cyan-teal). No cream and brass.
7. **One unbroken world or scenes?** Owner: "Scroll scrubs the frames directly, both down and up", "Keep chapters short", "Every motion moves forward only". Authored decision: **one unbroken world** (continuous world grammar), one fixed stage, chapters as waypoints.
8. **Assets.** Owner: bring-your-own. 4K masters and web clips from v3, logo, favicon, fonts, textures, company profile PDF. No generation, no spend.

## Hard rules from the owner (ship-blockers)

- Never write the regional sea name or the seine-net gear name.
- No invented logos or readable text in visuals. Only one vessel per shot.
- Every motion moves forward only: no clip that rewinds or loops back. Drop any clip that breaks these rules.
- Scroll scrubs frames directly, down and up, no sluggish easing, no slowed wheel.
- Load the current and next chapter first. No frozen or placeholder frames. Page starts on chapter 1's true first frame.
- Dimensional layered hero planes, four or more device families, separate mobile composition, reduced-motion state.

## Journey (beats)

1. Recognition: a working harbour at dawn, a real boat leaving.
2. Effort: the net comes aboard.
3. Care: straight onto ice.
4. Arrival: the truck into the plant, crates off, gills checked.
5. Precision: washed, graded, portioned.
6. Cold: frozen, then held in the store.
7. Order: documents.
8. Scale: the port lifts the reefer aboard.
9. Release: one ship alone on open water.
10. Reach: fifteen markets, and the one action: request a quote.

## Feeling curve (one line per act; emotion, then cause)

| Act | Feeling | Cause on screen |
|---|---|---|
| 1 Setting out | Stillness | A dawn quay in four separate planes; the boat, the breakwater and the hills part slightly as you start to scroll |
| 2 The catch | Effort | The net comes over the rail under your hand, frame by frame |
| 3 On ice | Care | Top-down deck, hands sorting fish into iced crates |
| 4 Into the plant | Arrival | Refrigerated truck through the gate, crates lifted out, gills checked |
| 5 Washed and graded | Precision | Chilled water, fish sorted by size |
| 6 Portioned | Craft | A tuna loin cut on a white board |
| 7 Frozen and held | Cold quiet | Rack into the freezer vapour, then the slow walk down the cold-store aisle |
| 8 Paperwork | Order | A still desk, three short cards: documents, compliance, tracking |
| 9 Loaded | Scale | Forklift to reefer, the spreader lifts the container, the crane over the ship |
| 10 At sea | Release (PEAK) | The hull cutting open water, its wake running past under your hand (hf-ice-wake; hf-sail dropped: tug alongside) |
| 11 The world | Belonging, resolve | Fifteen named markets light on a map from Visakhapatnam; the quote form is right there |

Farmed path replaces acts 1 to 6 with: ponds (calm scale), the meter (trust), harvest (effort), intake (arrival), wash and grade (precision), peel (craft), lab (scrutiny), IQF (cold motion), pack (finish), then joins at the cold store.

## The peak

> "The crane let go of the container and then I was above the ship, and it was the only thing out there, sailing off."

Lives in act 10, At sea. It gets the largest span on the page (1.8 viewport-heights against 0.9 to 1.3 elsewhere) and the act before it (port) is busy, so the open water arrives as contrast. Silence before it is not empty scroll; the contrast is busy-to-empty.

## Tell-someone sentence

> It's the site where you scroll a fish from a boat at dawn all the way onto a ship, and the map you navigate with draws your route as you go.

## Authored silence

None. Every viewport of scroll advances a frame.

## Grammar

**Continuous world** (uniqueness.md §2.4), frame-sequence variant. One fixed canvas stage for the whole story; the only things in document flow on the story are invisible scroll markers. The nav is a map (the route rail). The close is arrival at a place (the world map) with the CTA in it.

Why the other seven lost:
- Filmic one-shot: forbids visible sequence, and this story's sequence is the point.
- Chaptered editorial: forbids a full-bleed scrub and puts media in columns; the owner asked for a cinematic, terminal-industries feel.
- Live surface: there is no software product.
- Typographic poster: forbids photographic ground; the footage is the asset.
- Gallery / catalog: right for Products (used there as a sub-page), wrong for a process story.
- Split stage: no two-sided argument.
- Rhythmic cutlist: bans holds; a cold chain is a steady handover, not a pulse.

Deviation, stated: the engine's worldflight mode scrubs `<video>` legs through a 0.18 lerp. The owner banned easing and asked for frame sequences, so the stage is a page-local canvas frame player (no lerp) that follows the worldflight contract (one fixed stage, a spacer track, one-sided crossfades at seams, copy windows on the whole track, reduced motion shows stills) and publishes `data-sc-verify-state` for the harness. The engine itself is untouched and runs the sub-pages.

## Signature move

**The forked cold-chain route.** A thin route drawn on the edge of the screen: two origins (Sea, Pond) that merge at the Anandapuram plant and run on to the port and the world. Your scroll is the playhead, it inks the line as you travel, each station you pass gets stamped, any station jumps you there, and tapping the other origin re-routes the whole story to that path.

## Score

| Beat | Device | Why |
|---|---|---|
| Setting out | `parallax` (four planes cut from frame 1) + `kinetic` headline | Depth before motion; the hero is a place you are standing in |
| Catch to cold store | `scrub` (frame sequence, direct) | The work moves under the hand |
| Paperwork | `reveal` (cards wipe in) over a held still with push-in | A change of kind: from hands to paper |
| Port to sea | `scrub` | The peak |
| The world | `count` (15 markets, real) + `reveal` map + pointer `spotlight` on fine pointers | Arrival; the numbers are real |
| Route rail | signature move | Navigation that is the story |

Families: parallax, kinetic, scrub, reveal, count, pointer. Six.

## Feel check (after verification, cold, from the live contact sheets)

| Act | Intended | Felt |
|---|---|---|
| Harbour | Stillness | Stillness: the planes part slowly, nothing else moves |
| Catch | Effort | Effort |
| Ice | Care | Care |
| Plant | Arrival | Arrival (three clips read as one handover) |
| Wash | Precision | Precision |
| Cut | Craft | Precision again: wash and cut both read as "work at a steel table" |
| Cold | Cold quiet | Cold quiet |
| Papers | Order | Order, and a welcome pause |
| Port | Scale | Scale |
| Sea | Release (peak) | Release: the largest visual change on the sheet and the longest span |
| World | Belonging, resolve | Resolve: the last screen holds with content and the CTA |

Diff: Wash and Cut produced the same word. Changed: Cut keeps its span short (0.9 vh) and its copy anchor opposite to Wash so the two read as a turn, not a repeat. Not cut, because the owner listed processing as its own step.

**Revision (9 Nov, after review):** hf-sail broke the one-vessel rule (a tug alongside in every frame). The peak now carries the boat under way (hf-ice-wake). It is quieter than the original ship-from-above shot, so the peak leans on the longest span and the busy port before it.
