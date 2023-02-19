import { test, expect } from '@playwright/test';

const url = 'http://localhost:5173/';

// test are based on the goals provided in the requirements pdf.

test('it sends the valid form data to a result page that displays inputs', async ({ page }) => {
  await page.goto(url);

  await expect(page.getByRole('button', { name: 'Submit' })).toBeDisabled();

  await page.locator('input[name="firstName"]').click();
  await page.locator('input[name="firstName"]').fill('custom.name John');
  await page.locator('input[name="lastName"]').click();
  await page.locator('input[name="lastName"]').fill('Doe');
  await page.locator('input[name="address"]').click();
  await page.locator('input[name="address"]').fill('Night City');
  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('john@test.com');

  await expect(page.getByRole('button', { name: 'Submit' })).toBeEnabled();
  await page.getByRole('button', { name: 'Submit' }).click();

  await expect(page.getByRole('heading', { name: 'Form Submitted!' })).toBeVisible();
  await expect(page.getByText('custom.name John')).toBeVisible();
  await expect(page.getByText('Doe')).toBeVisible();
  await expect(page.getByText('Night City')).toBeVisible();
  await expect(page.getByText('john@test.com')).toBeVisible();
});

test('validations for controlled component first name', async ({ page }) => {
  await page.goto(url);

  await page.locator('input[name="firstName"]').click();
  await page.locator('input[name="firstName"]').fill('t');

  await expect(page.getByText('Minimum length is 2')).toBeVisible();

  await page.locator('input[name="firstName"]').fill('');
  await page.locator('input[name="firstName"]').fill('test');

  await expect(page.getByText('name should start with custom.name')).toBeVisible();

  await page.locator('input[name="firstName"]').fill('');
  await page.locator('input[name="firstName"]').fill('custom.name Test');

  await expect(page.getByText('name should start with custom.name')).toBeHidden();
});

test('validations for controlled component last name', async ({ page }) => {
  await page.goto(url);

  await page.locator('input[name="lastName"]').click();
  await page.locator('input[name="lastName"]').fill('t');

  await expect(page.getByText('Minimum length is 2')).toBeVisible();

  await page.locator('input[name="lastName"]').fill('');
  await page.locator('input[name="lastName"]').fill('test');

  await expect(page.getByText('Minimum length is 2')).toBeHidden();
});

test('validations for uncontrolled component address', async ({ page }) => {
  await page.goto(url);

  await page.locator('input[name="address"]').click();
  await page.locator('input[name="address"]').fill('t');

  await expect(page.getByText('Minimum length is 2')).toBeHidden();

  await page.locator('input[name="address"]').blur();

  await expect(page.getByText('Minimum length is 2')).toBeVisible();
});

test('validations for controlled component email', async ({ page }) => {
  await page.goto(url);

  await page.locator('input[name="email"]').click();
  await page.locator('input[name="email"]').fill('t');

  await expect(page.getByText('Minimum length is 2')).toBeVisible();

  await page.locator('input[name="email"]').fill('');
  await page.locator('input[name="email"]').fill('test');

  await expect(page.getByText('Minimum length is 2')).toBeHidden();
  await expect(page.getByText('Not an email')).toBeVisible();

  await page.locator('input[name="email"]').fill('');
  await page.locator('input[name="email"]').fill('test@test.com');

  await expect(page.getByText('Not an email')).toBeHidden();
});

test('display derived value from first name and last name ', async ({ page }) => {
  await page.goto(url);

  await expect(page.locator('input[id="injectField"]')).toHaveValue('');

  await page.locator('input[name="firstName"]').click();
  await page.locator('input[name="firstName"]').fill('custom.name John');

  await page.locator('input[name="lastName"]').click();
  await page.locator('input[name="lastName"]').fill('Doe');

  await expect(page.locator('input[id="injectField"]')).toHaveValue('custom.name John Doe');
});