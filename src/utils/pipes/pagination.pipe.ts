import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

const argumentsPagination = ['page', 'limit'];
const defaultValuesPagination = {
  page: 1,
  limit: 10
}

export class PaginationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const { data } = metadata;

    if (!argumentsPagination.includes(data)) {
      throw new BadRequestException({
        message: `The argument {{${data}}} is not a valid argument`
      });
    }

    if (!(/^-?\d+(\.\d+)?$/).test(value)) {
      return defaultValuesPagination[data];
    }

    const numericValue = Number(value);

    if (data === 'page' && numericValue < 1) {
      return defaultValuesPagination[data];
    }

    if (data === 'limit' && (numericValue < 1 || numericValue > 100)) {
      return defaultValuesPagination[data];
    }

    return numericValue;
  }
}