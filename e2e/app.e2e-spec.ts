import { CinemaBookingPage } from './app.po';

describe('cinema-booking App', () => {
  let page: CinemaBookingPage;

  beforeEach(() => {
    page = new CinemaBookingPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
