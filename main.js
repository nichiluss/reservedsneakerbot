const { app, BrowserWindow } = require('electron');
const { Menu } = require('electron');
const ipcMain = require('electron').ipcMain;
const fs = require('fs');
const os = require('os');
const storage = require('electron-json-storage');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth')();

storage.setDataPath(os.tmpdir());
StealthPlugin.onBrowser = () => {};


let name = "";
let email = "";
let tel = "";
let address = "";
let zip = "";
let city = "";
let state = "";
let country = "";
let card = "";
let rawCard = ";"
let expMonth = "";
let expYear = "";
let cvv = "";
const itemType = "accessories";
const itemSubType = "wear";
const qty = "1";
const itemSize = "L";
const keyword1 = "Hanes";
const keyword2 = "Tees";
const nativeMenus = [
    {
        label: 'Harvester',
        submenu: [
            {
                label: 'Supreme',
                click() {
                    openHarvesterWindow('https://supremenewyork.com')
                },
            },
            {
                label: 'GLogin',
                click() {
                    openHarvesterWindow("https://accounts.google.com/signin/v2/identifier?hl=en&service=youtube&continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Ffeature%3Dsign_in_button%26hl%3Den%26app%3Ddesktop%26next%3D%252F%26action_handle_signin%3Dtrue&passive=true&uilel=3&flowName=GlifWebSignIn&flowEntry=ServiceLogin")
                }
            }
        ]
    }
]
const menu = Menu.buildFromTemplate(nativeMenus)
Menu.setApplicationMenu(menu)

const nativeImage = require('electron').nativeImage;
    var image = nativeImage.createFromPath(__dirname + '/images/logo.png'); 
 // where public folder on the root dir

    image.setTemplateImage(true);

function setWithExpiry(value) {
      const now = new Date()

      const item = {
        value: value,
        expiry: now.getTime() + 120000
      }
      storage.set('captcha', JSON.stringify(item), (err) =>{
          if (err) throw err;
      })
      fs.writeFile('captchalog.txt', value, (err) => {
          if (err) throw err;
      })
    }

