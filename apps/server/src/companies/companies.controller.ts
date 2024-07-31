import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CustomAuthGuard } from '@app/auth/guards/auth.guard';
import { FilterAndPaginationDTO } from '@app/infrastructure/dtos/filter-and-pagination.dto';
import { CreateCompanyDTO } from './dto/create-company.dto';
import { RolesGuard } from '@app/auth/guards/role.guard';
import { Roles } from '@app/auth/decorators/role.decorator';
import { Role } from '@app/auth/enums/role.enum';
import { UpdateCompanyDTO } from './dto/update-company.dto';
import { ValidateUUID } from '@app/infrastructure/dtos/validate-uuid.dto';

@Controller({
  path: 'companies',
  version: '1',
})
export class CompaniesController {
  constructor(
    private readonly companiesService: CompaniesService,
  ) { }

  @Get()
  @UseGuards(CustomAuthGuard)
  public async getCompanies(
    @Query() query: FilterAndPaginationDTO,
  ) {
    return this.companiesService.getCompanies(query);
  }

  @Post()
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  public async createCompany(
    @Body() company: CreateCompanyDTO,
  ) {
    return this.companiesService.create(company);
  }


  @Get(":id")
  @UseGuards(CustomAuthGuard)
  public async getCompanyById(
    @Param('id', ValidateUUID) companyId: string,
  ) {
    return this.companiesService.getCompanyById(companyId);
  }

  @Patch(":id")
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  public async updateCompany(
    @Param('id', ValidateUUID) companyId: string,
    @Body() company: UpdateCompanyDTO,
  ) {
    return this.companiesService.updateCompany(companyId, company);
  }

  @Delete(":id")
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  public async deleteCompany(
    @Param('id', ValidateUUID) companyId: string,
  ) {
    return this.companiesService.deleteCompany(companyId);
  }
}
