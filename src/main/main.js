const { app, BrowserWindow } = require('electron');
const path = require('path');
const { server } = require('../server/server.js');
const landing_page_path = path.join(__dirname, '../public/index.html');

const createWindow = () => {
    const window = new BrowserWindow({
        width: 1200,
        height: 675
    });
    window.loadURL("http://localhost:3000");

}
const createServer = () => {
    server.listen(3000, () => {
       console.log("Express Listening on 3000");
    });
}
app.whenReady().then(() => {
    createServer();
    createWindow();
});

app.on('certificate-error', function(event, webContents, url, error,certificate, callback) {
    event.preventDefault();
    callback(true);
});