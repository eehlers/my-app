
const { app, BrowserWindow } = require('electron');
const path = require('path');
let mainWindow;
let pyshell;
let pyproc;

//let DEV=true;
let DEV=false;

function sendToPython_dev() {
    let { PythonShell } = require('python-shell');
    let options = {
        mode: 'text'
    };

    pyshell = new PythonShell('./py/server.py', options);
    pyshell.on('message', function (message) {
        console.log('main flask message', message);
        mainWindow.webContents.send('message', message);
    });
    pyshell.on('stderror', function (message) {
        console.log('main flask stderror', message);
        mainWindow.webContents.send('stderror', message);
    });
    console.log(pyshell.childProcess.pid);
}

function sendToPython_prod() {
    pyproc = require('child_process').execFile("dist/server/server")
    console.log("PID", pyproc.pid);
    pyproc.stdout.on('data', (data) => {
      console.log(`main flask message: ${data}`);
      mainWindow.webContents.send('message', data);
    });
    pyproc.stderr.on('data', (data) => {
      console.error(`main flask stderror: ${data}`);
      mainWindow.webContents.send('stderror', data);
    });
    pyproc.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 600,
        height: 700,
        webPreferences: {
          nodeIntegration: true
        }
    });
    mainWindow.setMenuBarVisibility(false);

    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, 'index.html'));

    // Open the DevTools.
    //mainWindow.webContents.openDevTools();

    if (DEV) {
        sendToPython_dev();
    } else {
        sendToPython_prod();
    }
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        if (DEV) {
            console.log("PID", pyshell.childProcess.pid);
            pyshell.childProcess.kill();
        } else {
            console.log("PID", pyproc.pid);
            pyproc.kill();
        }
        app.quit();
    }
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
