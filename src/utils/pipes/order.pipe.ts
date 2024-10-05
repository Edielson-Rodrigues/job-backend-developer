import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

const argumentsOrder = ['ASC', 'DESC'];

export class OrderPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value || argumentsOrder.includes(value.toUpperCase())) {
      return value?.toUpperCase();
    }

    throw new BadRequestException({
      message: `The value {{${value}}} is not a valid argument for the {{${metadata.data}}}`,
      data: {
        validArguments: argumentsOrder
      }
    });
  }
}