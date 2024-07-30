import { FilterAndPaginationDTO } from '@app/infrastructure/dtos/filter-and-pagination.dto';
import { PrismaService } from '@app/infrastructure/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDTO } from './dto/create-employee.dto';
import { CompanyStatus } from '@prisma/client';
import { NotFoundError } from 'rxjs';
import { UpdateEmployeeDTO } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    private readonly prismaService: PrismaService
  ) { }

  public async create(userId: string, employee: CreateEmployeeDTO) {

    // first check company exists or not by companyId
    const company = await this.prismaService.company.findFirst({
      where: {
        id: employee.companyId,
        status: CompanyStatus.ACTIVE
      }
    });

    if (!company) {
      throw new NotFoundException('Company not found!');
    }

    const isUserExist = await this.prismaService.user.findFirst({
      where: {
        id: userId,
        deletedAt: null,
      }
    });

    if (!isUserExist) {
      throw new NotFoundException('User not found!');
    }

    const isEmployeeExist = await this.prismaService.employee.findFirst({
      where: {
        email: isUserExist.email,
        deletedAt: null,
      }
    });

    if (isEmployeeExist) {
      throw new NotFoundException('Employee already exists!');
    }


    return this.prismaService.employee.create({
      data: {
        ...employee,
        userId: userId,
        email: isUserExist.email,
      },
    });
  }

  public async getEmploees(query: FilterAndPaginationDTO) {

    const where = {
      deletedAt: null,
      OR: [
        {
          firstName: {
            contains: query.filter,
          },
        },
        {
          lastName: {
            contains: query.filter,
          },
        },
        {
          email: {
            contains: query.filter,
          },
        },
        {
          phone: {
            contains: query.filter,
          },
        },
      ],
    };

    const [emplooyees, total] = await Promise.all([
      this.prismaService.employee.findMany({
        skip: query.skip,
        take: query.limit,
        where,
        orderBy: {
          [query.sort]: query.order,
        },
      }),
      this.prismaService.employee.count({
        where,
      }),
    ]);

    return {
      data: emplooyees,
      meta: {
        total,
        limit: query.limit,
        page: query.page,
        totalPage: Math.ceil(total / query.limit),
      },
    };

  }

  public async getEmployeeById(employeeId: string) {
    const employee = await this.prismaService.employee.findFirst({
      where: {
        id: employeeId,
        deletedAt: null,
      },
    });

    if (!employee) {
      throw new NotFoundException('Employee not found!');
    }

    return employee;
  }

  public async getEmployeeByEmail(email: string) {
    const employee = await this.prismaService.employee.findFirst({
      where: {
        email,
        deletedAt: null,
      },
    });

    if (!employee) {
      throw new NotFoundException('Employee not found!');
    }
  }

  public async updateEmployee(employeeId: string, employee: UpdateEmployeeDTO) {
    try {

      const updatedEmployee = await this.prismaService.employee.update({
        where: {
          id: employeeId,
        },
        data: {
          ...employee,
        }
      });

      return updatedEmployee;

    } catch (error) {
      throw new NotFoundException('Employee not found!');
    }

  }


}
