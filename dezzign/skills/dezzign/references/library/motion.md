# Library — Motion

Made With GSAP and Osmo resources mapped to stramien slots and style directions (mapped 2026-09-30). Slugs resolve in the local osmo library (`~/.osmo/library`); code lives there, never here. Colleagues without the library can still read the behaviour and preview links.

**How to read a row.** `mwg/effectNNN` is a Made With GSAP effect (`~/.osmo/library/mwg/effectNNN.md`),
a bare slug is an Osmo Vault resource (`~/.osmo/library/vault/<slug>.md`). *Fits* and *Avoid in*
name the five directions by slug. This file is outside inspiration mapped onto the house rules: it
never overrides a direction's `## Motion character` or the stramien's `## Motion`. Where they
disagree, the direction wins.

**Driver shorthand** used in the notes: *scrub* = tied to page scroll through ScrollTrigger
(usually pinned, usually with Lenis); *wheel* = reads wheel delta directly and the demo locks page
scroll, so it only works as a contained full-viewport stage or rebuilt on ScrollTrigger; *pointer* =
mouse-move driven, needs a touch fallback; *drag* = Draggable / Observer.

---

## By slot

### Hero headline entrance

| Resource | What it does | Fits | Avoid in | Preview |
|---|---|---|---|---|
| `masked-text-reveal` | Lines or words rise out of a clip mask on load or scroll-in. The house clip reveal, ready-made. | billboard-condensed, flood-and-acid, deep-ground-editorial | warm-daylight (clip is too hard-edged; use a fade) | https://osmo-masked-text-reveal.webflow.io/ |
| `mwg/effect015` Title mask effect | Each word has a duplicate that slides through its own mask, against the scroll direction, as the title crosses a trigger zone. Scrub. | billboard-condensed, deep-ground-editorial | warm-daylight, campaign-poster | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/015.mp4 |
| `mwg/effect027` Letter by letter | Each word acts as a mask; its letters swap for duplicates as you scroll, a split-flap feel. | billboard-condensed | warm-daylight | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/027.mp4 |
| `mwg/effect049` Defying gravity | Letters start scattered at different heights and settle into the title at different speeds as you scroll. Pinned scrub. | flood-and-acid, campaign-poster | warm-daylight, deep-ground-editorial | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/049.mp4 |
| `text-scramble-load-scroll-hover` | Characters scramble through random glyphs before resolving, on load, scroll or hover. | billboard-condensed (tech-leaning clients only) | warm-daylight, campaign-poster | https://osmo-scramble-text-demo.webflow.io/ |
| `rotating-text` / `looping-words-with-selector` | One word in the headline cycles through a short list ("voor bouw / voor zorg / voor logistiek"); the selector version frames the active word. | flood-and-acid, campaign-poster, deep-ground-editorial | billboard-condensed (fights the one-line shout) | https://osmo-rotating-text.webflow.io/ · https://looping-words-with-selector-resource.webflow.io/ |
| `falling-text-with-gravity` | Heading words drop with physics and pile up. A gimmick; one per site at most. | campaign-poster | everything else | https://osmo-falling-text-with-gravity-resource.webflow.io/ |
| `variable-font-weight-hover` | Letter weight swells under the pointer on a variable font. | deep-ground-editorial, warm-daylight (it is weight, not colour — the direction's own emphasis device) | billboard-condensed (condensed display is already at max weight) | https://osmo-variable-font-weight-hover.webflow.io/ |

**House default:** clip for hard directions, fade-up for soft ones (stramien `### Reveal character
— clip versus fade`). The MWG rows are for the one headline per site that deserves more.

### Hero media

| Resource | What it does | Fits | Avoid in | Preview |
|---|---|---|---|---|
| `image-to-background-zoom` | A contained image in the hero grows to fill the viewport as you scroll, becoming the next section's ground (Flip). | billboard-condensed, deep-ground-editorial, warm-daylight (documentary photo only) | campaign-poster | https://osmo-image-to-background-zoom.webflow.io/ |
| `scaling-element-on-scroll-gsap-flip` | A small video or card in the hero scales to full width and back into its slot on scroll. | billboard-condensed (showreel), deep-ground-editorial | warm-daylight | https://osmo-scaling-element-on-scroll-flip.webflow.io/ |
| `bunny-hls-background-video` | Muted looping HLS background video with lazy load and play/pause on visibility. The plumbing for hero type 1. | billboard-condensed, deep-ground-editorial | — | https://osmo-bunny-hls-background-video.webflow.io/ |
| `mini-showreel-player` | A small reel card in the hero corner that expands to a full player on click (Flip). Matches `osnabrugge`'s showreel card. | billboard-condensed, deep-ground-editorial | warm-daylight | https://osmo-mini-showreel-player.webflow.io/ |
| `parallax-image-layers` | Foreground and background layers of one image drift at different rates on scroll. | deep-ground-editorial, flood-and-acid (cut-out on colour field) | billboard-condensed | https://osmo-parallax-image-layers-resource.webflow.io/ |
| `mwg/effect039` Image with perspective | An image tilts toward the pointer's movement angle, and an inner mask zooms with pointer speed. Pointer. | deep-ground-editorial (split hero, product mockup) | warm-daylight | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/039.mp4 |
| `mwg/effect044` Mask effect | A soft gradient mask follows the pointer and reveals a recoloured duplicate of the hero with a different image underneath. Pointer. | flood-and-acid, deep-ground-editorial | warm-daylight | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/044.mp4 |
| `mwg/effect050` Infinite fullscreen scroll | Full-screen images zoom into each other endlessly, forward and back with scroll. Wheel/Observer — a stage, not a page section. | billboard-condensed (portfolio intro) | warm-daylight, campaign-poster | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/050.mp4 |

### Statement band

The stramien's one-oversized-line section. Motion should make it land, not make it busy.

| Resource | What it does | Fits | Avoid in | Preview |
|---|---|---|---|---|
| `highlight-text-on-scroll` | Words of a large sentence brighten from a dim resting colour as the scroll passes them. The ready-made version of `osnabrugge`'s per-character wave. | deep-ground-editorial, flood-and-acid, warm-daylight (subtle dim, not ghosted) | — | https://osmo-highlight-text-on-scroll.webflow.io/ |
| `gradient-wave-text-on-scroll` | A colour gradient washes through the characters on scroll. | deep-ground-editorial | warm-daylight, billboard-condensed | https://osmo-gradient-wave-text-on-scroll.webflow.io/ |
| `highlight-marker-text-reveal` | A marker stroke draws behind one phrase on scroll-in. The one-highlighted-word rule, animated. | campaign-poster, flood-and-acid, warm-daylight | billboard-condensed | https://osmo-highlight-marker-text-reveal.webflow.io/ |
| `sticky-title-scroll-effect` | The statement pins while its lines reveal one by one. | deep-ground-editorial, billboard-condensed | — | https://osmo-sticky-title-scroll-effect.webflow.io/ |
| `mwg/effect046` Letter by letter | Pinned sentence whose letters appear in random order as you scroll. | deep-ground-editorial, billboard-condensed | warm-daylight | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/046.mp4 |
| `mwg/effect011` Smooth letters | The sentence slides right to left with scroll, letters settling into place as they travel. Pinned scrub. | flood-and-acid, deep-ground-editorial | warm-daylight | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/011.mp4 |
| `mwg/effect010` Jazzy letters | Like 011, but letters ride a sine wave and fade at the viewport edges. Playful. | campaign-poster | billboard-condensed, deep-ground-editorial, warm-daylight | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/010.mp4 |
| `mwg/effect032` Circular sentence | The sentence travels along a curved SVG path as you scroll. | campaign-poster, flood-and-acid | billboard-condensed | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/032.mp4 |
| `mwg/effect009` Up & Down | Several short phrases cycle letter by letter: one leaves as the next arrives. Pinned scrub. | billboard-condensed, flood-and-acid | warm-daylight | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/009.mp4 |

### Scroll-told paragraphs

For a manifesto, an "over ons" intro or a mission paragraph that carries the page's argument. One per page.

| Resource | What it does | Fits | Avoid in | Preview |
|---|---|---|---|---|
| `mwg/effect006` / `mwg/effect022` Progressive sentences | One paragraph dissolves word by word while the next assembles in its place; 022 is the multi-paragraph version. Pinned scrub. | deep-ground-editorial | warm-daylight | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/006.mp4 · https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/022.mp4 |
| `mwg/effect005` Word by word | Words fly in from the right edge, staggered, into their final place. Pinned scrub. | flood-and-acid, deep-ground-editorial | warm-daylight | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/005.mp4 |
| `mwg/effect004` Simultaneous words | Words slide in from off-screen with a stacking effect rather than top to bottom. Pinned scrub. | flood-and-acid | warm-daylight | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/004.mp4 |
| `mwg/effect029` Words Shifting | Selected words drift sideways by a random amount on scroll, different every load. Not pinned — cheap. | campaign-poster, deep-ground-editorial | billboard-condensed | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/029.mp4 |
| `mwg/effect036` Stacking images on hover | Hovering certain words deals a quick random stack of photos beside them. Pointer. | campaign-poster, flood-and-acid | warm-daylight, billboard-condensed | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/036.mp4 |
| `mwg/effect041` Dynamic hover | Hovering a sentence ripples its letters outward from the first letter touched. Pointer. | campaign-poster | warm-daylight | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/041.mp4 |

### Section entrances

The house rule is staggered **group** reveals (stramien `### Staggered group reveals`). These are the tools, not an invitation to animate every block.

| Resource | What it does | Fits | Avoid in | Preview |
|---|---|---|---|---|
| `elements-reveal-on-scroll` | Attribute-driven group reveal with stagger; the Osmo equivalent of the house `data-reveal-group`. | all five (set clip for hard directions, fade for soft ones) | — | https://osmo-elements-reveal-on-scroll.webflow.io/ |
| `shutter-scroll-transition` | The next section arrives behind a set of horizontal blades that close then open. | billboard-condensed | warm-daylight, campaign-poster | https://osmo-shutter-scroll-transition.webflow.io/ |
| `arc-scroll-transition` | The next section's edge rises as an arc, middle leading the sides, covering or lifting off the previous one. | flood-and-acid (colour panel over colour panel), deep-ground-editorial | billboard-condensed (curves fight 0px radius) | https://osmo-arc-scroll-transition.webflow.io/ |
| `pixelated-scroll-transition` | The next section resolves through a grid of blocks. Very digital. | tech clients in billboard-condensed only | warm-daylight, deep-ground-editorial, campaign-poster | https://osmo-pixelated-scroll-transition.webflow.io/ |
| `mwg/effect037` Fading transition | Images appear through a moving gradient mask tied to scroll progress. Pinned scrub. | deep-ground-editorial | billboard-condensed | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/037.mp4 |
| `mwg/effect018` Card movement | Cards rise in a wave, linger at centre, then leave with a small bounce. Pinned scrub. | campaign-poster, flood-and-acid | billboard-condensed | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/018.mp4 |
| `global-parallax-setup` | Attribute-driven parallax on any element; inner-image parallax on media blocks is its main use. | deep-ground-editorial, warm-daylight (image-inner only, small amplitude) | — | https://osmo-global-parallax-setup.webflow.io/ |

### Showcase / gallery

| Resource | What it does | Fits | Avoid in | Preview |
|---|---|---|---|---|
| `big-typo-scroll-preview-infinite` | An infinite list of huge project names; the hovered or centred one shows its image. Portfolio index. | billboard-condensed, deep-ground-editorial | warm-daylight | https://osmo-big-typo-scroll-preview.webflow.io/ |
| `mwg/effect033` Random gallery | Photos scroll sideways and play a small entrance and exit as they cross the viewport. Pinned scrub. | warm-daylight (travel/place photography — the one scroll gallery calm enough), deep-ground-editorial | billboard-condensed | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/033.mp4 |
| `mwg/effect034` Different speed columns | Columns of images loop vertically at different speeds. Wheel — rebuild on page scroll. | deep-ground-editorial, flood-and-acid | warm-daylight | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/034.mp4 |
| `mwg/effect035` Smooth thumbnails | Rows of a product/project grid: the hovered row expands to show its items while the others shrink, total height fixed. Pointer. | deep-ground-editorial, warm-daylight (a catalogue that stays calm) | — | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/035.mp4 |
| `mwg/effect025` Randomize & Focus | Scattered cards; the one nearest the pointer comes forward, the rest drift away, with a bouncy feel. Pointer. | campaign-poster, flood-and-acid | billboard-condensed, warm-daylight | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/025.mp4 |
| `mwg/effect043` Soloing images | Cards follow a curved path into a fan as the section crosses the viewport; hover lifts one out. | campaign-poster, flood-and-acid | billboard-condensed | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/043.mp4 |
| `mwg/effect017` Cursor-linked orientation | Every image in a grid turns toward the pointer, more so the further away it is. Pointer. | campaign-poster | billboard-condensed, deep-ground-editorial | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/017.mp4 |
| `mwg/free-effect001` Inertia Plugin | Hovered images get knocked in the pointer's direction with speed-based force, then settle. Pointer. | campaign-poster, flood-and-acid | warm-daylight | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/free-001.mp4 |
| `collage-focus-card-on-hover` | A loose collage where hovering one card spotlights it and dims the rest. | campaign-poster, deep-ground-editorial | billboard-condensed | https://osmo-collage-focus-card-on-hover.webflow.io/ |
| `layout-grid-flip` | Toggle between grid and list view with a Flip morph. Catalogue utility. | warm-daylight, deep-ground-editorial, flood-and-acid | — | https://osmo-layout-grid-flip.webflow.io/ |
| `masonry-grid` | Masonry layout for mixed-ratio photos. Static, no motion cost. | warm-daylight, campaign-poster | billboard-condensed (square grid is the rule there) | https://osmo-masonry-grid.webflow.io/ |
| `before-after-split-slider` | Drag a divider to compare two photos. Renovation, cleaning, landscaping clients. | warm-daylight, billboard-condensed | — | https://osmo-before-after-split-slider.webflow.io/ |
| `play-video-on-hover` | Project tiles play a muted clip on hover, lazily loaded. | billboard-condensed, deep-ground-editorial | warm-daylight | https://osmo-play-video-on-hover.webflow.io/ |
| `mwg/effect026` / `infinite-draggable-grid-basic` | An endless 2D grid of images you drag or scroll in any direction. Drag/Observer — a dedicated page or stage, not a homepage section. | deep-ground-editorial, flood-and-acid (a "werk" index) | warm-daylight | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/026.mp4 · https://osmo-infinite-draggable-grid-basic.webflow.io/ |

### Horizontal / pinned sequences

The "one idea, several pieces of evidence" slot (stramien `### Scroll pinning`). Counts toward the one-pinned-effect budget.

| Resource | What it does | Fits | Avoid in | Preview |
|---|---|---|---|---|
| `horizontal-scrolling-sections` | Vertical scroll drives a row of panels sideways. | flood-and-acid, billboard-condensed, deep-ground-editorial | warm-daylight | https://osmo-horizontal-scrolling-sections.webflow.io/ |
| `mwg/effect038` Dynamic list scrolling | A list slides sideways while one image flips to the item at the centre, like a flip book. Pinned scrub. | deep-ground-editorial, billboard-condensed | warm-daylight | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/038.mp4 |
| `sticky-features` | Text items scroll past a pinned visual that swaps per item. The quiet way to explain a product or process. | warm-daylight, deep-ground-editorial, flood-and-acid | — | https://osmo-sticky-features.webflow.io/ |
| `sticky-steps-basic` / `step-by-step-timeline` | Numbered steps with a progress line that fills as you scroll. The "In 5 treden" slot. | warm-daylight, flood-and-acid (`businessparksoest`'s milestone timeline) | — | https://osmo-sticky-steps-basic.webflow.io/ · https://osmo-step-by-step-timeline.webflow.io/ |
| `draw-path-on-scroll` / `follow-svg-path-on-scroll` | A line draws itself, or an object travels along one, as you scroll — a route, a pipeline, a process. | flood-and-acid, campaign-poster, warm-daylight (thin, in brand colour) | billboard-condensed | https://osmo-draw-path-on-scroll.webflow.io/ · https://osmo-follow-svg-path-on-scroll.webflow.io/ |
| `mwg/effect007` Rounded trajectory | Images ride the rim of a huge off-screen circle that rotates with scroll. Pinned scrub. | deep-ground-editorial, campaign-poster | billboard-condensed | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/007.mp4 |
| `mwg/effect040` Double circular carousel | Two wheels of items rotate in opposite directions at the viewport sides, pairing up at centre. Pinned scrub. Good for "vraag / antwoord" or "before / after" pairs. | flood-and-acid, deep-ground-editorial | warm-daylight | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/040.mp4 |
| `mwg/effect016` Swirling images | Images spiral in from outside the screen toward centre on scroll. | campaign-poster | billboard-condensed, warm-daylight | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/016.mp4 |
| `mwg/effect048` 3D spiral | Images climb a CSS-3D spiral staircase on scroll. No WebGL. | deep-ground-editorial (a showpiece page only) | warm-daylight | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/048.mp4 |

### Card stacks

Flood-and-acid's signature. Everyone else: at most one, and not on the homepage of warm-daylight.

| Resource | What it does | Fits | Avoid in | Preview |
|---|---|---|---|---|
| `stacking-cards-parallax` | Full-width panels pin and pile under each other with slight scale-back. The `eckeveldkleding` pattern. | flood-and-acid, deep-ground-editorial | — | https://osmo-stacking-cards-parallax.webflow.io/ |
| `stacking-sticky-cards-bounce` | Same pile, with an overshoot as each card lands. | campaign-poster (spend the bounce curve here), flood-and-acid | billboard-condensed, deep-ground-editorial | https://osmo-stacking-sticky-cards-bounce.webflow.io/ |
| `stacking-cards-3d-css` | Sticky pile with a CSS 3D tilt as cards recede. | flood-and-acid | warm-daylight | https://osmo-stacking-sticky-cards-3d-css.webflow.io/ |
| `mwg/effect001` Card stack | A pinned deck spreads and slides sideways across a surface as you scroll. | flood-and-acid, campaign-poster | billboard-condensed | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/001.mp4 |
| `mwg/effect003` Card shuffle | Cards arrive one by one from below, gather at centre and fan out, like a dealer. Pinned scrub. | campaign-poster, flood-and-acid | billboard-condensed, deep-ground-editorial | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/003.mp4 |
| `mwg/effect042` Smooth stacking images | A deck; the top card leaves and the rest step forward, per scroll step. Pinned scrub. | deep-ground-editorial, flood-and-acid | — | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/042.mp4 |
| `mwg/effect031` Scrolling sections | Repeated sections pin at the top and recede into depth as the next arrives. For a run of same-shaped blocks (vacancies, locations). | deep-ground-editorial, billboard-condensed | warm-daylight | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/031.mp4 |
| `stacked-cards-slider` / `dropping-cards-stack` / `flick-cards-slider` | A draggable deck you flick through, card by card (testimonials, team). | campaign-poster, flood-and-acid | billboard-condensed | https://osmo-stacked-cards-slider.webflow.io/ · https://osmo-dropping-cards-stack.webflow.io/ · https://osmo-flick-cards-slider.webflow.io/ |

### Lists with hover image

Services, vacancies, projects as a typographic list, with the image appearing only on hover. A strong alternative to a card grid.

| Resource | What it does | Fits | Avoid in | Preview |
|---|---|---|---|---|
| `mwg/effect030` Images on hover | Hovering a list row shows its image in a mask that tracks the pointer's height. | billboard-condensed, deep-ground-editorial | — | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/030.mp4 |
| `image-preview-cursor-follower` | A preview image follows the pointer over list rows and swaps per row. | billboard-condensed, deep-ground-editorial, flood-and-acid | warm-daylight | https://osmo-image-preview-cursor-follower.webflow.io/ |
| `directional-list-hover` | Row fill enters from the side the pointer came in from. Pure interface motion. | all five | — | https://osmo-directional-list-hover.webflow.io/ |
| `momentum-based-hover` | Items nudge in the pointer's direction with inertia. | campaign-poster, flood-and-acid | billboard-condensed | https://osmo-momentum-based-hover.webflow.io/ |

On touch there is no hover: the list must work as plain rows with a thumbnail or an arrow.

### Marquees

Banned in warm-daylight and campaign-poster. See stramien `### Marquee` for the three jobs.

| Resource | What it does | Fits | Avoid in | Preview |
|---|---|---|---|---|
| `css-marquee` | Plain CSS keyframe ticker. Logo row or text band; cheapest option. | billboard-condensed (footer logo track), flood-and-acid | warm-daylight, campaign-poster | https://osmo-css-marquee.webflow.io/ |
| `marquee-with-scroll-direction` | Ticker that reverses with scroll direction. | flood-and-acid, billboard-condensed | warm-daylight, campaign-poster | https://osmo-marquee-with-scroll-direction.webflow.io/ |
| `mwg/effect013` Infinite scrolling movement | A sentence loops forever and speeds up or rewinds with scroll. The scroll-velocity marquee `osnabrugge` hand-built. | deep-ground-editorial, flood-and-acid | warm-daylight, campaign-poster | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/013.mp4 |
| `mwg/effect024` Opposite direction marquees | Two lines loop in opposite directions; the first hands over to the second as you scroll. Two-lane text band. | flood-and-acid (`businessparksoest`'s two lanes) | warm-daylight, campaign-poster | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/024.mp4 |
| `draggable-marquee-directional` | A marquee you can also grab and throw. | flood-and-acid | warm-daylight, campaign-poster | https://osmo-draggable-marquee-directional.webflow.io/ |
| `wavy-marquee` / `radial-text-marquee` | Ticker bent along a wave, or around a circle as a rotating badge. | flood-and-acid | billboard-condensed, warm-daylight, campaign-poster | https://osmo-wavy-marquee.webflow.io/ · https://osmo-radial-text-marquee.webflow.io/ |
| `logo-wall-cycle` | A static logo grid where logos swap in place one cell at a time. The motion-light alternative to a logo marquee, and the one that is allowed in warm-daylight. | warm-daylight, campaign-poster, deep-ground-editorial | — | https://osmo-logo-wall-cycle.webflow.io/ |
| `mwg/effect014` Infinite Stacking Images | Images appear, pile and rotate at varied sizes as you scroll, in an endless loop. Wheel. | flood-and-acid (closing image wall) | warm-daylight | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/014.mp4 |
| `mwg/effect023` Infinite circular movement | Images orbit a big circle with scroll; fast scrolling flings some off their orbit. Wheel. | flood-and-acid, campaign-poster | billboard-condensed, warm-daylight | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/023.mp4 |

### Cursors / mouse-reactive

Banned in warm-daylight and campaign-poster. Never on sites that need precise pointing (forms, configurators, shops).

| Resource | What it does | Fits | Avoid in | Preview |
|---|---|---|---|---|
| `cursor-with-marquee-effect` | Pointer becomes a card with a looping label over hoverable tiles. The house `.cursor-marquee`. | billboard-condensed, deep-ground-editorial, flood-and-acid | warm-daylight, campaign-poster | https://osmo-cursor-with-marquee-effect.webflow.io/ |
| `dynamic-custom-text-cursor` | Pointer label that flips to stay inside the viewport edge. | billboard-condensed, deep-ground-editorial | warm-daylight, campaign-poster | https://osmo-dynamic-text-cursor.webflow.io/ |
| `magnetic-cursor` | Buttons and arrow tiles pull the pointer toward their centre. | billboard-condensed (arrow tiles), deep-ground-editorial | warm-daylight | https://osmo-magnetic-cursor.webflow.io/ |
| `image-trail-following-cursor` / `stacking-image-trail` | A trail of photos drops behind the pointer over a hero or statement. | flood-and-acid | billboard-condensed, warm-daylight, campaign-poster | https://osmo-image-trail-following-cursor.webflow.io/ · https://osmo-stacked-image-trail.webflow.io/ |
| `mwg/effect002` Images following cursor | A masked window follows the pointer; distance travelled flips to the next image. | deep-ground-editorial | warm-daylight | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/002.mp4 |
| `mwg/effect020` Sliding mouse trail | Images slide out along the direction the pointer came from. | flood-and-acid | warm-daylight | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/020.mp4 |
| `mwg/effect021` Bubbly mouse trail | Images pop along the pointer path with a snappy, random scale. | flood-and-acid | billboard-condensed, deep-ground-editorial, warm-daylight | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/021.mp4 |
| `mwg/free-effect002` Gravity Mouse Trail | Images spawn at the pointer, fall, bounce off the floor and fade. | flood-and-acid (404 page, a playful band) | everything on a homepage | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/free-002.mp4 |
| `interactive-dots-grid-background` | A dot grid behind a section that reacts to the pointer. Ambient ground, not a cursor. | deep-ground-editorial | warm-daylight, campaign-poster | https://osmo-interactive-dots-grid-background.webflow.io/ |

### Carousels / drag

Swiper is the house slider (stramien `### Carousels`). Reach for these only when the row itself is a moment.

| Resource | What it does | Fits | Avoid in | Preview |
|---|---|---|---|---|
| `swiper-slider-setup` | The house baseline: Swiper with arrows, dots or dashes. | all five | — | https://osmo-swiper-slider-setup.webflow.io/ |
| `draggable-infinite-slider-with-gsap` | Endless row you drag with inertia. | flood-and-acid, deep-ground-editorial, billboard-condensed | — | https://osmo-draggable-infinite-slider-gsap.webflow.io/ |
| `centered-looping-slider` / `line-reveal-testimonials` | Centred testimonial slider; the second reveals each quote line by line. | warm-daylight, deep-ground-editorial | — | https://osmo-centered-looping-slider.webflow.io/ · https://osmo-line-reveal-testimonials.webflow.io/ |
| `overlapping-slider` | Cards overlap and slide out from behind each other on drag — depth without a shadow. | flood-and-acid, campaign-poster | billboard-condensed | https://osmo-overlapping-slider.webflow.io/ |
| `parallax-image-slider-smooothy` | Drag slider whose images parallax inside their frames. | deep-ground-editorial, warm-daylight | — | https://osmo-parallax-image-slider-smooothy.webflow.io/ |
| `cascading-slider` | Slides widen and narrow through clip-path as they become active, like a flex accordion. | deep-ground-editorial, billboard-condensed | — | https://osmo-cascading-slider.webflow.io/ |
| `layered-image-slider` | Images replace each other in layered wipes. Hero or project detail. | billboard-condensed, deep-ground-editorial | — | https://osmo-layered-image-slider.webflow.io/ |
| `radial-cards-slider-gsap` | Cards arranged on an arc, rotating into focus. | campaign-poster, flood-and-acid | billboard-condensed | https://osmo-radial-cards-slider-gsap.webflow.io/ |
| `mwg/effect008` Random drag movement | An auto-scrolling endless row that you can drag; items jiggle slightly when you do. Drag. | campaign-poster | billboard-condensed | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/008.mp4 |
| `mwg/effect028` Rotation on drag | Endless dragged row whose items tilt with drag direction. | campaign-poster, flood-and-acid | billboard-condensed, deep-ground-editorial | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/028.mp4 |
| `mwg/effect019` Infinite scroll with deformation | Auto-scrolling image row that stretches with scroll or drag intensity. Observer. | flood-and-acid | warm-daylight | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/019.mp4 |
| `mwg/effect047` Infinite scroll & deformation | Endless carousel on scroll; images squash as they leave the viewport edges. | flood-and-acid, deep-ground-editorial | warm-daylight | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/047.mp4 |
| `mwg/effect045` Folders | Slides stacked in perspective like folders; the front one drops away to the back of the queue on scroll. Wheel. | deep-ground-editorial (case index) | warm-daylight | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/045.mp4 |
| `mwg/effect012` Infinite 3D scroll | Images fly from the back of the screen toward you, both directions, with pointer perspective. Wheel. | billboard-condensed (showreel stage) | warm-daylight, campaign-poster | https://pub-8ca9b5847fbb4d4fb97b3497fb9521d5.r2.dev/video_OPTIM/012.mp4 |
| `bouncy-content-tabs` | Tabs whose indicator and content spring between states. Warm-daylight's "interface is the motion" in one component. | warm-daylight, campaign-poster | — | https://osmo-bouncy-content-tabs.webflow.io |

### Page transitions

Pull stramien `### Page transitions — a genuine split` first. Banned in warm-daylight and campaign-poster; per-project in flood-and-acid; skip on catalogue-shaped sites everywhere.

| Resource | What it does | Fits | Avoid in | Preview |
|---|---|---|---|---|
| `column-wipe-page-transition` / `shutter-page-transition` | Full-viewport columns or blades wipe across on navigation. The `ul`/`biltz` panel feel. | billboard-condensed | warm-daylight, campaign-poster | https://osmo-column-wipe-transition.webflow.io/ · https://osmo-shutter-page-transition.webflow.io/ |
| `page-name-transition-wipe` | A panel wipes on carrying the destination page's name. | billboard-condensed, flood-and-acid | warm-daylight, campaign-poster | https://osmo-page-name-transition-wipe.webflow.io/ |
| `cross-fade-page-transition` | A plain veil fade in the brand colour. `callab`'s plum veil. | deep-ground-editorial | warm-daylight, campaign-poster | https://osmo-crossfade-transition.webflow.io/ |
| `curved-wipe-page-transition` | A curtain with a curved leading edge, e.g. `eckeveldkleding`'s navy wipe, softened. | flood-and-acid | billboard-condensed, warm-daylight, campaign-poster | https://osmo-curved-wipe-transition.webflow.io/ |
| `overlapping-parallax-page-transition` | The new page slides over the old one, which parallaxes away. | deep-ground-editorial | warm-daylight, campaign-poster | https://osmo-parallax-transition.webflow.io/ |
| `masked-window-page-transition` | The next page opens through a growing window. Portfolio case entry. | deep-ground-editorial, billboard-condensed | warm-daylight, campaign-poster | https://osmo-masked-window-page-transition.webflow.io/ |
| `stacked-cards-page-transition` | Pages drop in as stacked cards. | flood-and-acid | billboard-condensed, warm-daylight, campaign-poster | https://osmo-stacked-cards-transition.webflow.io/ |

### Loaders

None of the eleven reference sites runs a preloader. Only for portfolio-shaped sites whose first view is heavy media, and only once per session.

| Resource | What it does | Fits | Avoid in | Preview |
|---|---|---|---|---|
| `logo-reveal-loader` | The logo draws or unmasks, then lifts to reveal the hero. | billboard-condensed, deep-ground-editorial | warm-daylight, campaign-poster | https://osmo-logo-reveal-loader.webflow.io/ |
| `welcoming-words-loader` | "Hallo / Welkom / ..." cycles before the page. | campaign-poster (the one loader that suits a human tone) | billboard-condensed | https://osmo-welcoming-words-loader.webflow.io/ |
| `number-loader-in-3-steps` | 0–100 counter in three jumps. | billboard-condensed | warm-daylight | https://osmo-number-loader-in-3-steps.webflow.io/ |
| `crisp-loading-animation` / `willem-loading-animation` | A choreographed GSAP intro timeline that hands off to the hero and reveals the header on completion. | billboard-condensed, deep-ground-editorial | warm-daylight | https://osmo-crisp-loading-animation.webflow.io/ · https://osmo-loading-animation-willem.webflow.io/ |

### Footer / closing moments

| Resource | What it does | Fits | Avoid in | Preview |
|---|---|---|---|---|
| `footer-parallax-effect` | The footer sits fixed beneath the page and is uncovered as the last section scrolls away. | deep-ground-editorial, billboard-condensed, warm-daylight (the dark pre-footer band lifting off the footer) | — | https://osmo-footer-parallax-effect.webflow.io/ |
| `scroll-to-next-page` | The end of a case page becomes a teaser of the next case that loads on further scroll. | billboard-condensed, deep-ground-editorial (case detail pages) | warm-daylight | https://osmo-scroll-to-next-page.webflow.io/ |
| `draggable-stickers` | Rotated stickers that visitors can drag around the closing band. | campaign-poster | billboard-condensed, deep-ground-editorial | https://osmo-draggable-stickers.webflow.io/ |
| `css-marquee` (logo track) | The `ul`/`biltz` footer marquee of sub-brand logos. | billboard-condensed | warm-daylight, campaign-poster | https://osmo-css-marquee.webflow.io/ |
| `number-odometer` | Digits roll like an odometer; the count-up statistic, better-looking. | all five | — | https://osmo-number-odometer.webflow.io/ |

### Grounds and texture

Ambient, not kinetic. Deep-ground-editorial's territory.

| Resource | What it does | Fits | Avoid in | Preview |
|---|---|---|---|---|
| `film-grain-effect` | Fixed animated grain overlay. `callab` ships Osmo's noise as its grain. | deep-ground-editorial, campaign-poster (static paper grain) | warm-daylight | https://osmo-film-grain-effect.webflow.io/ |
| `progressive-blur` | A blur that strengthens toward an edge, e.g. under a floating header or at a photo's foot where type sits. A scrim alternative. | deep-ground-editorial, warm-daylight | billboard-condensed | https://osmo-progressive-blur.webflow.io/ |
| `image-sequence-on-scroll` | Scroll scrubs a frame sequence (a product turning, a building going up). | billboard-condensed, deep-ground-editorial | warm-daylight | https://osmo-image-sequence-on-scroll.webflow.io/ |

---

## By direction

### billboard-condensed

Hard and mechanical: clip, mask, wipe. Nothing eases in softly.

- `masked-text-reveal` for every headline; `mwg/effect015` Title mask effect for the one hero title.
- `shutter-scroll-transition` into the showcase.
- `mwg/effect030` Images on hover on a typographic services or projects list.
- `column-wipe-page-transition` or `page-name-transition-wipe` for route changes.
- `css-marquee` as the footer logo track, `motion-safe` gated.
- `cursor-with-marquee-effect` over project tiles (optional, as on `ul`).
- `image-to-background-zoom` to hand the hero photo off to the next section.

**Signature moment:** `mwg/effect038` Dynamic list scrolling — a pinned, sideways-running list of
projects or disciplines at display size with a flip-book image at centre. It is a list in
uppercase condensed type made kinetic, which is exactly this direction's voice.

**Never:** bounce or overshoot, wavy or radial marquees, rotation, mouse trails, rounded or arc
wipes.

### flood-and-acid

Colour-block motion: whole panels move, not text.

- `stacking-cards-parallax` — the pinned colour-panel pile is the signature this direction already owns.
- `mwg/effect024` Opposite direction marquees as the two-lane text band in the logo-bar slot.
- `mwg/effect001` Card stack or `mwg/effect003` Card shuffle for a services deck.
- `arc-scroll-transition` between two coloured panels.
- `step-by-step-timeline` or `draw-path-on-scroll` for a milestone route.
- `mwg/effect049` Defying gravity for the one headline that assembles itself.
- `curved-wipe-page-transition` if, and only if, the project wants a transition.

**Signature moment:** `mwg/effect003` Card shuffle — photo and service cards dealt from below and
fanned across the flood colour. It is panel motion, it replaces a shadow with overlap and rotation,
and it gives a strong-colour, weak-photo client a moment their photography cannot.

**Never:** film grain, slow atmospheric ambience, a velocity marquee that is merely elegant, shadows
on the dealt cards.

### deep-ground-editorial

Unhurried and atmospheric. The page breathes rather than performs.

- `highlight-text-on-scroll` or `mwg/effect022` Progressive sentences for the manifesto paragraph.
- `mwg/effect013` Infinite scrolling movement — the scroll-velocity marquee, ready-made.
- `sticky-title-scroll-effect` or `sticky-features` for editorial pacing.
- `film-grain-effect` over the dark ground; `global-parallax-setup` on inner images.
- `mwg/effect042` Smooth stacking images or `mwg/effect045` Folders for a case index.
- `cross-fade-page-transition` as the brand-colour veil (skip on catalogue sites).
- `footer-parallax-effect` for the close.

**Signature moment:** `mwg/effect006` / `mwg/effect022` Progressive sentences — the brand's argument
pinned mid-screen, one paragraph dissolving into the next as you read. It is the per-character wave
the direction already uses, extended into a whole scroll-told chapter.

**Never:** bounce, mouse trails, pixelated anything, falling physics, jazzy or wavy type.

### warm-daylight

Quiet. The moving parts are interface. No page transition, no custom cursor, no marquee.

- `elements-reveal-on-scroll` in fade mode, with per-element delays.
- `sticky-steps-basic` for "In 5 treden naar ...".
- `bouncy-content-tabs` for a product switcher hero (the `trapxpress` tabbed hero).
- `before-after-split-slider` for renovation and home-improvement proof.
- `logo-wall-cycle` instead of any logo marquee.
- `centered-looping-slider` or `line-reveal-testimonials` for reviews.
- `mwg/effect035` Smooth thumbnails for a calm product or project grid.
- `number-odometer` for the three numbers.

**Signature moment:** `sticky-features` — a documentary photo pinned on one side swapping per step
as the reassuring copy scrolls past on the other. It explains the service, it is interface rather
than decoration, and it never raises its voice.

**Never:** marquees of any kind, custom cursors, page transitions, loaders, mouse trails, pinned text
scrubs, clip reveals, anything wheel-driven.

### campaign-poster

Assembled by hand; rotation and overshoot are the devices. No page transition, no custom cursor, no marquee.

- `stacking-sticky-cards-bounce` — spend the direction's bounce curve on it.
- `mwg/effect025` Randomize & Focus or `mwg/effect043` Soloing images for rotated quote and photo cards.
- `highlight-marker-text-reveal` for the one highlighted word.
- `mwg/effect029` Words Shifting to make a paragraph feel pasted up.
- `draggable-stickers` in the closing band.
- `rotating-text` for the situation word in the headline ("als je ... bent").
- `welcoming-words-loader` if a loader is wanted at all.

**Signature moment:** `mwg/effect003` Card shuffle, dealt rotated at the ±5° house angles — the
visitor's situations or the campaign's quote cards landing on the page like prints thrown on a
table. It turns the direction's static rotation into the page's one piece of choreography.

**Never:** marquees, custom cursors, page transitions, scramble text, pixelated or 3D effects,
anything that reads as a firm's polish rather than people's hands.

---

## Restraint rules

- **One scroll-hijacking moment per page.** Any pinned scrub (most MWG Scroll effects, `horizontal-
  scrolling-sections`, card stacks, `sticky-*`) counts. Two pinned sequences back to back make the
  page feel stuck. The homepage's pinned slot goes to the signature moment.
- **One signature, then house defaults.** Per page, pick at most one showpiece from this file; every
  other section uses the house group reveal. A page where everything performs has no signature.
- **Wheel and Observer effects are stages, not sections.** `mwg/effect012`, `013`, `014`, `023`,
  `034`, `045` read wheel delta directly and their demos lock body scroll with `overflow: hidden`
  and `100vh` sections; `mwg/effect008`, `019`, `026`, `028`, `050` run on Observer/drag. Use them
  as a contained full-viewport stage (a "werk" index, a 404, an intro) or have them rebuilt on
  ScrollTrigger. `013` is the exception that embeds easily: it only speeds a loop, it does not
  need to own the scroll.
- **Lenis decides the feel.** Most MWG Scroll effects assume Lenis; the house runs it on 7 of 11
  sites. Decide smooth scroll before designing a scrub (stramien `### Smooth scroll`).
- **Reduced motion is required, not optional.** Under `prefers-reduced-motion: reduce`: reveals
  become instant, pinned scrubs render their end state as a static section, marquees stop (the `ul`
  `motion-safe` gate), trails and cursors are removed, page transitions become a plain load. Design
  the static end state as a real layout — it is also what a screenshot and a Figma frame show.
- **Pointer effects need a touch plan.** Everything tagged Mouse Move (`mwg/effect002`, `017`, `020`,
  `021`, `025`, `030`, `035`, `036`, `039`, `041`, `044`, `free-effect001`, `free-effect002`, all
  cursors, hover lists) does nothing on a phone. Say in the design what the mobile version shows:
  a static grid, a thumbnail per row, the default image.
- **Mobile degrade for pinned scrubs.** Pinned text scrubs (`mwg/effect004`–`006`, `009`–`011`,
  `022`, `046`, `049`) need a shorter pin or a plain reveal below ~768px; 3D and circular layouts
  (`mwg/effect007`, `016`, `040`, `048`) should collapse to a vertical stack.
- **Performance ceilings.** CSS 3D (`mwg/effect048`, `stacking-cards-3d-css`, `3d-*` Osmo) is cheap
  enough for a section. Canvas/WebGL resources (`interactive-dots-grid-background`,
  `liquid-glass-carousel`, `refracted-glass-unicorn-studio`, pixelated effects) cost a GPU layer
  for the whole page: at most one, never on a catalogue or a low-end-audience site. Image-heavy
  loops (`mwg/effect012`, `014`, `034`, `050`) need compressed, lazily loaded media.
- **No shadows arrive with the motion.** MWG and Osmo demos often put a drop shadow on dealt or
  stacked cards. Strip it: depth comes from overlap, rotation and panel contrast (stramien
  `### No elevation`).
- **The accent stays punctuation in motion too.** A highlight sweep or marker may touch one phrase in
  the accent; a gradient wave or colour flood through a whole paragraph uses the text and ground
  colours, not the accent.
- **Nothing here is house-proven yet.** Every row is outside inspiration. When a site we build ships
  one of these, `/dezzign learn` records it in that site's fingerprint; only a second site moves it
  into the stramien.
