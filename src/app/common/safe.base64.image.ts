import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'safeBase64Image'
})
export class SafeBase64Image implements PipeTransform {

  constructor(protected sanitizer: DomSanitizer) {
  }

  public transform(image: string): SafeResourceUrl {
      return this.sanitizer.bypassSecurityTrustResourceUrl(image);
  }
}
