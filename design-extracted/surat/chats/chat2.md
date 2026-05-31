# Sidebar Extension Redesign

_Started 2026-05-27 17:49 UTC_

---

## User

im so sorry, change the whole floating extension into sidebar extension design

## Assistant

_[tool: list_files]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: str_replace_edit]_

I'll convert this to a sidebar (side panel) extension design — full browser height, docked to the right edge instead of floating. Let me update the frame, the browser context, and the canvas sizes.

_[tool: str_replace_edit]_

Now update the BrowserContext to show the sidebar docked to the side of the browser (not floating), and update the interactive prototype dimensions.

_[tool: str_replace_edit]_

Now rewrite the BrowserContext so the sidebar is docked to the right edge as a side panel (Chrome side-panel layout):

_[tool: str_replace_edit]_

Now update the main HTML to reflect new sidebar dimensions (380×720) and the wider browser context (1140×720):

_[tool: str_replace_edit]_

_[tool: done]_

Converted the floating popup into a docked side-panel design.

**What changed:**
- `PopupFrame` is now a full-height sidebar (380×720) with no rounded corners or drop-shadow — it reads as docked to a browser edge, not floating.
- `BrowserContext` now lays out as a real Chrome side-panel: page content on the left, Surat panel fixed to the right edge with a subtle inner-shadow seam. Browser is wider (1140×720) so the page beneath has room to breathe.
- Toolbar icon swapped from a "pinned extension" pill to Chrome's side-panel toggle glyph.
- All 6 flow artboards resized to 380×720 — the existing flex layouts fill the new taller height naturally (more breathing room around the login hero, more visible fields in Preview, etc.).

No changes to screen logic, tokens, or copy — same warm cream + terracotta system, just re-housed.

_[tool: fork_verifier_agent]_

The sidebar redesign is ready — open the **Interactive prototype** artboard and click through the dot rail at the bottom to walk all 6 states inside the docked side-panel context.

## User

Apply comment

## Assistant

_[tool: str_replace_edit]_

Good catch — the issue is that `.sx button { padding: 0; border: none; background: transparent }` has higher CSS specificity than `.sx-chip`, so the chips render as bare buttons in ScreenMain. The ComponentSheet uses `<span>` so it escapes the override. Let me fix the chip CSS to win regardless of element type.

_[tool: done]_

Fixed — the `.sx-chip` rules now win over `.sx button { padding: 0 }` regardless of whether the chip is a `<button>` (ScreenMain) or `<span>` (ComponentSheet). Both should render identically now: white pill, terracotta when active.

## User

Apply comment

## Assistant

_[tool: str_replace_edit]_

_[tool: str_replace_edit]_

_[tool: done]_

Both login buttons are now proper full-width boxes — Google sign-in and "Kirim tautan masuk" stretch to fill the column with consistent height, much more scannable.

