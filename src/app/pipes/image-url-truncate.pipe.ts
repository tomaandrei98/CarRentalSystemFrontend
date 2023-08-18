import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageUrlTruncate'
})
export class ImageUrlTruncatePipe implements PipeTransform {

  transform(value: string, maxLength: number = 20): string {
    if (!value) {
      return ''
    }

    return value.length > maxLength ? value.substr(0, maxLength) + '...' : value;
  }

}
