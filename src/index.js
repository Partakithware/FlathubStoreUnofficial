const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const { exec } = require('child_process');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
        },
        autoHideMenuBar: true, // Added this line
    });

    win.loadURL('https://flathub.org/');

    win.webContents.on('did-finish-load', () => {
        // Inject JavaScript to handle clicks
        win.webContents.executeJavaScript(`
            document.body.addEventListener('click', (event) => {
                let target = event.target;

                while (target != null) {
                    if (target.tagName === 'A' && target.href && target.href.endsWith('.flatpakref')) {
                        console.log(\`Flatpakref link clicked: \${target.href}\`);
                        window.electronAPI.installFlatpak(target.href);
                        event.preventDefault();
                        break;
                    }
                    target = target.parentElement;
                }
            });
        `);
    });

    win.webContents.on('will-navigate', (event, url) => {
        if (url.endsWith('.flatpakref')) {
            event.preventDefault();
        }
    });
};

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

ipcMain.on('install-flatpak', (event, appUrl) => {
  console.log(`Installing: ${appUrl}`);
  const scriptPath = path.join(process.resourcesPath, 'install_flathub_app.sh');
  exec(`"${scriptPath}" "${appUrl}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      event.sender.send('install-result', { success: false, message: stderr });
      return;
    }
    console.log(`stdout: ${stdout}`);
    event.sender.send('install-result', { success: true, message: 'Installation successful' });
  });
});

ipcMain.on('uninstall-flatpak', (event, appUrl) => {
  console.log(`Uninstalling: ${appUrl}`);
  exec(`./uninstall_flathub_app.sh "${appUrl}"`, (error, stdout, stderr) => {
      if (error) {
          console.error(`exec error: ${error}`);
          event.sender.send('uninstall-result', { success: false, message: stderr });
          return;
      }
      console.log(`stdout: ${stdout}`);
      event.sender.send('uninstall-result', { success: true, message: 'Uninstall successful' });
  });
});