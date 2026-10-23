# Concept — the idea that cannot be moved to another client

The method is adapted from `/awwwards` (juliobsz/skills, MIT): its concept territories, anchor
and swap test, rewritten for client redesigns. Its worked examples are not reused.

The stramien says what a slot is, the direction says how it looks. Neither says what *this* site
is about, and that is why two redesigns from the same spine look alike. The concept is the third
input: one sentence about this client that the composition, the signature moments, the copy
voice and the closing devices all follow.

## What a concept is

### A rule system, not a style

A concept is a rule system borrowed from the client's own world. "Clean, modern, with bold
photography" is a style: it fits every client. "Every page reads like a werkbon: the job, the
materials, the hours, the signature" is a concept: it dictates layout (a document with fields),
type (a form face against a display face), motion (fields filling in), copy (the job in the
client's own words) and the closing device (the signature line as the CTA).

**Test:** derive at least four design decisions from the sentence. If you cannot, it is a style.

### The concept leads; the house is the default

The concept comes first and the house follows. The stramien and the style directions are what
we have proven, and they are the default answer for every slot the concept says nothing about.
Where the concept genuinely asks for something else, it wins: a client whose world is paper and
stacks may earn real elevation, a campaign may earn an accent flood, a direction may borrow its
ground from another direction or from the client's own material. Each such break gets one line
in `brief.md` under `## Breaks`: the stramien heading, what you do instead, and the reason in the
client's world. A break with no reason in the client's world is a whim; drop it.

Only the fixed rules in `craft.md` `### Fixed rules` hold whatever the concept says.

### Scale the theatre to the client

The bar stays the same; the spectacle changes. A brand launch or a campaign earns a pinned
signature and a page transition. A plumber, a co-operative or an institution earns the same
thinking in type, layout, imagery and copy, with at most a quiet signature. `warm-daylight`
carries its concept almost entirely in trust devices and photography; `campaign-poster` can
carry it in motion. The direction doc's `## Motion character` is the starting point; go past it
only when the concept and the client's audience both earn it.

## Finding it

### Anchors come from the crawl

Every concept rests on an **anchor**: one specific, checkable fact about this client, found in
step 1's crawl or given by the user. Good anchors: what the company name means or where it comes
from, the material they work with (steel, flowers, timber, data, fabric), the place and its
landmarks, how a job actually runs from call to delivery, a number that is true and theirs (years,
a fleet, a distance), a document or object their customers handle (a werkbon, a keurmerk, a
pallet label, a menu, a packing slip).

Write five to eight candidate anchors from the crawl before writing any concept. A thin old site
still has a name, a place and a trade. If the crawl yields no anchor at all, say so; that is a
content gap for the client, not a reason to invent one.

### Five territories

Generate each candidate concept from a different territory:

1. **Name and identity:** what the name means, sounds like, or looks like as letterforms; the
   founder's story only if the site already tells it.
2. **The material of the trade:** what they handle all day, its textures, its units, its tools,
   its paperwork.
3. **Place and region:** the town, the polder, the industrial estate, the harbour, local signage
   and materials. Specific, never a flag or a windmill.
4. **How they work:** the process a customer goes through, performed by the site (intake, quote,
   planning, delivery, follow-up).
5. **A formal system:** one strict rule taken far (the whole homepage as one sentence; every
   section on one shared grid line; one typeface, one size, weight as the only hierarchy). Use
   it when the client's world gives little; it must still name the client to pass the swap test.

### The swap test

Put the client's closest competitor in the sentence. If the sentence still works, it is a style:
portability 4 or 5. "We help you move forward" survives every swap. "Everything is measured in
pallets, because a pallet is what leaves our dock 1,200 times a day" survives none.

### Kill it if it only lives in the hero

A concept must reach the footer, one inner page and the 404. If its only expression is a hero
effect, drop it. Write down where it shows up on those three before choosing it.

## Choosing and recording

### Three candidates, scored

Write three concepts, each from a different territory. For each:

- **Idea:** one sentence a stranger understands.
- **Anchor:** the fact it depends on, with where the crawl found it (page and quote).
- **Signature:** the one moment a visitor would remember, and which library pattern, Osmo or MWG
  effect could carry it (shortlist only; step 6 picks).
- **Motion verb:** how things move here ("stack like pallets", "unfold like a plan", "fill in
  like a form"). This chooses between Osmo and MWG candidates later.
- **Breaks:** which house defaults it would break, if any, and why. A concept that breaks
  nothing is fine; three concepts that all break nothing are probably three styles.
- **Scores 1 to 5:** originality, fit to the client, feasibility in the house stack (Osmo, MWG,
  Swiper, Lenis), portability (lower is better).

Ask the user to choose between them in step 4's batched question (question 3). Your
recommendation goes first. Optionally steal one secondary idea from a runner-up for the 404 or the
footer, never for the main structure.

### The concept card

Write the chosen concept to `.dezzign/<slug>/brief.md` under `## Concept`:

```
Idea:        one sentence a stranger understands
Anchor:      the fact, and where the crawl found it
Metaphor:    the world the site borrows its rules from
Signature:   the one moment, and the pattern or effect that carries it
Motion verb: how things move here
Screenshot:  the frame someone would share
Reaches:     how it shows in the footer, one inner page and the 404
```

Under it, `## Breaks` lists every house default the design departs from, one line each:
`stramien heading → what instead → why, in the client's world`.

The card stays out of the critic's hands (see `critic.md`). Its one-sentence reading of the
design is compared against `Idea:` afterwards.

### Brand-handling modes

- **Brand + content:** the concept works through layout, imagery, motion and microcopy only.
  Logo, palette and body copy stay. It is still worth doing; it is the difference between a
  re-skin and a redesign.
- **Content only:** the concept may also set the palette source and the type voice, inside the
  direction.
- **Free reinterpretation:** the concept may reshape headlines and section copy too (see
  `craft.md` `## Copy`).

## Signature moments by concept shape

Use these to shortlist a carrier; `library/motion.md` has the per-slot and per-direction fit,
and its `## Restraint rules` hold (one pinned or scroll-hijacking moment per page).

| The concept is about | A signature that fits | Where to look |
|---|---|---|
| A sequence (a process, a route, a build) | a pinned sequence where one object changes per step | `library/motion.md` `### Horizontal / pinned sequences`, `### Card stacks` |
| A collection (projects, products, locations) | an index list with hover preview, or a draggable or infinite gallery | `### Lists with hover image`, `### Showcase / gallery` |
| A claim or a voice | scroll-told type, a statement that fills in as it scrolls | `### Scroll-told paragraphs`, `### Statement band` |
| A material or a texture | a ground or image treatment that carries the material | `### Grounds and texture`, `library/hero.md` |
| A place | a map or a route as a device, the address as a closing composition | `### Footer / closing moments`, stramien `### Closing devices worth stealing` |
| Scale or quantity (a real number) | a count-up or stat stack, only with true numbers | stramien `### Count-up statistics`, `library/proof.md` |

The table is a shortlist, not a menu. A signature invented from the concept itself, with no
pattern behind it yet, is often the best one; describe it precisely enough that a developer could
build it, and find the nearest Osmo or MWG resource as a starting point.

## Worked example (the method, not an idea to reuse)

Never reuse this idea for another client. It is here to show the reasoning.

**Client:** a fictional family firm, "Van Leeuwen Hekwerk", fencing and gates for farms and
industrial estates in the Betuwe. The crawl finds: founded 1971, three generations named on the
about page, "every gate welded in our own shop in Geldermalsen", a project list of 40 sites with
photos of real fences, a quote form, no prices.

Anchors: the welding shop in Geldermalsen; three generations; 40 documented projects; the gate as
the object a customer actually buys; the Betuwe landscape of orchards and dykes.

| | A. Material | B. Process | C. Place |
|---|---|---|---|
| Idea | The site is built like a fence: every section is a panel between posts, and the posts are the grid | From measurement to weld to hang: each page follows one gate through the shop | Every project is pinned on a map of the Betuwe, and the map is the navigation |
| Anchor | the product itself | "welded in our own shop" | 40 projects with real locations |
| Signature | sections slide in like panels being hung between fixed posts | a pinned sequence of one gate in four shop photos | an interactive project map on the work page |
| Motion verb | slide and lock | weld: snap, glow, settle | pan and pin |
| O / F / Fe / P | 3 / 4 / 5 / 3 | 4 / 5 / 4 / 2 | 3 / 4 / 3 / 2 |

Pick B. It is the most specific to this client (no competitor can claim their shop), it gives
the homepage its pinned moment, the project pages their structure (measured, welded, hung), the
footer its device (the shop address with its opening hours as the closing composition) and the
404 its line ("this gate isn't hung yet"). Steal from C for the work index: a small map beside
the list, not as navigation.
