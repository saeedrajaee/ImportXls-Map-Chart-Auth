import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateGcpRequest } from './dto/create-gcp.request';
import { CurrentUser } from '../auth/current-user.decorator';
import { TokenPayload } from '../auth/token-payload.interface';
import { GcpService } from './gcp.service';
import { UpdateGcpDto } from './dto/update-gcp.request';

@Controller('gcp')
export class GcpController {
  constructor(private readonly gcpService: GcpService) {}

  @Post()
  async createGcp(
    @Body() body: CreateGcpRequest,
  ) {
    // console.log("teeeeeeeeeeeeeeeeeeeeeeeeest")
    return this.gcpService.createGcp(body);
  }

  @Get()
  async getGcps() {
    // console.log("teeeeeeeeeeeeeeeeeeeeeeeeest")
    return this.gcpService.getGcps();
  }
  @Get(':gcpId')
  async getGcpType(@Param('gcpId') gcpId: string) {
    return this.gcpService.getGcp(+gcpId);
  }

  @Patch(':gcpId')
  async updateGcp(
    @Param('gcpId') gcpId: string,
    @Body() updateGcpDto: UpdateGcpDto,
  ) {
    return this.gcpService.updateGcp(+gcpId, updateGcpDto);
  }

  @Delete(':gcpId')
  async deleteGcp(@Param('gcpId') gcpId: string) {
    return this.gcpService.deleteGcp(+gcpId);
  }
}
