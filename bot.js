const fs = require('fs');
const puppeteer = require('puppeteer-extra');
const stealthPlugin = require('puppeteer-extra-plugin-stealth');
const mouseHelper = require("mouse-helper");
puppeteer.use(stealthPlugin);

const debug = true;
//Creates instance of browser
//Save endpoint in case of crash 
//New page created -> create instance of mouse 
 const browser = await puppeteer.launch({
    headless: false,
    ignoreHTTPSErrors: true
}).then(async browser => {
    const browserWSEndpoint = browser.wsEndpoint();
    const page = await browser.newPage();

    if(debug == true){
        await installMouseHelper(page);

    }
})
