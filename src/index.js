const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const { exec } = require('child_process');

let installedFlatpaks = [];
let pageLoaded = false; // Add a flag to track the first load

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true,
        },
        autoHideMenuBar: true,
    });

    win.loadURL('https://flathub.org/');

    win.webContents.on('dom-ready', () => {}); //fetchInstalledFlatpaks(win.webContents); });

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
        fetchInstalledFlatpaks(win.webContents);
       
    });

    win.webContents.on('will-navigate', (event, url) => {
        if (url.endsWith('.flatpakref')) {
            event.preventDefault();
        }
    });
};

function fetchInstalledFlatpaks(webContents) {
    const scriptPath = path.join(process.resourcesPath, 'list_flatpaks.sh');
    exec(`"${scriptPath}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            webContents.send('flatpak-list-result', { success: false, message: stderr });
            return;
        }

        const flatpakList = stdout.trim().split('\n').filter(line => line);
        installedFlatpaks = flatpakList;

        webContents.send('flatpak-list-result', { success: true, flatpaks: flatpakList });
        modifyInstallButtons(webContents, flatpakList); // Call modifyInstallButtons here
        setTimeout(() => {
            fetchInstalledFlatpaks(webContents);//win.webContents.reload(); // Reload the page once
           }, 3000); // 100ms delay (adjust as needed)
    });
}

function modifyInstallButtons(webContents, flatpakList) {
    const jsCode = `
        (function(flatpakList) {
            const installButtons = document.querySelectorAll('a.hover\\\\:opacity-75.active\\\\:opacity-50.bg-flathub-celestial-blue.text-gray-100.dark\\\\:bg-flathub-celestial-blue.no-wrap.flex.h-11.items-center.justify-center.overflow-hidden.text-ellipsis.whitespace-nowrap.rounded-s-lg.px-5.py-2.text-center.font-bold.no-underline.duration-500.hover\\\\:cursor-pointer.w-full[href*=".flatpakref"]');

            installButtons.forEach(button => {
                const href = button.href;
                const appID = href.substring(href.lastIndexOf('/') + 1).replace('.flatpakref', '');

                if (flatpakList.includes(appID)) {
                    button.textContent = 'Uninstall';
                    button.addEventListener('click', (event) => {
                        event.preventDefault();
                        window.electronAPI.uninstallFlatpak(href);
                    });
                } else {
                    button.textContent = 'Install';
                    button.addEventListener('click', (event) => {
                        event.preventDefault();
                        window.electronAPI.installFlatpak(href);
                    });
                }
            });
        })(JSON.parse('${JSON.stringify(flatpakList)}'));
    `;
    webContents.executeJavaScript(jsCode);
}

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

ipcMain.on('get-installed-flatpaks', (event) => {
    event.sender.send('installed-flatpaks', installedFlatpaks);
});

ipcMain.on('check-and-modify-buttons', (event, flatpakList) => {
    event.sender.send('buttons-checked', flatpakList);
});