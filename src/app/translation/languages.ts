export class Languages {
  readonly current: string;
  readonly other: string[];

  private constructor(currentLanguage: string, supportedLanguages: string[]) {
    this.current = currentLanguage;
    this.other = supportedLanguages.filter(
      (supportedLanguage) => supportedLanguage !== currentLanguage
    );
  }

  static from(
    currentLanguage: string,
    supportedLanguages: string[]
  ): Languages {
    Languages.assertNotEmpty(supportedLanguages);
    Languages.assertIncludes(supportedLanguages, currentLanguage);
    return new Languages(currentLanguage, supportedLanguages);
  }

  private static assertNotEmpty(supportedLanguages: string[]) {
    if (supportedLanguages.length === 0) {
      throw new Error(
        'Invalid argument exception: Supported languages cannot be empty.'
      );
    }
  }

  private static assertIncludes(
    supportedLanguages: string[],
    currentLanguage: string
  ) {
    if (!supportedLanguages.includes(currentLanguage)) {
      throw new Error(
        'Invalid argument exception: Supported languages should include the current language.'
      );
    }
  }
}
