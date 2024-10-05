import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

const argumentsFilterReview = ['title', 'actor', 'director'];

export class FilterReviewPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value || argumentsFilterReview.includes(value)) {
      return value;
    }

    throw new BadRequestException({
      message: `The value {{${value}}} is not a valid argument for the {{${metadata.data}}}`,
      data: {
        validArguments: argumentsFilterReview
      }
    });
  }
}