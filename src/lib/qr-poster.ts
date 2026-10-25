import QRCode from "qrcode";

// A4 at 300 dpi, so the PNG prints at exactly A4 size.
const W = 2480;
const H = 3508;

// Design tokens from globals.css ("Nocturnal Premium").
const SURFACE = "#121415";
const GOLD = "#f2ca50";
const BRASS = "#d4af37";
const ON_SURFACE = "#e2e2e4";
const ON_SURFACE_VARIANT = "#d0c5af";

async function loadLogo() {
  const img = new Image();
  img.src = "/logo.svg";
  await img.decode();
  return img;
}

// The brand logo (public/logo.svg) clipped to a rounded square.
function drawLogo(
  ctx: CanvasRenderingContext2D,
  logo: HTMLImageElement,
  cx: number,
  cy: number,
  size: number,
) {
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(cx - size / 2, cy - size / 2, size, size, size * 0.2);
  ctx.clip();
  ctx.drawImage(logo, cx - size / 2, cy - size / 2, size, size);
  ctx.restore();
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

// Shrinks the font until `text` fits `maxWidth`.
function fitText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  startSize: number,
  weight: number,
  family: string,
) {
  let size = startSize;
  do {
    ctx.font = `${weight} ${size}px ${family}`;
    size -= 4;
  } while (ctx.measureText(text).width > maxWidth && size > 40);
}

/** Renders the barber's printable A4 poster (PNG data URL) for their public link. */
export async function renderQrPoster(opts: {
  url: string;
  businessName: string;
}): Promise<string> {
  // Same typeface as the app (next/font exposes its family on --font-hanken).
  const hanken = getComputedStyle(document.documentElement)
    .getPropertyValue("--font-hanken")
    .trim();
  const family = hanken ? `${hanken}, sans-serif` : "sans-serif";
  await Promise.all(
    [400, 700, 800].map((w) => document.fonts.load(`${w} 100px ${family}`)),
  ).catch(() => undefined);

  const logo = await loadLogo();
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas non supporté");
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";

  // Background + gold double frame.
  ctx.fillStyle = SURFACE;
  ctx.fillRect(0, 0, W, H);
  const glow = ctx.createRadialGradient(W / 2, 1900, 200, W / 2, 1900, 1700);
  glow.addColorStop(0, "rgba(242, 202, 80, 0.14)");
  glow.addColorStop(1, "rgba(242, 202, 80, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 8;
  roundRect(ctx, 90, 90, W - 180, H - 180, 36);
  ctx.stroke();
  ctx.strokeStyle = "rgba(212, 175, 55, 0.4)";
  ctx.lineWidth = 3;
  roundRect(ctx, 130, 130, W - 260, H - 260, 24);
  ctx.stroke();

  // Brand lockup: logo + wordmark.
  drawLogo(ctx, logo, W / 2, 360, 240);
  ctx.fillStyle = GOLD;
  ctx.font = `800 150px ${family}`;
  ctx.letterSpacing = "30px";
  ctx.fillText("HAJJEMI", W / 2 + 15, 640);
  ctx.letterSpacing = "0px";
  ctx.fillStyle = ON_SURFACE_VARIANT;
  ctx.font = `400 62px ${family}`;
  ctx.fillText("L'excellence du barbier tunisien", W / 2, 740);

  // Headline.
  ctx.fillStyle = ON_SURFACE;
  ctx.font = `700 170px ${family}`;
  ctx.fillText("Réservez votre coupe", W / 2, 1010);
  ctx.fillStyle = GOLD;
  ctx.fillText("en un clic.", W / 2, 1200);

  // QR card. Error correction "H" tolerates the logo covering the middle.
  const cardSize = 1380;
  const cardX = (W - cardSize) / 2;
  const cardY = 1350;
  const pad = 90;
  const qrSize = cardSize - pad * 2;
  ctx.save();
  ctx.shadowColor = "rgba(0, 0, 0, 0.6)";
  ctx.shadowBlur = 80;
  ctx.shadowOffsetY = 30;
  ctx.fillStyle = "#ffffff";
  roundRect(ctx, cardX, cardY, cardSize, cardSize, 70);
  ctx.fill();
  ctx.restore();
  ctx.strokeStyle = BRASS;
  ctx.lineWidth = 14;
  roundRect(ctx, cardX, cardY, cardSize, cardSize, 70);
  ctx.stroke();

  const qr = document.createElement("canvas");
  await QRCode.toCanvas(qr, opts.url, {
    errorCorrectionLevel: "H",
    margin: 0,
    width: qrSize,
    color: { dark: SURFACE, light: "#ffffff" },
  });
  ctx.drawImage(qr, cardX + pad, cardY + pad, qrSize, qrSize);

  // Logo in the center of the QR (~22% of its width — within what "H" repairs).
  const cx = W / 2;
  const cy = cardY + cardSize / 2;
  const logoSize = qrSize * 0.22;
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.roundRect(
    cx - logoSize / 2 - 22,
    cy - logoSize / 2 - 22,
    logoSize + 44,
    logoSize + 44,
    logoSize * 0.2 + 22,
  );
  ctx.fill();
  drawLogo(ctx, logo, cx, cy, logoSize);

  // Barber name + call to action.
  ctx.fillStyle = ON_SURFACE;
  fitText(ctx, opts.businessName, W - 500, 150, 800, family);
  ctx.fillText(opts.businessName, W / 2, 2990);
  ctx.fillStyle = GOLD;
  ctx.font = `700 84px ${family}`;
  ctx.letterSpacing = "6px";
  ctx.fillText("SCANNEZ POUR RÉSERVER", W / 2, 3130);
  ctx.letterSpacing = "0px";
  ctx.fillStyle = ON_SURFACE_VARIANT;
  ctx.font = `400 54px ${family}`;
  ctx.fillText(opts.url.replace(/^https?:\/\//, ""), W / 2, 3250);

  return canvas.toDataURL("image/png");
}
