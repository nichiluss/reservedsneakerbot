const { app, BrowserWindow } = require('electron');
const { Menu } = require('electron')
const ipcMain = require('electron').ipcMain

const nativeMenus = [
    {
        label: 'Harvester',
        submenu: [
            {
                label: 'Harvester',
                click() {
                    openHarvesterWindow()
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

function openHarvesterWindow() {
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

    harvesterWindow.loadURL('https://supremenewyork.com', {
                userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) BOEHLERIOSupreme/0.8.5 Chrome/80.0.3987.137 Electron/8.1.0 Safari/537.36'
            })

    harvesterWindow.webContents.send('triggerCaptcha')

    ipcMain.on('captcha-done', async (event, token) => { console.log('captcha token', token)})
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