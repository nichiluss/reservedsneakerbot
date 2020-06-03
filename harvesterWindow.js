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
        
       win.loadURL('https://accounts.google.com/signin/v2/identifier?hl=en&service=youtube&continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Ffeature%3Dsign_in_button%26hl%3Den%26app%3Ddesktop%26next%3D%252F%26action_handle_signin%3Dtrue&passive=true&uilel=3&flowName=GlifWebSignIn&flowEntry=ServiceLogin', {
                    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) BOEHLERIOSupreme/0.8.5 Chrome/80.0.3987.137 Electron/8.1.0 Safari/537.36'
                })
                

            }

    