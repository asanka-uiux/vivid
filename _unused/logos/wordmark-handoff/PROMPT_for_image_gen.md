# Sub-Brand Wordmark Prompt — for Gemini / image generation

## How to use this

You're asking an image-gen model to draw three custom wordmarks in the style of an existing reference logo. Image-gen models will not nail it on the first try — expect to iterate 5–15 times. Each iteration, take the best result and ask the model to refine it further.

**For Gemini specifically:**
1. Open https://gemini.google.com
2. Click the image icon to attach a reference image
3. Attach `REF_vividracing_red.png` (the master wordmark — this is the style they're imitating)
4. Optionally also attach `REF_VR_monogram_red.png` so it knows the VR mark
5. Paste the prompt below
6. Generate. Pick the best one. Ask for refinements. Repeat.

**For ChatGPT Image / DALL-E:** Same flow — attach the reference, paste the prompt.

**For Midjourney:** Use `/imagine` with the same prompt + `--cref [link to vividracing image]` to anchor on the reference style.

---

## The Prompt (copy from here)

I need three custom wordmark designs in the EXACT style of the attached reference logo "vividracing". Match it precisely in letterform character, color, construction, and italic stance.

**The three wordmarks to create, all lowercase one word each:**

1. `vrtrucks`
2. `vrmuscle`
3. `vrpowersports`

**Style requirements — match the reference exactly:**

- Custom hand-drawn chunky italic letterforms. NOT a generic font. NOT Arial, Inter, Helvetica, Lato, Poppins, Roboto, Bebas, Anton, or any clean modern UI typeface. These should look like 2007-era import-tuner brand stickers — heavy, slightly extended, italic ~12° forward lean, rounded chunky terminals.
- Two-color construction: solid heritage red letter bodies (#B31414) wrapped in a thick avorio creme outline (#F4F1EA). The creme outline is ~10–12% of cap height — sticker/decal grade thickness, NOT text-grade thinness.
- Inner chrome highlight detail: a thin creme line INSIDE each red letter following the letterform's curves (look at the reference — every letter has these inner highlights showing the chrome reflection)
- Letters touch or near-touch each other with tight tracking. They read as ONE continuous wordmark, not separate letters with gaps.
- A single continuous creme outline wraps the entire wordmark like a chrome border — one stroke around the whole word, not per-letter outlines.
- Transparent or white background, output as PNG at high resolution (3000px+ wide).

**Sibling test:** Place each result next to the attached vividracing wordmark. They should look like they were drawn by the same designer in the same session. Same hand, same era, same construction grammar. Someone glancing should believe one person designed all four.

**Common failure modes to avoid:**
- Don't use any system or web font and call it a day. Draw custom letterforms.
- Don't make the outline thin or sharp like text-stroke. Make it thick and chunky like a vinyl decal.
- Don't separate letters with white gaps. Keep tracking tight.
- Don't add gradients, bevels, shadows, or chrome effects. Flat colors only — pure red, pure creme.
- Don't lose the chunky italic character — every letter must have the same heavy weight and lean.

Output: three separate images, one wordmark each, transparent background.

---

## Iteration playbook

If the first generation is close but not right, ask for specific refinements:

- "Make the creme outline thicker — closer to vividracing's outline"
- "The letterforms are too clean / too modern — make them more chunky and hand-drawn"
- "Letters are too spread out — tighten the tracking so they touch"
- "Add the inner chrome highlight line inside each letter, like the reference shows"
- "The italic lean is too steep / too shallow — match the reference angle"
- "Letter [X] looks wrong — redraw it to match the construction of the reference letters"

If you get a result that's 80% right but has one bad letter, ask the model to regenerate just that letter and composite it back.

---

## What to do once you have a result you like

1. Save each wordmark as PNG with transparent background
2. (If model can output SVG): save SVG directly
3. (If only PNG): you can use vtracer (free CLI) to convert PNG to SVG, OR keep as PNG and use as-is
4. Save them as:
   - `vr-trucks-red.svg` (or `.png`)
   - `vr-trucks-creme.svg` (or `.png`)
   - `vr-muscle-red.svg`
   - `vr-muscle-creme.svg`
   - `vr-powersports-red.svg`
   - `vr-powersports-creme.svg`
5. Drop them into `Vivid Mockups/logos/flat-system/` — they'll replace the current placeholders and the pages will just work.

For creme variants: ask the model to invert — creme letter bodies (#F4F1EA) with red outline (#B31414). These go on dark backgrounds (footer, dark sections).
