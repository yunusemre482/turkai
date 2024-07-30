import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { PrismaService } from '@app/infrastructure/prisma/prisma.service';

@Module({
  providers: [CompaniesService, PrismaService],
  controllers: [CompaniesController],
})
export class CompaniesModule { }
