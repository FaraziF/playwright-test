import { expect, type Page } from '@playwright/test';
import { isVisible } from '../../../utils/common-actions';
import { selector } from './selectors';
import { BasePage } from './basePage';
import { data } from '../../../utils/testdata';
import { endPoints } from '../../../utils/apiEndPoints';

export class CustomerPage extends BasePage {
  // readonly page: Page;

  constructor(page: Page) {
    // this.page = page;
    super(page);
  }

  async customerRegistration(): Promise<void> {
    await this.page.goto('https://farazi.staging.dokandev.com/');
    await expect(
      this.page.getByRole('searchbox', { name: 'Search...' })
    ).toBeVisible();
    await expect(this.page.getByRole('banner')).toContainText('Signup');
    await this.page.getByRole('link', { name: 'Signup' }).click();
    await expect(this.page.getByRole('main')).toContainText(
      'Create your account'
    );
    await this.page.getByPlaceholder('John', { exact: true }).click();
    await this.page.getByPlaceholder('John', { exact: true }).fill('John');
    await this.page.getByPlaceholder('Doe').click();
    await this.page.getByPlaceholder('Doe').fill('Doe');
    await this.page.getByPlaceholder('john@example.com').click();
    await this.page
      .getByPlaceholder('john@example.com')
      .fill('honben@example.com');
    await this.page.getByLabel('Password', { exact: true }).click();
    await this.page.getByPlaceholder('john@example.com').click({
      clickCount: 3,
    });
    await this.page
      .getByPlaceholder('john@example.com')
      .press('ControlOrMeta+c');
    await this.page.getByLabel('Password', { exact: true }).click();
    await this.page
      .getByLabel('Password', { exact: true })
      .fill('honben@example.comA1');
    await this.page.getByLabel('Confirm Password').click();
    await this.page.getByLabel('Confirm Password').fill('honben@example.comA1');
    await expect(
      this.page.getByRole('link', { name: 'Login Here' })
    ).toBeVisible();
    await this.page.getByRole('button', { name: 'Create Account' }).click();
    await expect(this.page.getByText('Please Login')).toBeVisible();
    await expect(
      this.page.getByRole('link', { name: 'Register Here' })
    ).toBeVisible();
    await expect(
      this.page.getByRole('button', { name: 'Sign in with Google' })
    ).toBeVisible();
    await this.page.getByPlaceholder('youremail@example.com').click();
    await this.page
      .getByPlaceholder('youremail@example.com')
      .fill('honben@example.com');
    await this.page.getByPlaceholder('Minimum 6 characters').click();
    await this.page
      .getByPlaceholder('Minimum 6 characters')
      .fill('honben@example.comA1');
    await this.page
      .getByRole('button', { name: 'Sign in', exact: true })
      .click();
    await this.page.getByText('Login Successful').click();
    await expect(
      this.page.getByRole('button', { name: 'Hello John' })
    ).toBeVisible();
    await this.page.getByRole('button', { name: 'Hello John' }).click();
    await this.page.getByRole('link', { name: 'My Account' }).click();
    await expect(
      this.page.getByRole('heading', { name: 'My Account' })
    ).toBeVisible();
    await expect(this.page.getByRole('main')).toContainText('My Account');
  }
}
