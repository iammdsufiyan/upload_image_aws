// import { Body, Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// @Injectable()
// export class UploadService {
//     private readonly s3Client = new S3Client({
//         region:this.configservice.getOrThrow('AWS_S3_REGION'),
//     })
//     constructor (private readonly configservice:ConfigService){}

//     async upload(fileName:string, file:Buffer){
//         await this.s3Client.send({
//             new PutObjectCommand({
//                 Bucket:'nestjsupload-image',
//                 Key:fileName,
//                 Body:file,
//             })
//         })
//     }
// }

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

@Injectable()
export class UploadService {
  private readonly s3Client: S3Client;

  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.getOrThrow('AWS_S3_REGION'),
    });
  }

  async upload(fileName: string, file: Buffer) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'nestjsupload-image',
        Key: fileName,
        Body: file,
      }),
    );
  }
}
