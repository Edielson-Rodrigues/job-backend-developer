import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

const argumentsReviewSort = ['releaseDate', 'rating'];

export class SortReviewPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value || argumentsReviewSort.includes(value)) {
      return value;
    }
  
    throw new BadRequestException({
      message: `The value {{${value}}} is not a valid argument for the {{${metadata.data}}}`,
      data: {
        validArguments: argumentsReviewSort
      }
    });
  }
}