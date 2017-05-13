import { RogueLikePage } from './app.po';

describe('rogue-like App', () => {
  let page: RogueLikePage;

  beforeEach(() => {
    page = new RogueLikePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
