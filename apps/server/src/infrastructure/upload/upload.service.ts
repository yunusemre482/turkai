import { Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { UploadedFile } from './interfaces/uploaded-file.interface';
import { BucketName } from './enums/bucket-name.enuım';


@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name);
  private s3: S3;
  private static readonly OBJECT_REACH_EXPIRATION_TIME = 60; // 7 days

  constructor(
    private readonly configService: ConfigService
  ) {
    const NODE_ENV = this.configService.get<string>('NODE_ENV');

    const OPTIONS = {
      accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      region: this.configService.get<string>('AWS_REGION')
    };

    if (NODE_ENV === 'development') {
      Object.assign(OPTIONS, {
        endpoint: this.configService.get<string>('AWS_S3_ENDPOINT'),
        s3ForcePathStyle: true,
        signatureVersion: 'v4'
      });

    }

    this.logger.debug(OPTIONS, 'OPTIONS');

    this.s3 = new S3(OPTIONS);
  }


  async uploadS3(file: Buffer, bucket: string, name: string): Promise<UploadedFile> {

    return await this.s3
      .upload({
        Bucket: bucket,
        Key: name,
        Body: file
      })
      .promise();
  }

  async uploadFromBase64(file: File, bucket: BucketName) {
    return await this.s3
      .upload({
        Bucket: bucket,
        Key: `/images/${randomUUID()}.jpg`,
        Body: file,
        ContentEncoding: 'base64',
        ContentType: 'image/jpeg'
      })
      .promise();
  }

  public async deleteFile(location: string, bucket: BucketName) {
    let fileKey: string | undefined = decodeURI(location);
    const datas = fileKey.split('amazonaws.com/');
    fileKey = datas.pop();

    if (!fileKey) return;

    await this.s3
      .deleteObject({
        Bucket: bucket,
        Key: fileKey
      })
      .promise();
  }

  async getSignedURL(bucketName: string, fileName: string) {
    return this.s3.getSignedUrl('getObject', {
      Bucket: bucketName,
      Key: fileName,
      Expires: UploadService.OBJECT_REACH_EXPIRATION_TIME
    });
  }

}
