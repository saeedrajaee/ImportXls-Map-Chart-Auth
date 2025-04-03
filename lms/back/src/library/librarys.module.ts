import { Module } from '@nestjs/common';
import { LibrarysController } from './librarys.controller';
import { LibrarysService } from './librarys.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LibrarysController],
  providers: [LibrarysService],
})
export class LibrarysModule {}
