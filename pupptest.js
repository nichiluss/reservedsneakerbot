const puppeteer = require('puppeteer');

async function initiate() {

    const browser = await puppeteer.launch({
    headless: false,
    ignoreHTTPSErrors: true
    });
    const page = await browser.newPage();

    await page.goto('https://www.supremenewyork.com/shop/accessories/w4xp3nrj2/mt26hz7la')
    page.waitForNavigation({ waitUntil: 'networkidle0'});
}
    initiate();
