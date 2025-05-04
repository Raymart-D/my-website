const { app, BrowserWindow, screen, globalShortcut, ipcMain } = require('electron');
const path = require('path');

let mainWindow;
app.allowExit = false; // Initialize the allowExit flag

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    fullscreen: true,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  mainWindow.loadFile('index.html');

  // Prevent closing the app unless allowExit is true
  mainWindow.on('close', (e) => {
    if (!app.allowExit) {
      e.preventDefault(); // Prevent the default close behavior
    }
  });
}

app.whenReady().then(() => {
  createWindow();

  // Disable common shortcuts like Alt+F4 or Ctrl+W
  globalShortcut.register('Alt+F4', () => {});
  globalShortcut.register('CommandOrControl+W', () => {});
});

app.on('window-all-closed', function () {
  // Do not quit the app when all windows are closed
});

ipcMain.on('exit-app', () => {
  console.log('Exit event received'); // Debugging log
  app.allowExit = true;
  app.quit();
});
