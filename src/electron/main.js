const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;
let javaProcess;

function createWindow() {

    // START JAVA BACKEND
    javaProcess = spawn('java', [
        '-jar',
        path.join(__dirname, '../backend-java/target/worksight-app.jar')
    ]);

    javaProcess.stdout.on('data', (data) => {
        console.log(`Java: ${data}`);
    });

    javaProcess.stderr.on('data', (data) => {
        console.error(`Java Error: ${data}`);
    });

    // CREATE ELECTRON WINDOW
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        webPreferences: {
            nodeIntegration: false
        }
    });

    // LOAD REACT
    mainWindow.loadURL('http://localhost:5173');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {

    // CLOSE JAVA PROCESS
    if (javaProcess) {
        javaProcess.kill();
    }

    if (process.platform !== 'darwin') {
        app.quit();
    }
});