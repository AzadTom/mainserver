import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { v2 as cloudinaryClient, type UploadApiResponse } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor(
    @Inject('CLOUDINARY')
    private readonly cloudinary: typeof cloudinaryClient,
  ) {}

  private toError(error: unknown, fallbackMessage: string): Error {
    if (error instanceof Error) {
      return error;
    }

    if (typeof error === 'string' && error.trim()) {
      return new Error(error);
    }

    if (
      error &&
      typeof error === 'object' &&
      'message' in error &&
      typeof (error as { message?: unknown }).message === 'string'
    ) {
      return new Error((error as { message: string }).message);
    }

    return new Error(fallbackMessage);
  }

  uploadFile(file: Express.Multer.File): Promise<UploadApiResponse> {
    if (!file.buffer) {
      throw new Error('Cloudinary upload expects an in-memory file buffer.');
    }

    return new Promise<UploadApiResponse>((resolve, reject) => {
      this.cloudinary.uploader
        .upload_stream(
          {
            folder: 'editorjs-images',
          },
          (error, result) => {
            if (error) {
              reject(this.toError(error, 'Cloudinary upload failed.'));
            } else if (!result) {
              reject(new Error('Cloudinary returned an empty upload response.'));
            } else {
              resolve(result);
            }
          },
        )
        .end(file.buffer);
    });
  }
}
