let browser;
let page;

async function initBrowser(launchOption) {
  const puppeteer = require('puppeteer');
  browser = await puppeteer.launch(launchOption);

  page = await browser.newPage();
  await page.setViewport({width: 1440, height: 900});
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

async function takeScreenShot(name, selector, imagePath) {
  const item = await page.$(selector);
  await item.screenshot({path: imagePath+name+'.png'});
}

async function takeScreenShots(imagePath) {
  await takeScreenShot('toolbar',
      'div.toolbar_view--toolbar--2396w', imagePath);
  await takeScreenShot('layersPanel',
      'div.left_panel--panelContainer--1OR1n', imagePath);
  await takeScreenShot('propertiesPanel',
      'div.properties_panel--panelContainer--p2KwC', imagePath);
}

async function doScreenshot(launchOption, imagePath) {
  await initBrowser(launchOption);

  await figmaLogin();
  await takeScreenShots(imagePath);

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
