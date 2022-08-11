import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    if (createUserDto.password != createUserDto.confirmPassword) {
      throw new BadRequestException('As senhas informadas não são iguais.');
    }

    delete createUserDto.confirmPassword;

    const data: Prisma.UserCreateInput = {
      name: createUserDto.name,
      email: createUserDto.email,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    return this.prisma.user.create({
      data,
      select: {
        password: false,
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    // .catch(handleError);
  }

  filterByMoney() {
    return this.prisma.user.findMany({
      select:{
        id:true,
        name:true,
        wallet:true
      }
    })
  }

  filterByWins() {
    return this.prisma.user.findMany({
      select:{
        id:true,
        name:true,
        wins:true
      }
    })
  }

  async findOne(id: string) {
    const record = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        password: false,
      },
    });

    if (!record) {
      throw new NotFoundException(`Registro com id '${id}' não encontrado.`);
    }
    return record;
  }

  async update(user: User, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      if (updateUserDto.password != updateUserDto.confirmPassword) {
        throw new BadRequestException('As senhas informadas não são iguais.');
      }
    }

    delete updateUserDto.confirmPassword;

    const data: Partial<User> = { ...updateUserDto };

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    const id = user.id;

    return this.prisma.user.update({
      where: { id },
      data,
      select: { id: true, name: true, password: false },
    });
    // .catch(handleError);
  }

  async delete(user: User) {
    const id = user.id;
    return await this.prisma.user.delete({ where: { id } });
  }
}
