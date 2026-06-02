import {
    BadRequestException,
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { UploadService } from './upload.service';


@Controller('upload')
export class UploadController {
    constructor(
        private readonly uploadService: UploadService,
    ) { }

    @Post('image')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: memoryStorage(),
        }),
    )
    async uploadImage(
        @UploadedFile() file?: Express.Multer.File,
    ) {
        if (!file) {
            throw new BadRequestException('Image file is required.');
        }

        const result: any =
            await this.uploadService.uploadImage(file);

        return {
            success: 1,
            file: {
                url: result?.secure_url,
            },
        };
    }
}