async function getWithExpiry(key) {
    return new Promise((res, rej) => {
        storage.has(key, function (error, hasKey) {
          if (error) rej(error);
    
          if (hasKey) {
            storage.get(key, function (error, data) {
              if (error) rej(error);
              const item = JSON.parse(data);
              const now = new Date();
    
              if (now.getTime() > item.expiry) {
                storage.remove(key, function (error) {
                  if (error) rej(error);
                  res(null);
                });
              } else {
                console.log(item.value);
                res(item.value); 
              }
            });
          }
        });
      });
}
function createWindow () {
    const win = new BrowserWindow({
        width: 1175,
        height: 720,
        webPreferences: {
            nodeIntegration: true,
            devtools: false,
    },
    fullscreenable: false,
    hasShadow: false,
    maximizable: false,
    frame: true,
    resizable: false,
    icon: image,
    })
    //Loads the GUI 
    win.loadFile('home.html');
    //Removes navigation bar
    //win.removeMenu();
    //Open DevTools
    win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

var harvesterWindow = null

function openHarvesterWindow(pageURL) {
    if (harvesterWindow) {
        harvesterWindow.focus()
        return
    }
    var harvesterWindow = new BrowserWindow({
        hasShadow: false,
        //autoHideMenuBar: true,
        width: 400,    height: 600,
        webPreferences: {
            nodeIntegration: true,
            devtools: true,
            preload: `${__dirname}/harvester.js` // some console log stuff
        },
        fullscreenable: false,
        hasShadow: false,
        backgroundColor: "#131313",
        maximizable: false,
        resizable: true,
        icon: __dirname + '/images/logo.png',
        title: 'RESERVED AIO - CAPTCHA HARVESTER',
    })
    harvesterWindow.removeMenu();

    harvesterWindow.loadURL(pageURL, {
                userAgent: 'Chrome'
            })
    
    if(pageURL == "https://supremenewyork.com") {
        harvesterWindow.webContents.send("triggerCaptcha")

        ipcMain.on('captcha-done', async (event, token) => { 
            setWithExpiry(token) 
            console.log(token)
        })
        }
    
    }
    function fetchData(profName) {
        let rawProfileText = fs.readFile(`./profiles/${profName}.pf`, 'utf8', function read(err, data) {
            if (err) throw err;
    
            const content = data;
            let rawSplitData = content.split("\n");
            name = rawSplitData[0];
            email = rawSplitData[1];
            tel = rawSplitData[2];
            address = rawSplitData[3];
            zip = rawSplitData[4];
            city = rawSplitData[5];
            state = rawSplitData[6];
            rawCard = rawSplitData[7];
            card=rawCard.match(/.{1,4}/g);
            expMonth = rawSplitData[8];
            expYear = rawSplitData[9];
            cvv = rawSplitData[10];
    
            console.log(rawSplitData);
    
    
        });
        fs.close(0, (err) => { 
            if (err) 
              console.error('Failed to close file', err); 
            else { 
              console.log("\n> File Closed successfully"); 
            }
         });
        console.log(rawProfileText);
    }

    async function initiate(profName) {
        fetchData(profName);
        try {
            puppeteer.use(StealthPlugin);
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
            async function findLinkTwoKeywords(page, keyword1, keyword2) {
                const links = await page.$$('a')
                for (var i=0; i < links.length; i++) {
                let valueHandle = await links[i].getProperty('innerText');
                let jsonKeyword = await valueHandle.jsonValue();
                const linkString = jsonKeyword.toString();
    
                let valueLink = await links[i].getProperty('href');
                let jsonKeywordLink = await valueLink.jsonValue();
                const link = jsonKeywordLink.toString();
        //         console.log("test ", keyword, keywordLink);
    
                if (linkString.includes(keyword1 && keyword2)) {
                    console.log("Item found");
                await page.goto(link);
                    break;
                }
                }
                return null;
            }
            
            findLinkTwoKeywords(page, keyword1, keyword2);
    
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
            await page.waitFor(4500);
    
            // Clicks check-out button
            await page.waitForSelector('a.button.checkout');
            await page.click('a.button.checkout');
    
            //Waits for checkout page to load
            page.waitForNavigation({ waitUntil: 'networkidle0'});
            page.waitFor(4500);
            
            //Autofills user data
            await page.type('#order_billing_state', state);
            page.waitFor(100);
            await page.type('#order_billing_name', name);
            page.waitFor(50);
            await page.type('#order_email', email);
            page.waitFor(50);
            await page.type('#order_tel', tel);
            page.waitFor(500);
            console.log(address);
            await page.type('#bo.string.required', address);
            page.waitFor(500);
            await page.type('#order_billing_zip', zip);
            page.waitFor(50);
            await page.type('#order_billing_city', city);
            page.waitFor(50);
            await page.type('#rnsnckrn.string.required', card);
            page.waitFor(50);
            await page.type('#credit_card_month', expMonth);
            page.waitFor(50);
            await page.type('#credit_card_year', expYear);
            page.waitFor(50);
            await page.type('#orcer.string.required', cvv);
            page.waitFor(50);
            await page.click('#order_terms.checkbox');
            page.waitFor(1000);
            setTimeout(async () => {
                var tokenpass = await getWithExpiry("captcha");
                console.log(tokenpass)
                await page.evaluate((tokenpass) => {document.getElementById("g-recaptcha-response").innerText = `${tokenpass}`}, tokenpass)
                await page.click('input.button').then(console.log('Clicked'));
                await page.waitFor(1000)
                
                
            }, 750);
            
            page.waitForSelector('.failed', { visible:true })
                .then(() => console.log("Failed!"))
                .then(() => page.waitFor(1500))
                .then(() => browser.close());
        }
        catch (err) {
            console.log(err);
        }
    }
    
//Checks to make sure that the app doesn't minimize to tray
app.on('window-all-closed', () => {
    if(process.platform != 'darwin'){
        app.quit();
    }
})
//Opens app when .exe is double clicked.
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
})