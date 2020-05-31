// ###############################
// ########PUPPETEER TEST#########
// ###############################

// Initializes puppeteer
const puppeteer = require('puppeteer');
const name = "Nicholas Anthony";
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
    page.waitFor(1500);
    
    //Autofills user data
    await page.type('#order_billing_name', name);
    
}
    initiate();
