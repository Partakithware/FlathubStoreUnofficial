const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    installFlatpak: (appUrl) => ipcRenderer.send('install-flatpak', appUrl),
    uninstallFlatpak: (appUrl) => ipcRenderer.send('uninstall-flatpak', appUrl), // Added
    onFlatpakrefLinkClick: (callback) => ipcRenderer.on('flatpakref-link-clicked', callback),
    onInstallResult: (callback) => ipcRenderer.on('install-result', callback),
    onUninstallResult: (callback) => ipcRenderer.on('uninstall-result', callback), //added
    flatpakListResult: (callback) => ipcRenderer.on('flatpak-list-result', callback),
    getInstalledFlatpaks: () => ipcRenderer.send('get-installed-flatpaks'),
    installedFlatpaks: (callback) => ipcRenderer.on('installed-flatpaks', callback),
    checkAndModifyButtons: (flatpakList) => ipcRenderer.send('check-and-modify-buttons', flatpakList),
});