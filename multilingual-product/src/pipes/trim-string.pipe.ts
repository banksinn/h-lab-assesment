import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class TrimStringPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value === 'string') {
      return value.trim();
    } else if (value && typeof value === 'object') {
      return this.trimObjectStrings(value);
    }
    return value;
  }

  private trimObjectStrings(obj: any): any {
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        obj[key] = obj[key].trim();
      } else if (Buffer.isBuffer(obj[key])) {
        continue;
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        obj[key] = this.trimObjectStrings(obj[key]);
      }
    }
    return obj;
  }
}
