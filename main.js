const { app, BrowserWindow } = require('electron');

function createWindow () {
    const win = new BrowserWindow({
        width: 1190,
        height: 720,
        webPreferences: {
            nodeIntegration: true,
            devtools: false,
    },
    fullscreenable: false,
    hasShadow: false,
    maximizable: false,
    frame: true,
    resizable: false
    })
    //Loads the GUI 
    win.loadFile('task.html');
    //Removes navigation bar
    win.removeMenu();
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