import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import toIco from 'to-ico';

const root = path.resolve(process.cwd(), 'public');

async function ensureDir(p) {
  await fs.mkdir(path.dirname(p), { recursive: true });
}

async function svgToPng(svgPath, pngPath, width, height) {
  const svg = await fs.readFile(svgPath);
  await ensureDir(pngPath);
  await sharp(svg).resize(width, height).png({ quality: 90 }).toFile(pngPath);
}

async function svgToIco(svgPath, icoPath, sizes = [16,32,48]) {
  const svg = await fs.readFile(svgPath);
  const buffers = await Promise.all(
    sizes.map((s) => sharp(svg).resize(s, s).png().toBuffer())
  );
  const ico = await toIco(buffers);
  await ensureDir(icoPath);
  await fs.writeFile(icoPath, ico);
}

(async () => {
  const ogSvg = path.join(root, 'og-image.svg');
  const ogPng = path.join(root, 'og-image.png');
  const favSvg = path.join(root, 'favicon.svg');
  const favIco = path.join(root, 'favicon.ico');

  await svgToPng(ogSvg, ogPng, 1200, 630);
  await svgToIco(favSvg, favIco, [16,32,48,64]);

  console.log('Generated:', ogPng, 'and', favIco);
})(); 