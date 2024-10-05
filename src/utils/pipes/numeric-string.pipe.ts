import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class NumericStringPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if ((/^-?\d+(\.\d+)?$/).test(value)) {
      return Number(value);
    }

    throw new BadRequestException({
      message: `The value {{${metadata.data}}} is not a number`
    });
  }
}