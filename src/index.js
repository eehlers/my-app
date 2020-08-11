
const { app, BrowserWindow } = require('electron');
const path = require('path');
let mainWindow;
let pyshell;

function sendToPython_dev() {
    let { PythonShell } = require('python-shell');
    let options = {
        mode: 'text'
    };

    pyshell = new PythonShell('./py/server.py', options);
    pyshell.on('message', function (message) {
        console.log('flask', message);
        mainWindow.webContents.send('message', message);
    });
    pyshell.on('stderror', function (message) {
        console.log('flask error', message);
        mainWindow.webContents.send('stderror', message);
    });
    console.log(pyshell.childProcess.pid);
}

//function sendToPython_prod() {
//    pyProc = require('child_process').execFile("dist/server/server")
//    if (pyProc != null) {
//        //console.log(pyProc)
//        //console.log('child process success on port ' + port)
//        console.log('child process success')
//    }
//}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

    sendToPython_dev();
    //sendToPython_prod();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    console.log("000 window-all-closed");
  if (process.platform !== 'darwin') {
    console.log("100 window-all-closed");
    pyshell.childProcess.kill();
    console.log("110 window-all-closed");
    app.quit();
  }
    console.log("900 window-all-closed");
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
