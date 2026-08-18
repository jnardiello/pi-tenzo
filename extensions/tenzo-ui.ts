import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { FooterComponent } from "@earendil-works/pi-coding-agent";
import { Editor, visibleWidth } from "@earendil-works/pi-tui";

// Colori duplicati da themes/tenzo.json — tenere in sync
const BG = "\x1b[48;2;51;51;54m"; // ink1 #333336
const RESET_BG = "\x1b[49m";
const FULL_RESET = "\x1b[0m";
const BORDER_FG = "\x1b[38;2;69;69;73m"; // ink3 #454549
const RESET_FG = "\x1b[39m";

const LEVEL_COLORS: Record<string, string> = {
  "thinking off": "\x1b[38;2;110;104;92m", // umber
  minimal: "\x1b[38;2;143;136;120m", // driftwood
  low: "\x1b[38;2;201;192;171m", // sand
  medium: "\x1b[38;2;207;160;95m", // gold
  high: "\x1b[38;2;232;148;78m", // orange
  xhigh: "\x1b[38;2;226;112;60m", // flame
  max: "\x1b[38;2;217;80;60m", // ember
};
const LEVEL_RE = /(• )(thinking off|minimal|low|medium|high|xhigh|max)((?:\x1b\[[0-9;]*m)*)$/;

export default function tenzoUi(_pi: ExtensionAPI) {
  const editorProto = Editor.prototype as any;
  if (!editorProto.__tenzoUiPatched) {
    editorProto.__tenzoUiPatched = true;
    const originalRender = Editor.prototype.render;
    const neutralBorder = (str: string) => BORDER_FG + str + RESET_FG;
    Editor.prototype.render = function (width: number): string[] {
      const savedBorder = (this as any).borderColor;
      (this as any).borderColor = neutralBorder;
      let lines: string[];
      try {
        lines = originalRender.call(this, width);
      } finally {
        (this as any).borderColor = savedBorder;
      }
      return lines.map((line: string) => {
        const body = line
          .replaceAll(RESET_BG, RESET_BG + BG)
          .replaceAll(FULL_RESET, FULL_RESET + BG);
        const pad = Math.max(0, width - visibleWidth(line));
        return BG + body + " ".repeat(pad) + RESET_BG;
      });
    };
  }

  const footerProto = FooterComponent.prototype as any;
  if (!footerProto.__tenzoUiPatched) {
    footerProto.__tenzoUiPatched = true;
    const originalFooter = footerProto.render;
    footerProto.render = function (width: number): string[] {
      return originalFooter.call(this, width).map((line: string) => {
        const m = line.match(LEVEL_RE);
        if (!m || m.index === undefined) return line;
        const color = LEVEL_COLORS[m[2]];
        if (!color) return line;
        const level = `\x1b[1m${color}${m[2]}${RESET_FG}\x1b[22m`;
        return line.slice(0, m.index) + m[1] + level + m[3];
      });
    };
  }
}
