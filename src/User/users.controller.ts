import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { LoggedUser } from 'src/auth/logged-user.decorator';


@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiTags('Auth')
  @Post('/login/register')
  @ApiOperation({ summary: 'Criar um usuário' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiTags('Ranking')
  @Get('ranking/filterByMoney')
  filterByMoney() {
    return this.usersService.filterByMoney();
  }

  @ApiTags('Ranking')
  @Get('ranking/filterByWins')
  filterByWins() {
    return this.usersService.filterByWins();
  }

  @ApiTags('Ranking')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('/ranking/user/:id')
  @ApiOperation({ summary: 'Visualizar um usuário pelo Id.' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiTags('User')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('/myAccount')
  @ApiOperation({
    summary: 'Retorna o perfil do usuário autenticado no momento',
  })
  profile(@LoggedUser() user: User) {
    return this.usersService.profile(user);
  }

  @ApiTags('User')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Patch('/myAccount')
  @ApiOperation({ summary: 'Editar dados do usuário logado' })
  update(@LoggedUser() user: User, @Body() updateUserDto: UpdateUserDto) {
    updateUserDto.id = user.id;
    return this.usersService.update(user, updateUserDto);
  }

  @ApiTags('User')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/myAccount')
  @ApiOperation({
    summary: 'Remove usuário logado.',
  })
  delete(@LoggedUser() user: User) {
    return this.usersService.delete(user);
  }
}
