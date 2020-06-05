const electron = require('electron')
const BrowserWindow = electron.remote.BrowserWindow
const button = document.getElementById('btn1');
button.addEventListener('click', () => {
        createHarvesterWindow();
});
    function createHarvesterWindow() {
        const win= new BrowserWindow({
            hasShadow: false,
            autoHideMenuBar: true,
            width: 400,
            height: 600,
            webPreferences: {
                nodeIntegration: true,
                //devtools: true,
                preload: `${__dirname}/harvester.js` // some console log stuff
            },
            fullscreenable: false,
            hasShadow: false,
            backgroundColor: "#131313",
            maximizable: false,
            resizable: false,
            icon: __dirname + '/images/logo.png',
            title: 'RESERVED AIO - CAPTCHA HARVESTER',
        })
        
       win.loadURL('https://supremenewyork.com', {
                    userAgent: 'Chrome'
                })
        win.webContents.send('triggerCaptcha')

        ipcMain.on('captcha-done',async (event, token) => { console.log('captcha token', token)})

            }

    