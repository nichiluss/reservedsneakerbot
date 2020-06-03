const { app, BrowserWindow } = require('electron');

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