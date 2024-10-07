import { IPaginationMeta } from "nestjs-typeorm-paginate";
import { DataReviewResponseDTO, DataViewReviewResponseDTO } from "./review-response.dto";
import { ApiProperty } from "@nestjs/swagger";
import { IApiResponse } from "src/utils/api-response.interface";

export class PaginationReviewResponseDTO implements IApiResponse {
  @ApiProperty({
    description: 'Message of the response',
    type: String,
    example: 'Reviews found successfully'
  })
  message: string;

  @ApiProperty({
    description: 'Meta of the response',
    type: Object,
    example: {
      itemCount: 1,
      totalItems: 1,
      itemsPerPage: 10,
      totalPages: 1,
      currentPage: 1
    }
  })
  meta: IPaginationMeta;

  @ApiProperty({
    description: 'Data of the response',
    type: () => [DataReviewResponseDTO]
  })
  data: DataReviewResponseDTO[];

  constructor(props: any) {
    Object.assign(this, props);
  }
}

export class PaginationViewReviewResponseDTO implements IApiResponse {
  @ApiProperty({
    description: 'Message of the response',
    type: String,
    example: 'Reviews found successfully'
  })
  message: string;

  @ApiProperty({
    description: 'Meta of the response',
    type: Object,
    example: {
      itemCount: 1,
      totalItems: 1,
      itemsPerPage: 10,
      totalPages: 1,
      currentPage: 1
    }
  })
  meta: IPaginationMeta;

  @ApiProperty({
    description: 'Data of the response',
    type: () => [DataViewReviewResponseDTO]
  })
  data: DataViewReviewResponseDTO[];

  constructor(props: any) {
    Object.assign(this, props);
  }
}