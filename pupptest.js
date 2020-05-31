const puppeteer = require('puppeteer');

async function initiate() {

    const browser = await puppeteer.launch({
        headless: false
    });
}

initiate();