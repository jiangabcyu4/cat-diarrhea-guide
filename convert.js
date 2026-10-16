const { chromium } = require('playwright-core');
const path = require('path');

const CHROME = 'C:\\Users\\jaeye\\AppData\\Local\\ms-playwright\\chromium-1234\\chrome-win64\\chrome.exe';
const HTML = path.resolve(__dirname, '猫咪腹泻深度科普与解决大全_20261015_v1.html');
const PDF = path.resolve(__dirname, '猫咪腹泻深度科普与解决大全_20261015_v1.pdf');

(async () => {
  const browser = await chromium.launch({
    executablePath: CHROME,
    headless: true,
    args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
  });
  const page = await browser.newPage({ viewport: { width: 1000, height: 1400 } });
  await page.goto('file://' + HTML, { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(600);
  await page.pdf({
    path: PDF,
    format: 'A4',
    printBackground: true,
    margin: { top: '12mm', right: '12mm', bottom: '14mm', left: '12mm' },
    preferCSSPageSize: false
  });
  await browser.close();
  console.log('PDF_OK:' + PDF);
})().catch(e => { console.error('PDF_FAIL:' + e.message); process.exit(1); });
