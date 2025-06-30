import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/');
  await page.getByRole('combobox', { name: 'Search' }).click();
  await page.getByRole('combobox', { name: 'Search' }).fill('rahulshetty academy');
  await page.getByRole('combobox', { name: 'Search' }).press('Enter');
 /*await page.goto('https://www.google.com/sorry/index?continue=https://www.google.com/search%3Fq%3Drahulshetty%2Bacademy%26sca_esv%3D896bc82726dbc1e3%26source%3Dhp%26ei%3DoNscaI2nIqHi0PEP_MTE8AQ%26iflsig%3DACkRmUkAAAAAaBzpsOv-wXq_ALk7fyyItKZF4Csgfm9a%26ved%3D0ahUKEwiN9_qxpZSNAxUhMTQIHXwiEU4Q4dUDCA8%26uact%3D5%26oq%3Drahulshetty%2Bacademy%26gs_lp%3DEgdnd3Mtd2l6IhNyYWh1bHNoZXR0eSBhY2FkZW15MgcQABiABBgKMgUQABiABDIFEAAYgAQyBxAAGIAEGAoyBRAAGIAEMgUQABiABDIIEAAYgAQYogQyCBAAGIAEGKIEMgUQABjvBUjmXlDwEVihXHABeACQAQCYAWGgAYsJqgECMTm4AQPIAQD4AQGYAhSgAt8JqAIKwgIKEAAYAxjqAhiPAcICChAuGAMY6gIYjwHCAgsQABiABBixAxiDAcICCBAAGIAEGLEDwgIREC4YgAQYsQMY0QMYgwEYxwHCAgsQLhiABBixAxiDAcICCxAuGIAEGNEDGMcBwgIOEC4YgAQYsQMYgwEYigXCAggQLhiABBixA8ICDhAuGIAEGLEDGNEDGMcBwgIOEC4YgAQYxwEYjgUYrwHCAgUQLhiABMICBBAAGAPCAg4QLhiABBixAxiDARjUAsICCxAuGIAEGMcBGK8BwgIQEC4YgAQYxwEYChiOBRivAcICBxAuGIAEGArCAggQABiiBBiJBcICCxAAGIAEGIYDGIoFmAMG8QWzgCfuIjdWsZIHBDE5LjGgB7u_AbIHBDE4LjG4B9kJwgcGMC42LjE0yAdG%26sclient%3Dgws-wiz%26sei%3DrtscaLfJLovn5NoP3bfumQs&q=EhAmAEgJgFFxALmOBwa3AmSEGK6388AGIjDC4yS2GYJTCQfWVGttnsaBmitzINCaMREWmEUOR6o7KGeGcfPAjnVIwWJcyHxwgPgyAnJSWgFD');
 await page.locator('iframe[name="a-8m4gnsi3usuz"]').contentFrame().getByRole('checkbox', { name: 'I\'m not a robot' }).click();
  await page.locator('iframe[name="c-8m4gnsi3usuz"]').contentFrame().locator('tr:nth-child(3) > td').first().click();
  await page.locator('iframe[name="c-8m4gnsi3usuz"]').contentFrame().locator('tr:nth-child(4) > td:nth-child(2)').click();
  await page.locator('iframe[name="c-8m4gnsi3usuz"]').contentFrame().locator('tr:nth-child(3) > td:nth-child(2)').click();
  await page.locator('iframe[name="c-8m4gnsi3usuz"]').contentFrame().locator('tr:nth-child(4) > td').first().click();
  await page.locator('iframe[name="c-8m4gnsi3usuz"]').contentFrame().getByRole('button', { name: 'Next' }).click();
  await page.locator('iframe[name="c-8m4gnsi3usuz"]').contentFrame().locator('tr:nth-child(2) > td').first().click();
  await page.locator('iframe[name="c-8m4gnsi3usuz"]').contentFrame().locator('tr:nth-child(4) > td:nth-child(2)').click();
  await page.locator('iframe[name="c-8m4gnsi3usuz"]').contentFrame().locator('tr:nth-child(3) > td').first().click();
  await page.locator('iframe[name="c-8m4gnsi3usuz"]').contentFrame().locator('tr:nth-child(3) > td:nth-child(3)').click();
  await page.locator('iframe[name="c-8m4gnsi3usuz"]').contentFrame().locator('tr:nth-child(4) > td:nth-child(3)').click();
  await page.locator('iframe[name="c-8m4gnsi3usuz"]').contentFrame().locator('tr:nth-child(4) > td:nth-child(4)').click();
  await page.locator('iframe[name="c-8m4gnsi3usuz"]').contentFrame().locator('tr:nth-child(3) > td:nth-child(4)').click();
  await page.locator('iframe[name="c-8m4gnsi3usuz"]').contentFrame().getByRole('button', { name: 'Verify' }).click();
  await page.locator('iframe[name="c-8m4gnsi3usuz"]').contentFrame().locator('tr:nth-child(4) > td:nth-child(3)').click();
  await page.locator('iframe[name="c-8m4gnsi3usuz"]').contentFrame().locator('tr:nth-child(3) > td:nth-child(3)').click();
  await page.locator('iframe[name="c-8m4gnsi3usuz"]').contentFrame().locator('tr:nth-child(2) > td:nth-child(4)').click();
  await page.locator('iframe[name="c-8m4gnsi3usuz"]').contentFrame().locator('tr:nth-child(3) > td:nth-child(4)').click();
  await page.locator('iframe[name="c-8m4gnsi3usuz"]').contentFrame().locator('div').filter({ hasText: /^Verify$/ }).nth(2).click();
  await page.locator('iframe[name="c-8m4gnsi3usuz"]').contentFrame().getByRole('button', { name: 'Verify' }).click();*/
  await page.getByRole('link', { name: 'Rahul Shetty Academy:' }).click();
  await page.getByRole('link', { name: 'Mentorship' }).nth(1).click();
  await expect(page.locator('body')).toContainText('Mentorship');
  await expect(page.getByRole('navigation')).toContainText('Learning paths');
});