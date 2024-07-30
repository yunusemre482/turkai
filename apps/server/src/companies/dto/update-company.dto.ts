import { IsEmail, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class UpdateCompanyDTO {
  @IsString()
  @IsOptional()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsPhoneNumber()
  @IsOptional()
  phone: string;

  @IsString()
  @IsOptional()
  website: string;

  @IsString()
  @IsOptional()
  description: string;
}
