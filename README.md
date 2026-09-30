# Talks

Static, browser-based versions of two talks:

- **Nix & NixOS** — a lightning talk about reproducible packages,
  development environments, and declarative operating systems.
- **273″** — a three-movement, 273-second performance after John Cage's
  *4′33″*.

GitHub Pages deploys the repository root through
`.github/workflows/pages.yml`. The original Vimdeck sources and speaker notes
live beside each published talk.

## Local preview

```sh
python3 -m http.server 8000
```

Open <http://localhost:8000>. Use the arrow keys, Page Up/Page Down, Space,
Home, or End to navigate a deck. The 273″ page also has a timed performance
mode with the original `30″`, `2′23″`, and `1′40″` movement lengths.
