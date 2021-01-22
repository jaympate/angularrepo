import { TranslationService } from './translation.service';
import { CustomTranslateLoader } from './custom.translate.loader';

export function CustomTranslateLoaderFactory(
  translationService: TranslationService
) {
  return CustomTranslateLoader.of(translationService);
}
