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
    // Navigates to Supreme
    await page.goto('https://www.supremenewyork.com/shop/accessories/w4xp3nrj2/mt26hz7la');
    page.waitForNavigation({ waitUntil: 'networkidle0'});

    // Selects XL option from size dropdown
    await page.select('select#s','75628');

    // Selects the quantity 6 for quantity dropdown
    await page.select('select#qty', '6');

    // Clicks "add to cart" button
    await page.click('input.button');

    // User input to prevent bot detection
    await page.waitFor(1500);

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
    await page.click('input.button')
    page.waitForSelector('.failed', { visible:true})
        .then(() => console.log("Failed!"))
        .then(() => page.waitFor(1500))
        .then(() => browser.close());
    
    
}
    initiate();
