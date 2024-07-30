import { RegisterDTO } from '@app/auth/dto/register.dto';
import { PrismaService } from '@app/infrastructure/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {


  constructor(
    private readonly prismaService: PrismaService,
  ) { }

  public async create(user: RegisterDTO) {
    return this.prismaService.user.create({
      data: user,
    });
  }

  public async getUserById(userId: string) {
    return this.prismaService.user.findFirst({
      where: {
        id: userId,
        deletedAt: null,
      },
      select: {
        password: false,
        email: true,
        roles: true,
        id: true,
      },
    });
  }


  public async getUserByEmail(email: string) {
    return this.prismaService.user.findFirst({
      where: {
        email,
        deletedAt: null,
      },
    });
  }


}
