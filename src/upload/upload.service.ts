import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '../cloudnary/cloudnary.service';


@Injectable()
export class UploadService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
  ) {}
  async uploadImage(file: Express.Multer.File) {
    return this.cloudinaryService.uploadFile(
      file,
    );
  }
}
