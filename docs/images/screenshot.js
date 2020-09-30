let browser;
let page;

const screenSize = {width: 1440, height: 1024};

async function initBrowser(launchOption) {
  const puppeteer = require('puppeteer');
  browser = await puppeteer.launch(launchOption);

  page = await browser.newPage();
  await page.setViewport(screenSize);
}

async function figmaLogin() {
  const ENV_PATH = require('path').join(__dirname, '.env');
  require('dotenv').config({path: ENV_PATH});

  await page.goto(process.env.FIGMA_FILE_URL);

  await page.type('input[name=\'email\']', process.env.FIGMA_EMAIL);
  await page.type('input[name=\'password\']', process.env.FIGMA_PASSWORD);
  await page.click('button[type=\'submit\']');

  await page.waitForNavigation({
    waitUntil: ['load', 'networkidle2'],
    timeout: 60000,
  });
  await page.waitForSelector('div.toolbar_view--toolbar--2396w');
  await page.waitForTimeout(5000); // ミリ秒
}

async function finishBrowser() {
  await browser.close();
}

async function takeScreenShot(imagePath, selector) {
  const item = await page.$(selector);
  await item.screenshot({path: imagePath});
}

function cropHeightOneThird(imagePath) {
  const Jimp = require('jimp');
  Jimp.read(imagePath, (err, image) => {
    if (err) {
      throw err;
    }
    image.crop(0, 0, image.bitmap.width, image.bitmap.height/3)
        .write(imagePath);
  });
}

async function takeScreenShots(imageDir) {
  // toolbar
  await takeScreenShot(imageDir+'toolbar.png',
      'div.toolbar_view--toolbar--2396w');

  // layersPanel
  const layersPanelPath = imageDir+'layersPanel.png';
  await takeScreenShot(layersPanelPath,
      'div.left_panel--panelContainer--1OR1n');
  cropHeightOneThird(layersPanelPath);

  // propertiesPanel
  const propertiesPanelPath = imageDir+'propertiesPanel.png';
  await takeScreenShot(propertiesPanelPath,
      'div.properties_panel--panelContainer--p2KwC');
  cropHeightOneThird(propertiesPanelPath);
}

async function doScreenshot(launchOption, imageDir) {
  await initBrowser(launchOption);

  await figmaLogin();
  await takeScreenShots(imageDir);

  await finishBrowser();
}

(async () => {
  // English
  await doScreenshot({}, './images/screenshot/');

  // 日本語拡張 使用時
  // https://pptr.dev/#?product=Puppeteer&version=v5.3.0&show=api-working-with-chrome-extensions
  const pathToExtension = require('path').join(
      __dirname, './figma_jp-master');
  await doScreenshot(
      {
        headless: false,
        args: [
          `--disable-extensions-except=${pathToExtension}`,
          `--load-extension=${pathToExtension}`,
        ],
      }, './images/screenshot/ja/');
})();
