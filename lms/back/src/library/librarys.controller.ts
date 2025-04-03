import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateLibraryRequest } from './dto/create-library.request';
import { CurrentUser } from '../auth/current-user.decorator';
import { TokenPayload } from '../auth/token-payload.interface';
import { LibrarysService } from './librarys.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
// import { PRODUCT_IMAGES } from './library-images';

@Controller('librarys')
export class LibrarysController {
  constructor(private readonly librarysService: LibrarysService) {}

  @Post()
  async createLibrary(
    @Body() body: CreateLibraryRequest,
    @CurrentUser() user: TokenPayload,

  ) {
    return this.librarysService.createLibrary(body);
  }

  @Post(':libraryId/image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: 'public/librarys',
        filename: (req, file, callback) => {
          callback(
            null,
            `${req.params.libraryId}${extname(file.originalname)}`,
          );
        },
      }),
    }),
  )
  uploadLibraryImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 500000 }),
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    _file: Express.Multer.File,
  ) {}

  @Get()
  async getLibrarys() {
    return this.librarysService.getLibrarys();
  }
  
    @Get(':libraryId')
  async getLibrary(@Param('libraryId') libraryId: string) {
    return this.librarysService.getLibrary(+libraryId);
  }

  // @Patch(':librarysId')
  // async updateLibrary(
  //   @Param('librarysId') librarysId: string,
  //   @Body() updateLibraryDto: UpdateLibraryDto,
  // ) {
  //   return this.librarysService.updateLibrary(+librarysId, updateLibraryDto);
  // }

  @Delete(':librarysId')
  async deleteLibrary(@Param('librarysId') librarysId: string) {
    return this.librarysService.deleteLibrary(+librarysId);
  }
}

