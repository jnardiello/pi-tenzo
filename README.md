# pi-tenzo

Tema per [pi](https://pi.dev) disegnato attorno al terminale reale, non a screenshot altrui.

Assunzioni di base (misurate, non ereditabili dal tema):

- canvas del terminale: `#282c34` (Ghostty default) — pi non dipinge lo sfondo
- testo body: foreground del terminale (`#ffffff` di default) — pi non lo colora
- il bordo dell'input indica il livello di thinking: la scala qui va da grigio a rosso-brace, niente magenta

Palette: base "ink" fredda coerente col canvas, accento **tè** `#d7a65f`, successi **matcha** `#97b979`, errori argilla `#dd6b6b`.

## Sviluppo

Il tema attivo è una copia reale in `~/.pi/agent/themes/tenzo.json` (non un symlink: il
watcher hot-reload di pi e il comando `/theme` via claude-bridge non collaborano coi link).

```
cp themes/tenzo.json ~/.pi/agent/themes/tenzo.json
```

Con il tema attivo, pi osserva quel file e ricarica a caldo ad ogni copia.
