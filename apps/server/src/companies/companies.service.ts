import { FilterAndPaginationDTO } from '@app/infrastructure/dtos/filter-and-pagination.dto';
import { PrismaService } from '@app/infrastructure/prisma/prisma.service';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateCompanyDTO } from './dto/create-company.dto';
import { CompanyStatus } from '@prisma/client';

@Injectable()
export class CompaniesService {
  private readonly logger = new Logger(CompaniesService.name);

  constructor(
    private readonly prismaService: PrismaService
  ) { }

  public async create(company: CreateCompanyDTO) {
    this.logger.debug('Creating company with info :', JSON.stringify(company));


    const companyExist = await this.prismaService.company.findFirst({
      where: {
        email: company.email,
        deletedAt: null,
      }
    });

    if (companyExist) {
      throw new BadRequestException('Company already exists with this email!');
    }


    try {
      const createdCompany = await this.prismaService.company.create({
        data: {
          ...company
        }
      });

      return createdCompany;

    } catch (error: unknown) {
      throw new BadRequestException('Company not created because of some issue');
    }
  }


  public async getCompanies(query: FilterAndPaginationDTO) {
    const { skip, limit, order, sort, filter } = query;

    const [companies, total] = await Promise.all([
      this.prismaService.company.findMany({
        skip,
        take: limit,
        orderBy: {
          [sort]: order,
        },
        where: {
          name: {
            contains: filter,
          },
          deletedAt: null
        },
      }),
      this.prismaService.company.count({
        where: {
          name: {
            contains: filter,
          },
        },
      })
    ]);

    return {
      data: companies,
      meta: {
        total,
        limit: query.limit,
        page: query.page,
        totalPage: Math.ceil(total / query.limit),
      },
    };

  }

  public async getCompanyById(companyId: string) {
    const company = await this.prismaService.company.findUnique({
      where: {
        id: companyId,
      },
    });

    if (!company) {
      throw new BadRequestException('Company not found');
    }

    return company;
  }

  public async updateCompany(companyId: string, company: any) {
    const updatedCompany = await this.prismaService.company.update({
      where: {
        id: companyId,
      },
      data: {
        ...company
      }
    });

    if (!updatedCompany) {
      throw new BadRequestException('Company not found');
    }

    return updatedCompany;
  }


  public async deleteCompany(companyId: string) {
    this.logger.debug('Deleting company with id :', companyId);

    try {
      const company = await this.prismaService.company.update({
        where: {
          id: companyId,
        },
        data: {
          deletedAt: new Date(),
          status: CompanyStatus.INACTIVE
        }
      });

      if (!company) {
        throw new BadRequestException('Company not found');
      }

      return company;
    } catch (error) {
      throw new BadRequestException('Company not found');
    }
  }

}
