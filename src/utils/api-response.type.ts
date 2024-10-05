import { HttpStatus } from "@nestjs/common"

export type ApiResponse = {
  status: HttpStatus;
  message: string;
  data?: any;
}