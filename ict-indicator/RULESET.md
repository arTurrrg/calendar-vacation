# ICT IFVG Model — Ruleset

Source material captured so far. This is the seed spec for the Pine Script
indicator + strategy. **Status: incomplete** — the six YouTube playlists have
not been watched yet (YouTube blocked by egress policy). Everything below comes
from the user's six annotated screenshots and eight written rules.

---

## 1. DOL grading (Draw On Liquidity)

From the "DOLs" annotation. The trade must have a valid draw or it is not taken.

| Grade | Draw types |
|-------|-----------|
| **A+** | REQH/REQL formed on 15m or higher; data wicks; NWOG / NDOG; LRLR leading up to an HTF FVG |
| **B**  | Session highs/lows; 1h–4h ITH/ITL sitting inside FVGs; unmitigated (UNM) daily FVG |
| **F**  | HRL (high resistance liquidity) — do not target |

Glossary: REQH/REQL = relatively equal highs/lows. NWOG/NDOG = new week / new
day opening gap. LRLR = low resistance liquidity run. HRL = high resistance
liquidity. ITH/ITL = intermediate-term high/low. UNM = unmitigated.

## 2. Worked A+ example (screenshots 2 and 3)

Narrative stack that constituted an A+ setup:

- **HTF context:** 4h FVG to the left; price swept liquidity *inside* the 4h FVG.
- **Draw:** ATH + HTF REQH tagged as the A+ DOL.
- **Manipulation:** ES turtle-souped the lows, creating **SMT divergence**,
  then closed back above the 15m level.
- **PD array:** 1h + 15m bullish FVG created out of the 4h FVG; the 1h FVG was
  respected, confirming the ATH draw.
- **Entry trigger:** 2m IFVG with a *huge* displacing candle — took **only one
  candle** to close above the gap once price interacted with it.
- **Structure:** LRLR sloping down into the setup; 15m liquidity taken.

The entry timeframe (2m) is far below the narrative timeframes (4h/1h/15m).
The model is explicitly multi-timeframe.

## 3. Invalidation rules (written rules + screenshots 4, 5, 6)

1. **Stacked FVGs** — if several FVGs are stacked, *all* must be inverted before
   entry. (Screenshot 4: an IFVG is NOT valid while another FVG in the same leg
   remains un-inverted.)
2. **HTF containment** — an LTF inversion is invalid while price is inside a
   higher-timeframe FVG that has not closed through. (e.g. 1m inverted but we
   are sitting inside an unclosed 5m FVG.)
3. **Displacement quality** — the inversion needs good displacement. If you have
   to zoom in to tell whether the gap inverted, it is not a good inversion.
   (Screenshot 6: "lack of displacement in the inversion"; we want a strong move
   toward the direction we intend to trade.)
4. **Candle closes after ITH/ITL** — confirmation requires a close through the
   intermediate-term high/low, not a short-term one.
5. **Time / chop decay** — if price takes too long, or chops for a while before
   inverting the gap, the gap is no longer valid. (Screenshot 5: took 7 candles
   to inverse and wicked above it multiple times → signs of *accumulation*, not
   the *distribution* we want to catch.)
6. **Manipulation must reach something** — if the manipulation leg did not trade
   into a significant PD array or liquidity pool, the setup is invalid.
7. **Manipulation must respect, not invert** — if the manipulation leg *inverts*
   a significant PD array instead of respecting it, the trade is invalid.
8. **Draw must remain** — if HTF significant liquidity pools in the direction of
   travel have already been hit, the trade is no longer valid.

## 4. Implementation notes

Each of the eight rules above becomes an individually toggleable filter, plus a
checklist row on the dashboard showing pass/fail per rule, so a rejected setup
shows *which* rule rejected it.

Quality metrics needed per FVG:
- `candlesToInvert` — bars between first interaction and the closing inversion
  (rule 5; the A+ example was 1, the failure example was 7)
- `wickCount` — rejections into the gap before inversion (rule 5)
- `displacementATR` — inverting candle body vs ATR (rule 3)
- `stackedUninverted` — opposing un-inverted FVGs remaining in the same leg (rule 1)
- `htfContained` — inside an unclosed opposing HTF FVG (rule 2)

## 5. Still to extract from the videos

Not yet captured — these playlists have not been watched:

- `PLKE_22Jx497twaT62Qv9DAiagynP4dAYV`
- `PLOqlWG05MfW6T7mUjI2CK5BdQ6FrV3zEm`
- `PLVekzd813DFCOnpsL4v0Qu4-jBz3U-K5x`
- `PLpmnwVXTwkfZT4Kc0IMidV_5sg1z47iyY`
- `https://youtu.be/fm8CiDgTFfc`
- `https://youtu.be/OtbeiB4LcjM`
- `https://youtu.be/miWW5YNcCJI`
- `https://youtu.be/4uoj8Zsh7lw`

Open questions the videos should answer: exact entry/stop/target placement,
session time windows to trade, risk model, and any concepts absent from the
screenshots above.
