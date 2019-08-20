import {CustomTranslateLoader} from './custom.translate.loader';
import {TranslationService} from './translation.service';
import {of} from 'rxjs';
import {Translation} from './translation';
import SpyObj = jasmine.SpyObj;

describe('Loads the translations from the translate service', () => {

  function mockTranslateService(expectedTranslation: Translation) {
    const translationServiceMock: SpyObj<TranslationService> = jasmine.createSpyObj<TranslationService>('translationServiceMock', ['getTranslation']);
    translationServiceMock.getTranslation.and.returnValue(of(expectedTranslation));
    return translationServiceMock;
  }

  it('test', () => {
    const expectedTranslation = {};
    const uniqueKey = '1234-5678-3456-2123';
    expectedTranslation[uniqueKey] = 'my.expected.translation';

    const translationServiceMock = mockTranslateService(expectedTranslation);

    const customTranslateLoader: CustomTranslateLoader = CustomTranslateLoader.of(translationServiceMock);
    customTranslateLoader.getTranslation(uniqueKey).subscribe(translation => {
        expect(translation).toEqual(expectedTranslation);
      }
    );
  });
});
