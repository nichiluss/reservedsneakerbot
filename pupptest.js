const puppeteer = require('puppeteer');

async function initiate() {

    const browser = await puppeteer.launch({
        headless: false
    });
    console.log('Its not headless!');
    browser.headless == true;
    console.log('Its headless!');
}


initiate();