import { Pipe, PipeTransform } from '@angular/core';

// noinspection AngularMissingOrInvalidDeclarationInModule
@Pipe({
  name: 'translate'
})
export class TranslatePipeMock implements PipeTransform {
  transform(value: string): string {
    return `${value}.translated`;
  }
}
