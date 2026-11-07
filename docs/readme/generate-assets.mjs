// Run from the repository root: node docs/readme/generate-assets.mjs
// Uses the Sharp installation bundled with the project's Next.js dependency.
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const output = fileURLToPath(new URL("./", import.meta.url));
const colors = {
    cream: "#faf6f0",
    paper: "#fffdfc",
    wine: "#7d2745",
    ink: "#1f1d1d",
    muted: "#6e6662",
    blush: "#dcc7be",
    line: "#e6ddd6",
    green: "#71836a",
};
const frames = 48;
const duration = 100;
const tau = Math.PI * 2;

function text(x, y, label, size = 16, options = "") {
    return `<text x="${x}" y="${y}" font-family="Segoe UI, sans-serif" font-size="${size}" fill="${colors.ink}" ${options}>${label}</text>`;
}

function sparkle(x, y, size, opacity = 1) {
    return `<path d="M${x} ${y - size} Q${x} ${y} ${x + size} ${y} Q${x} ${y} ${x} ${y + size} Q${x} ${y} ${x - size} ${y} Q${x} ${y} ${x} ${y - size}Z" fill="${colors.wine}" opacity="${opacity}"/>`;
}

function svg(width, height, body) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="${width}" height="${height}" fill="${colors.cream}"/>
    ${body}
  </svg>`;
}

function steam(x, y, phase) {
    return [0, 1, 2]
        .map((i) => {
            const wave = Math.sin(phase + i * 0.8) * 4;
            return `<path d="M${x + i * 15} ${y} C${x - 10 + i * 15 + wave} ${y - 12}, ${x + 10 + i * 15 + wave} ${y - 21}, ${x + i * 15} ${y - 34}" fill="none" stroke="${colors.wine}" stroke-width="2" stroke-linecap="round" opacity="${0.3 + Math.sin(phase + i) * 0.1}"/>`;
        })
        .join("");
}

function banner(frame) {
    const phase = (frame / frames) * tau;
    const bob = Math.sin(phase) * 4;
    const cursor = frame % 12 < 7 ? colors.blush : colors.wine;
    const code = [
        ["const chioma = {", colors.wine],
        ['  builds: "with care",', colors.muted],
        ['  thinks: "security",', colors.muted],
        ['  brings: "curiosity"', colors.muted],
        ["};", colors.wine],
    ];
    return svg(
        1000,
        380,
        `
    <rect x="18" y="18" width="964" height="344" rx="22" fill="none" stroke="${colors.line}"/>
    <path d="M54 51H81M54 51V78M946 329H919M946 329V302" fill="none" stroke="${colors.blush}" stroke-width="2"/>
    <rect x="62" y="62" width="260" height="29" rx="14" fill="#f4ede6"/>
    ${text(79, 81, "A LITTLE CODE. A LOT OF CURIOSITY.", 10, 'letter-spacing="1.3"')}
    <text x="60" y="167" font-family="Georgia, serif" font-size="70" fill="${colors.wine}">Chioma Okeke</text>
    <text x="65" y="215" font-family="Segoe Print, cursive" font-size="23" fill="${colors.muted}">Building with care. Creating with heart.</text>
    <path d="M64 237 Q200 247 332 235" fill="none" stroke="${colors.blush}" stroke-width="3" stroke-linecap="round"/>
    ${text(65, 285, "SOFTWARE ENGINEERING  /  CYBERSECURITY", 11, 'letter-spacing="1.7"')}
    ${text(65, 313, "and a little life outside syntax.", 15, 'font-style="italic"')}
    <g transform="translate(676 ${89 + bob}) rotate(4 117 96)">
      <rect x="-12" y="-12" width="261" height="231" rx="5" fill="${colors.blush}" opacity="0.35" transform="rotate(-8 117 96)"/>
      <rect width="234" height="204" rx="10" fill="${colors.paper}" stroke="${colors.line}"/>
      <path d="M0 33H234" stroke="${colors.line}"/>
      <circle cx="17" cy="17" r="4" fill="${colors.wine}"/>
      <circle cx="31" cy="17" r="4" fill="${colors.blush}"/>
      <circle cx="45" cy="17" r="4" fill="${colors.green}"/>
      ${text(135, 21, "a little about me", 9, 'fill-opacity="0.5"')}
      ${code.map(([line, color], i) => `<text x="18" y="${65 + i * 24}" font-family="Consolas, monospace" font-size="12" fill="${color}">${line}</text>`).join("")}
      <rect x="37" y="151" width="7" height="15" fill="${cursor}"/>
      <rect x="18" y="181" width="198" height="1" fill="${colors.line}"/>
      <circle cx="22" cy="192" r="2.5" fill="${colors.green}"/>
      ${text(30, 195, "always learning", 9, 'fill-opacity="0.65"')}
    </g>
    ${sparkle(619, 105, 10 + Math.sin(phase) * 2, 0.7)}
    ${sparkle(939, 68, 7, 0.6 + Math.sin(phase + 1) * 0.25)}
    ${sparkle(637, 295, 6, 0.6 + Math.sin(phase + 2) * 0.25)}
    ${sparkle(927, 323, 10 + Math.cos(phase) * 2, 0.65)}
  `,
    );
}

function coffee(frame) {
    const phase = (frame / frames) * tau;
    const cursor = frame % 12 < 7 ? colors.wine : colors.cream;
    return svg(
        760,
        250,
        `
    <rect x="18" y="18" width="724" height="214" rx="20" fill="${colors.paper}" stroke="${colors.line}"/>
    <g transform="translate(58 51)">
      <rect x="0" y="0" width="204" height="125" rx="9" fill="${colors.cream}" stroke="${colors.blush}" stroke-width="2"/>
      <path d="M0 25H204" stroke="${colors.line}"/>
      ${[14, 26, 38].map((x, i) => `<circle cx="${x}" cy="13" r="3" fill="${[colors.wine, colors.blush, colors.green][i]}"/>`).join("")}
      ${text(17, 52, "&gt; make something", 12, 'style="font-family:Consolas,monospace"')}
      ${text(17, 74, "  thoughtful.", 12, 'style="font-family:Consolas,monospace"')}
      <path d="M18 93L23 98L32 88" fill="none" stroke="${colors.green}" stroke-width="2"/>
      ${text(40, 99, "keep learning", 10)}
      <rect x="124" y="89" width="6" height="12" fill="${cursor}"/>
      <path d="M-14 128H218L207 140H-3Z" fill="${colors.blush}"/>
      <path d="M78 128H126L120 133H84Z" fill="${colors.cream}"/>
    </g>
    <g transform="translate(286 124)">
      ${steam(12, -6, phase)}
      <ellipse cx="34" cy="59" rx="45" ry="7" fill="${colors.blush}" opacity="0.35"/>
      <path d="M61 6H72C91 6 91 34 71 35H63" fill="none" stroke="${colors.wine}" stroke-width="5"/>
      <path d="M0 0H66V34Q66 57 33 57Q0 57 0 34Z" fill="${colors.wine}"/>
      <ellipse cx="33" cy="0" rx="33" ry="6" fill="${colors.blush}"/>
      <path d="M26 24C20 15 10 25 26 36C42 25 32 15 26 24" fill="${colors.cream}" transform="translate(7 0)"/>
    </g>
    <path d="M408 62V187" stroke="${colors.line}"/>
    <text x="443" y="95" font-family="Georgia, serif" font-size="29" font-style="italic" fill="${colors.wine}">A curious mind.</text>
    <text x="443" y="132" font-family="Georgia, serif" font-size="29" font-style="italic" fill="${colors.wine}">A thoughtful build.</text>
    <text x="445" y="170" font-family="Segoe Print, cursive" font-size="16" fill="${colors.muted}">A little soft power.</text>
    ${sparkle(683, 66, 6 + Math.sin(phase), 0.55)}
    ${sparkle(695, 181, 9 + Math.cos(phase), 0.45)}
  `,
    );
}

await mkdir(output, { recursive: true });
for (const [name, width, height, render] of [
    ["portfolio-banner", 1000, 380, banner],
    ["coffee-and-code", 760, 250, coffee],
]) {
    const pixels = [];
    for (let frame = 0; frame < frames; frame++) {
        pixels.push(
            await sharp(Buffer.from(render(frame)))
                .removeAlpha()
                .raw()
                .toBuffer(),
        );
    }
    await sharp(Buffer.concat(pixels), {
        raw: {
            width,
            height: height * frames,
            channels: 3,
            pageHeight: height,
        },
    })
        .gif({
            loop: 0,
            delay: Array(frames).fill(duration),
            colours: 64,
            dither: 0,
            effort: 7,
        })
        .toFile(`${output}${name}.gif`);
    const metadata = await sharp(`${output}${name}.gif`, {
        animated: true,
    }).metadata();
    console.log(
        `${name}.gif: ${metadata.width}x${metadata.pageHeight}, ${metadata.pages} frames, ${metadata.loop === 0 ? "loops forever" : "finite loop"}`,
    );
}
