import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CustomAuthGuard } from '@app/auth/guards/auth.guard';
import { User } from '@app/auth/decorators/user.decorator';
import { CreateEmployeeDTO } from './dto/create-employee.dto';
import { FilterAndPaginationDTO } from '@app/infrastructure/dtos/filter-and-pagination.dto';
import { ValidateUUID } from '@app/infrastructure/dtos/validate-uuid.dto';
import { UpdateEmployeeDTO } from './dto/update-employee.dto';
import { RolesGuard } from '@app/auth/guards/role.guard';
import { Roles } from '@app/auth/decorators/role.decorator';
import { Role } from '@app/auth/enums/role.enum';

@Controller({
  path: 'employees',
  version: '1',
})
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) { }

  @Post()
  @UseGuards(CustomAuthGuard)
  async createEmployee(@User("id") userId: string, @Body() employee: CreateEmployeeDTO) {
    return this.employeesService.create(userId, employee);
  }

  @Get()
  @UseGuards(CustomAuthGuard)
  async getEmployees(@Query() query: FilterAndPaginationDTO) {
    return this.employeesService.getEmploees(query);
  }

  @Get(':id')
  @UseGuards(CustomAuthGuard)
  async getEmployee(@Param('id', ValidateUUID) id: string) {
    return this.employeesService.getEmployeeById(id);
  }

  @Patch(':id')
  @UseGuards(CustomAuthGuard)
  async updateEmployee(@Param('id', ValidateUUID) id: string, @Body() employee: UpdateEmployeeDTO) {
    return this.employeesService.updateEmployee(id, employee);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  async deleteEmployee(@Param('id', ValidateUUID) id: string) {
    return this.employeesService.deleteEmployee(id);
  }

}
