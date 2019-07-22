import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable()
export class UploadFileService {

  FOLDER: string;
  relPath: string;
  constructor() { }

  getDataLocation():string{
    return this.relPath;
  }
  uploadfile(file) {
    
    console.log("uploading"+file.name)
    console.log(file)
    this.FOLDER=Math.random().toString(36).substring(2, 15)+"/"
    this.relPath=this.FOLDER + file.name.replace(' ', '')
    const bucket = new S3(
      {
        accessKeyId: 'AKIAY4PLP5GVV4LV457G',
        secretAccessKey: 'TrRAbTsT7cvdM27qhdoyJ2xpZbLR11OSZBXJ2+xZ',
        region: 'us-east-2'
      }
    );

    const params = {
      Bucket: 'howchow-angular-bucket',
      Key: this.relPath,
      Body: file,
      ACL: 'public-read',
    };



    bucket.upload(params, function (err, data) {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return 'error';
      }

      console.log('Successfully uploaded file.', data);
      console.log(data.Location)
      window.sessionStorage.setItem('imgUrl', data.Location);

    });
  }



}

