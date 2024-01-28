const {
    app,
    BrowserWindow,
    BrowserView,
    ipcMain,
    nativeTheme,
} = require("electron/main");
const path = require("node:path");

const { PythonShell } = require("python-shell");
let mainWindow;
function createWindow() {
    startFlask();
    setTimeout(() => {
        mainWindow = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                preload: path.join(__dirname, "preload.js"),
                webSecurity: false,
                nodeIntegration: false,
                contextIsolation: true,
            },
        });
        mainWindow.loadFile("index.html");
    }, 1000);
}

ipcMain.handle("dark-mode:toggle", () => {
    if (nativeTheme.shouldUseDarkColors) {
        nativeTheme.themeSource = "light";
    } else {
        nativeTheme.themeSource = "dark";
    }
    return nativeTheme.shouldUseDarkColors;
});

ipcMain.handle("dark-mode:system", () => {
    nativeTheme.themeSource = "system";
});

// Add this event listener to handle the IPC message from the renderer process
ipcMain.on("load-web-page", () => {
    // Create a BrowserView
    const browserView = new BrowserView();
    mainWindow.setBrowserView(browserView);

    // Set the view to the entire window size
    browserView.setBounds({ x: 0, y: 0, width: 800, height: 600 });

    // Load a web page into the BrowserView
    browserView.webContents.loadURL("https://www.google.com");
});

function startFlask() {
    PythonShell.run("./backend/api.py", null).then((messages) => {
        console.log(messages);
        console.log("finished");
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
