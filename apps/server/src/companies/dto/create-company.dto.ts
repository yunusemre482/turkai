import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsUrl } from "class-validator";

export class CreateCompanyDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsUrl()
  logo: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  website: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
