const { app, BrowserWindow } = require('electron');
const path = require('path');
const landing_page_path = path.join(__dirname, '../public/index.html');

const createWindow = () => {
    const window = new BrowserWindow({
        width: 800,
        height: 600
    });
    window.loadFile(landing_page_path);
}

app.whenReady().then(() => {
    createWindow();

});