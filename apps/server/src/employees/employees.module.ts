import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { PrismaService } from '@app/infrastructure/prisma/prisma.service';

@Module({
  providers: [EmployeesService, PrismaService],
  controllers: [EmployeesController],

})
export class EmployeesModule { }
