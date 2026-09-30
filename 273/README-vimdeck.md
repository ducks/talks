# 273″

A three-slide, 273-second presentation after John Cage's *4′33″*.

The presenter intentionally says nothing. Each slide is one movement, using
the original-performance division of 30 seconds, 2 minutes 23 seconds, and
1 minute 40 seconds. The room supplies the sound.

## Presenting

From this directory, launch the presentation with:

```sh
nix-shell --run make
```

The Nix shell supplies Neovim and Make, then loads the sibling
`../vimdeck.nvim` checkout automatically.

To launch it manually instead, open the deck in Neovim and start vimdeck:

```vim
:e talk.md
:Vimdeck
```

Use a silent stopwatch on the private display and follow `cue-sheet.md`:

- Slide I at `0:00`
- Slide II at `0:30`
- Slide III at `2:53`
- Quit at `4:33`

The host should introduce the title. The performer should not explain the
piece before or after the timed presentation.

## Source

The movement timings are documented by the [John Cage
Trust](https://johncage.org/kuhns/john-cage-and-the-new-world-symphony):
`30″`, `2′23″`, and `1′40″`.
