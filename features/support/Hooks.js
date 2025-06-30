const {Before,AfterStep,Status} = require('@cucumber/cucumber');
const playwright = require('@playwright/test');
Before({tags: "@Regression or @Validation"},async function () {
    const browser = await playwright.chromium.launch({headless:false});
    const context = await browser.newContext();
    this.page = await context.newPage();
});

AfterStep( async function ({result}) {
  // This hook will be executed after all steps, and take a screenshot on step failure
  const date = new Date();
  const timestamp = date.getFullYear() + '-' +
                    (date.getMonth() + 1).toString().padStart(2, '0') + '-' +
                    date.getDate().toString().padStart(2, '0') + '_' +
                    date.getHours().toString().padStart(2, '0') + '-' +
                    date.getMinutes().toString().padStart(2, '0') + '-' +
                    date.getSeconds().toString().padStart(2, '0');
  if (result.status === Status.FAILED) {
    await this.page.screenshot({path:`sc${timestamp}.png`})
  }
});