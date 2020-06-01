// ###############################
// ########PUPPETEER TEST#########
// ###############################

// Initializes puppeteer
const puppeteer = require('puppeteer');
const name = "Nicholas Anthony";
const email = "nichilusa@gmail.com";
const tel = "415-310-3874";
const address = "398 Eliseo Drive";
const zip = "94904";
const city = "Greenbrae";
const state = "CA";
const country = "USA";
const card = "5313 6729 0339 4630";
const expMonth = "05";
const expYear = "2026";
const cvv = "042";
const itemType = "accessories";
const itemSubType = "shoe";
const qty = "4";
const itemSize = "M";
const keywords = "Tagless Tees";

// Function that runs the auto selector
async function initiate() {

    // Launches the browser
    const browser = await puppeteer.launch({
        headless: false,
        ignoreHTTPSErrors: true,
        defaultViewport: null
    });

    // Opens new tab
    const page = await browser.newPage();

    page.setDefaultTimeout(1800000);
    
    // Navigates to shop page that is indicated by the item type provided by the user
    await page.goto(`https://www.supremenewyork.com/shop/all/${itemType}`);
    page.waitForNavigation({ waitUntil: 'networkidle0'});
    
    //Checks page for link text that matches keywords and clicks on it
    async function findLink(page, keyword) {
        const links = await page.$$('a')
        for (var i=0; i < links.length; i++) {
          let valueHandle = await links[i].getProperty('innerText');
          let jsonKeyword = await valueHandle.jsonValue();
          const linkString = jsonKeyword.toString();

          let valueLink = await links[i].getProperty('href');
          let jsonKeywordLink = await valueLink.jsonValue();
          const link = jsonKeywordLink.toString();
 //         console.log("test ", keyword, keywordLink);

          if (linkString.includes(keyword)) {
            console.log("Item found");
           await page.goto(link);
            break;
         }
        }
        return null;
      }
    
    findLink(page, keywords);

    page.waitForNavigation({ waitUntil: 'networkidle0'});
    await page.waitFor(1500);

    if (itemSubType == "shoe") {
        if (itemSize == 'S') {
            const option = (await page.$x('//*[@id = "s"]/option[text() = "Small"]'))[0];
            const value = await (await option.getProperty('value')).jsonValue();
            await page.select('select#s', value);
            await page.select('select#qty', qty);
            await page.click('input.button');
        }
        else if (itemSize == 'M') {
            const option = (await page.$x('//*[@id = "s"]/option[text() = "Medium"]'))[0];
            const value = await (await option.getProperty('value')).jsonValue();
            await page.select('select#s', value);
            await page.select('select#qty', qty);
            await page.click('input.button');
        }
        else if (itemSize == 'L') {
            const option = (await page.$x('//*[@id = "s"]/option[text() = "Large"]'))[0];
            const value = await (await option.getProperty('value')).jsonValue();
            await page.select('select#s', value);
            await page.select('select#qty', qty);
            await page.click('input.button');
        }        
        else if (itemSize == 'XL') {
            const option = (await page.$x('//*[@id = "s"]/option[text() = "XLarge"]'))[0];
            const value = await (await option.getProperty('value')).jsonValue();
            await page.select('select#s', value);
            await page.select('select#qty', qty);
            await page.click('input.button');
        }
    }

    if (itemSubType == "wear") {        
        if (itemSize == 'S') {
            const option = (await page.$x('//*[@id = "s"]/option[text() = "Small"]'))[0];
            const value = await (await option.getProperty('value')).jsonValue();
            await page.select('select#s', value);
            await page.select('select#qty', qty);
            await page.click('input.button');
        }
        else if (itemSize == 'M') {
            const option = (await page.$x('//*[@id = "s"]/option[text() = "Medium"]'))[0];
            const value = await (await option.getProperty('value')).jsonValue();
            await page.select('select#s', value);
            await page.select('select#qty', qty);
            await page.click('input.button');
         }
        else if (itemSize == 'L') {
            const option = (await page.$x('//*[@id = "s"]/option[text() = "Large"]'))[0];
            const value = await (await option.getProperty('value')).jsonValue();
            await page.select('select#s', value);
            await page.select('select#qty', qty);
            await page.click('input.button');
        }
        else if (itemSize == 'XL') {
            const option = (await page.$x('//*[@id = "s"]/option[text() = "XLarge"]'))[0];
            const value = await (await option.getProperty('value')).jsonValue();
            await page.select('select#s', value);
            await page.select('select#qty', qty);
            await page.click('input.button');
        }
    }

    if (itemSubType == "misc") {
        await page.click('input.button');
    }

    if (itemSubType == "miscWithQuantity") {
        await page.select('select#qty', qty);
        await page.click('input.button');
    }

    if (itemSubType == "miscWithSizeAndQuantity") {
        if (itemSize == 'S') {
            const option = (await page.$x('//*[@id = "s"]/option[text() = "Small"]'))[0];
            const value = await (await option.getProperty('value')).jsonValue();
            await page.select('select#s', value);
            await page.select('select#qty', qty);
            await page.click('input.button');
        }
        else if (itemSize == 'M') {
            const option = (await page.$x('//*[@id = "s"]/option[text() = "Medium"]'))[0];
            const value = await (await option.getProperty('value')).jsonValue();
            await page.select('select#s', value);
            await page.select('select#qty', qty);
            await page.click('input.button');
         }
        else if (itemSize == 'L') {
            const option = (await page.$x('//*[@id = "s"]/option[text() = "Large"]'))[0];
            const value = await (await option.getProperty('value')).jsonValue();
            await page.select('select#s', value);
            await page.select('select#qty', qty);
            await page.click('input.button');
        }        
        else if (itemSize == 'XL') {
            const option = (await page.$x('//*[@id = "s"]/option[text() = "XLarge"]'))[0];
            const value = await (await option.getProperty('value')).jsonValue();
            await page.select('select#s', value);
            await page.select('select#qty', qty);
            await page.click('input.button');
        }
    }
    // User input to prevent bot detection
    await page.waitFor(3000);

    // Clicks check-out button
    await page.waitForSelector('a.button.checkout');
    await page.click('a.button.checkout');

    //Waits for checkout page to load
    page.waitForNavigation({ waitUntil: 'networkidle0'});
    page.waitFor(4500);
    
    //Autofills user data
    await page.type('#order_billing_name', name);
    page.waitFor(50);
    await page.type('#order_email', email);
    page.waitFor(50);
    await page.type('#order_tel', tel);
    page.waitFor(500);
    await page.type('#bo.string.required', address);
    page.waitFor(500);
    await page.type('#order_billing_zip', zip);
    page.waitFor(50);
    await page.type('#order_billing_city', city);
    page.waitFor(50);
    await page.select('select#order_billing_state', state);
    page.waitFor(50);
    await page.select('select#order_billing_country', country);
    page.waitFor(50);
    await page.type('#rnsnckrn.string.required', card);
    page.waitFor(50);
    await page.select('select#credit_card_month', expMonth);
    page.waitFor(50);
    await page.select('select#credit_card_year', expYear);
    page.waitFor(50);
    await page.type('#orcer.string.required', cvv);
    page.waitFor(50);
    await page.click('#order_terms.checkbox');
    page.waitFor(50);
    await page.click('input.button');
    page.waitForSelector('.failed', { visible:true })
        .then(() => console.log("Failed!"))
        .then(() => page.waitFor(1500))
        .then(() => browser.close());
    
}
