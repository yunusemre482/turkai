
import { IsEnum } from 'class-validator';
import { MediaType } from '../enums/medi-type.enum';
import { AccessType } from '../enums/file-access.num';


export class UploadFileRequestDTO {

  @IsEnum(MediaType)
  mediaType: MediaType;

  @IsEnum(AccessType)
  accessType: AccessType;
}
