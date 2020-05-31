const puppeteer = require('puppeteer');

async function initiate() {

    const browser = await puppeteer.launch({
        headless: false,
        ignoreHTTPSErrors: true,
        defaultViewport: null
    });
    const page = await browser.newPage();

    await page.goto('https://www.supremenewyork.com/shop/accessories/w4xp3nrj2/mt26hz7la')
    page.waitForNavigation({ waitUntil: 'networkidle0'});

    await page.select('select#s','75628')
}
    initiate();
