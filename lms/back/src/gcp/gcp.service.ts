import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGcpRequest } from './dto/create-gcp.request';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateGcpDto } from './dto/update-gcp.request';

@Injectable()
export class GcpService {
  constructor(private readonly prismaService: PrismaService) {}

  async createGcp(data: CreateGcpRequest) {
    return this.prismaService.gcp.create({
      data: {
        ...data 
      },
    });
  }

  async getGcps() {
    const gcp= await this.prismaService.gcp.findMany();
    return Promise.all(
      gcp.map(async (gcp) => ({
        ...gcp,
      })),
    );
  }

  async getGcp(gcpId: number) {
    try {
      return {
        ...(await this.prismaService.gcp.findUniqueOrThrow({
          where: { id: gcpId },
        })),
      };
    } catch (err) {
      throw new NotFoundException(`Gcp not found with ID ${gcpId}`);
    }
  }

  async updateGcp(id: number, data: UpdateGcpDto) {
    return this.prismaService.gcp.update({
      where: { id },
      data: {
        X: data.X,
        Y: data.Y,
        description: data.description,
      },
    });
  }

  async deleteGcp(id: number) {
    return this.prismaService.gcp.delete({
      where: { id },
    });
    }
}
