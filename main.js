const electron = require('electron');
const { app, BrowserWindow } = electron;
const { PythonShell } = require('python-shell');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true // Enable Node.js integration
    }
  });

  // Launch your Python GUI application using PythonShell
  let options = {
    mode: 'text',
    pythonPath: 'python3', // Replace with the path to your Python interpreter
    scriptPath: './/Users/mario/Desktop/chatbot-gui/magic_mirror/MagicMirror/modules/MMM-PythonPrint/app.py', // Replace with the path to your Python GUI application script
    args: [] // Optional arguments to pass to your Python script
  };

  PythonShell.run('app.py', options, function (err, results) {
    if (err) throw err;
    console.log('Python GUI application finished.');
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Hide the default menu bar
  mainWindow.setMenu(null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
