import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  handleCounter: (callback) => ipcRenderer.on('update-counter', callback),
  handleButtonClick: (buttonId, callback) => ipcRenderer.on(`button-click-${buttonId}`, callback),
  updateInputField: (value) => ipcRenderer.send('update-input', value),
});
