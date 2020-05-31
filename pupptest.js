const puppeteer = require('puppeteer');
const jsonFile = require('jsonfile');



async function initiate() {

    const browser = await puppeteer.launch({
    headless: false,
    ignoreHTTPSErrors: true
    });
    const page = await browser.newPage();

    await page.goTo('www.soundcloud.com/')
    page.waitForNavigation({ waitUntil: 'networkidle0'});
}
    initiate();
