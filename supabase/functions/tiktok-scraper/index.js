const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const outputDir = './tiktok-docs';
const startUrl = 'https://ads.tiktok.com/help/article/tiktok-business-center?lang=en';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function sanitizeFilename(name) {
  return name.replace(/[<>:"/\\|?*\x00-\x1F]/g, '_').slice(0, 100);
}

async function scrapeTikTokDocs() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(startUrl, { waitUntil: 'networkidle2' });

  const links = await page.evaluate(() =>
    Array.from(document.querySelectorAll('a'))
      .map(a => a.href)
      .filter(href => href.includes('/help/article/'))
  );

  console.log(`Found ${links.length} article links.`);

  for (const link of links) {
    const filename = sanitizeFilename(link.split('/').pop().split('?')[0]) + '.pdf';
    const pdfPath = path.join(outputDir, filename);

    try {
      await page.goto(link, { waitUntil: 'networkidle2' });
      await page.pdf({ path: pdfPath, format: 'A4' });
      console.log(`✅ Saved: ${pdfPath}`);
    } catch (err) {
      console.error(`❌ Failed to scrape ${link}: ${err.message}`);
    }
  }

  await browser.close();
}

scrapeTikTokDocs().catch(err => {
  console.error(err);
  process.exit(1);
});
