import { test, after, before } from 'node:test';
import assert from 'node:assert/strict';
import { createDriver, getBaseUrl, By, until } from './helpers.js';

let driver;

before(async () => {
  driver = await createDriver();
});

after(async () => {
  if (driver) {
    await driver.quit();
  }
});

test('страница открывается и отображается заголовок формы', async () => {
  await driver.get(getBaseUrl());
  const title = await driver.wait(until.elementLocated(By.id('form-title')), 5000);
  const text = await title.getText();
  assert.equal(text, 'Форма обратной связи');
});

test('форма содержит поля имя, email и сообщение', async () => {
  await driver.get(getBaseUrl());
  await driver.wait(until.elementLocated(By.id('contact-form')), 5000);

  assert.ok(await driver.findElement(By.id('name-input')));
  assert.ok(await driver.findElement(By.id('email-input')));
  assert.ok(await driver.findElement(By.id('message-input')));
});

test('кнопка отправки имеет текст «Отправить»', async () => {
  await driver.get(getBaseUrl());
  const button = await driver.wait(until.elementLocated(By.id('submit-btn')), 5000);
  const text = await button.getText();
  assert.equal(text, 'Отправить');
});

test('успешная отправка заполненной формы показывает сообщение об успехе', async () => {
  await driver.get(getBaseUrl());
  await driver.wait(until.elementLocated(By.id('contact-form')), 5000);

  await driver.findElement(By.id('name-input')).sendKeys('Иван');
  await driver.findElement(By.id('email-input')).sendKeys('ivan@test.ru');
  await driver.findElement(By.id('message-input')).sendKeys('Тестовое сообщение');
  await driver.findElement(By.id('submit-btn')).click();

  const success = await driver.wait(until.elementLocated(By.id('success-message')), 5000);
  const text = await success.getText();
  assert.match(text, /отправлено/i);
});
