import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class CreateEmployeeDTO {


  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;


  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  companyId: string;
}


export class CreateEmployeeForAdminDTO extends CreateEmployeeDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

}
