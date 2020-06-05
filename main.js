const { app, BrowserWindow } = require('electron');
const { Menu } = require('electron')
const ipcMain = require('electron').ipcMain

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
    win.loadFile('task.html');
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
            //devtools: true,
            preload: `${__dirname}/harvester.js` // some console log stuff
        },
        fullscreenable: false,
        hasShadow: false,
        backgroundColor: "#131313",
        maximizable: false,
        //resizable: false,
        icon: __dirname + '/images/logo.png',
        title: 'RESERVED AIO - CAPTCHA HARVESTER',
    })
    harvesterWindow.removeMenu();
    
    harvesterWindow.loadURL(pageURL, {
                userAgent: 'Chrome'
            })
    
    if(pageURL == "https://supremenewyork.com") {
        harvesterWindow.webContents.send('triggerCaptcha')

        ipcMain.on('captcha-done', async (event, token) => { console.log('captcha token', token)})
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