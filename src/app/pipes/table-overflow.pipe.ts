import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableOverflow'
})
export class TableOverflowPipe implements PipeTransform {

  transform(value: string, maxLength: number = 10): string {
    return value.length > maxLength ? value.substr(0, maxLength) + '...' : value;
  }

}
