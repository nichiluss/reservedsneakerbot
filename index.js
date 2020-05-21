const { app, BrowserWindow } = require('electron');

function createWindow () {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    //Loads the GUI 
    win.loadFile('index.html');

    //Open DevTools
    win.webContents.openDevTools();
}
//Waits for ready
app.whenReady().then(createWindow);

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