import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from "class-validator";

export class UpdateEmployeeDTO {

  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;


  @IsPhoneNumber()
  @IsOptional()
  phone: string;
}
