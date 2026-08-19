# pi-tenzo

![Tenzo theme](screenshots/screenshot-tenzo.png)

A theme for [pi](https://pi.dev) designed around the real terminal, not someone else's screenshots.

Base assumptions (measured, not inheritable from the theme):

- terminal canvas: `#282c34` (Ghostty default) — pi doesn't paint the background
- body text: terminal foreground (`#ffffff` default) — pi doesn't color it
- the input border indicates the thinking level: the scale here runs from gray to ember red, no magenta

Palette: cool "ink" base matching the canvas, **tea** accent `#d7a65f`, **matcha** successes `#97b979`, clay errors `#dd6b6b`.

## Installation

Install as a pi package from the git source:

```
pi install git:github.com/jnardiello/pi-tenzo
```

From the local folder (for development: the path is added to the settings without
copying anything):

```
pi install /path/to/pi-tenzo
```

To try the package without installing it (current run only), use pi's `-e` flag —
it installs into a temporary directory instead of writing the settings:

```
pi -e /path/to/pi-tenzo
```

### Selecting the theme

After installation, select the theme with `"theme": "tenzo"` in
`~/.pi/agent/settings.json`, or with the `/settings` command.

### Uninstalling

```
pi remove git:github.com/jnardiello/pi-tenzo
```

(alternatively, remove the entry from the `packages` list in
`~/.pi/agent/settings.json`).
