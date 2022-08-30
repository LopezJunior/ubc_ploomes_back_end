import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { handleError } from 'src/Utils/handleError.utils';

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

    return this.prisma.user
      .create({
        data,
        select: {
          password: false,
          id: true,
          name: true,
          email: true,
          createdAt: true,
          updatedAt: true,
        },
      })
      .catch(handleError);
  }

  async filterByMoney() {
    const richest_list = await this.prisma.user
      .findMany({
        select: {
          id: true,
          name: true,
          wallet: true,
        },
      })
      .catch(handleError);

    richest_list.sort((a, b) => {
      return a.wallet - b.wallet;
    });

    return richest_list;
  }

  async filterByWins() {
    const winners_list = await this.prisma.user
      .findMany({
        select: {
          id: true,
          name: true,
          wins: true,
        },
      })
      .catch(handleError);

    winners_list.sort((a, b) => {
      return a.wins - b.wins;
    });

    return winners_list;
  }

  async findOne(id: string) {
    const record = await this.prisma.user
      .findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          password: false,
        },
      })
      .catch(handleError);


    if (!record) {
      throw new NotFoundException(`Registro com id '${id}' não encontrado.`);
    }
    return record;
  }

  async profile(user: User) {
    const id = user.id;
    return await this.prisma.user
      .findUnique({
        where: { id },
      })
      .catch(handleError);
  }

  async update(user: User, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      if (updateUserDto.password != updateUserDto.confirmPassword) {
        throw new BadRequestException('As senhas informadas não são iguais.');
      }
    }

    delete updateUserDto.confirmPassword;

    const data = { ...updateUserDto };

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    const id = user.id;

    return this.prisma.user
      .update({
        where: { id },
        data,
        select: { 
          id: true, 
          name: true, 
          password: false,
          createdAt: true,
          updatedAt: true, 
        },
      })
      .catch(handleError);
  }

  async delete(user: User) {
    const id = user.id;
    await this.prisma.user.delete({ where: { id }}).catch(handleError);    
    throw new HttpException('Usuário deletado com sucesso!', 200);
  }    
}
