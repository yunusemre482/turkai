import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';


@Injectable()
export class ValidateUUID implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const isValid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(value);

    if (!isValid) {
      throw new BadRequestException('Invalid UUID');
    }
    return value;
  }
}
