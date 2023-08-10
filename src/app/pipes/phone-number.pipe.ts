import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }

    // Assuming the input value is a 10-digit number
    const formattedNumber = value.replace(/(\d{4})(\d{3})(\d{3})/, '$1-$2-$3');
    return formattedNumber;
  }

}
