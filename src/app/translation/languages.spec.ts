import {Languages} from './languages';

describe('Languages', () => {
  it('supported languages cannot be empty', () => {
    expect(() => Languages.from('en', [])).toThrow(new Error('Invalid argument exception: Supported languages cannot be empty.'));
  });

  it('the current language needs to be present in the supported languages', () => {
    expect(() => Languages.from('en', ['ch', 'fr'])).toThrow(new Error('Invalid argument exception: Supported languages should include the current language.'));
  });

  it('correctly initialises the current language', () => {
    const currentAndOtherLanguage = Languages.from('en', ['fr', 'en', 'ch']);

    expect(currentAndOtherLanguage.current).toEqual('en');
  });

  it('if the supported languages array only contains the current language, the other languages array will be empty', () => {
    const supportedLanguages = ['en'];
    const currentAndOtherLanguage = Languages.from('en', supportedLanguages);

    expect(currentAndOtherLanguage.other).toEqual([]);
  });

  it('the other languages will be the supported languages without the current language', () => {
    const supportedLanguages = ['en', 'fr', 'ch', 'nl'];
    const currentAndOtherLanguage = Languages.from('en', supportedLanguages);

    expect(currentAndOtherLanguage.other).toEqual(['fr', 'ch', 'nl']);
  });
});
