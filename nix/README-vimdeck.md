# Nix and NixOS lightning talk

The Vimdeck presentation is in `talk.md`. The corresponding spoken track is in
`script.md` and targets approximately five minutes.

From this directory, launch the presentation with:

```sh
nix-shell --run make
```

The Nix shell supplies Neovim and Make, then loads the sibling
`../vimdeck.nvim` checkout automatically.

To start it manually, open `talk.md` in a Neovim installation with
`vimdeck.nvim` and the Markdown Treesitter parser, then run:

```vim
:Vimdeck
```

Navigation:

- Space or PageDown: next slide
- Backspace or PageUp: previous slide
- `q`: leave the presentation
