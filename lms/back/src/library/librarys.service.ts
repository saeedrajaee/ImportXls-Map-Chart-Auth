import { promises as fs } from 'fs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLibraryRequest } from './dto/create-library.request';
import { PrismaService } from '../prisma/prisma.service';
import { join } from 'path';
// import { PRODUCT_IMAGES } from './library-images';

@Injectable()
export class LibrarysService {
  constructor(private readonly prismaService: PrismaService) {}

  async createLibrary(data: CreateLibraryRequest) {
    return this.prismaService.library.create({
      data: {
        ...data
      },
    });
  }

  async getLibrarys() {
    const librarys = await this.prismaService.library.findMany();
    return Promise.all(
      librarys.map(async (library) => ({
        ...library,
        imageExists: await this.imageExists(library.id),
      })),
    );
  }

  private async imageExists(libraryId: number) {
    try {
      await fs.access(
        join(__dirname, '../../', `public/librarys/${libraryId}.jpg`),
        fs.constants.F_OK,
      );
      return true;
    } catch (err) {
      return false;
    }
  }
  
    async getLibrary(libraryId: number) {
    try {
      return {
        ...(await this.prismaService.library.findUniqueOrThrow({
          where: { id: libraryId },
        })),
      };
    } catch (err) {
      throw new NotFoundException(`Librarys not found with ID ${libraryId}`);
    }
  }
  // async updateLibrary(id: number, updateLibraryDto: UpdateLibraryDto) {
  //     return this.prismaService.library.update({
  //       where: { id },
  //       data: {
  //         ...updateLibraryDto,
  //       },
  //     });
  //   }

  async deleteLibrary(id: number) {
    return this.prismaService.library.delete({
      where: { id },
    });
  }
}
