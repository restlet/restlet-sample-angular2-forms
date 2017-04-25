import { AppTestPage } from './app.po';

describe('app-test App', () => {
  let page: AppTestPage;

  beforeEach(() => {
    page = new AppTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
