import { Expose, Transform } from "class-transformer";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";

export class FilterAndPaginationDTO {

  @IsString()
  @Transform(({ value }) => value || '')
  @IsOptional()
  filter: string = "";

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10) || 1)
  page: number = 1;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10) || 15)
  limit: number = 15;

  @IsEnum(['id', 'createdAt', 'updatedAt'])
  @Transform(({ value }) => value || 'createdAt')
  @IsOptional()
  sort: string = 'createdAt';

  @IsString()
  @IsEnum(['asc', 'desc'])
  @Transform(({ value }) => value.toUpperCase() || 'desc')
  @IsOptional()
  order: string = 'desc';

  @Expose()
  get skip() {
    const page = this.page || 1;
    const offset = this.limit || 10;

    return (page - 1) * offset;
  }
}
