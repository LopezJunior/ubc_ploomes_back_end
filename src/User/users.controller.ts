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
  @ApiOperation({ summary: 'Rota responsável por criar um novo usuário' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiTags('Ranking')
  @ApiOperation({
    summary: 'Rota responsável por trazer o ranking de usuários por dinheiro',
  })
  @Get('ranking/filterByMoney')
  filterByMoney() {
    return this.usersService.filterByMoney();
  }

  @ApiTags('Ranking')
  @ApiOperation({
    summary: 'Rota responsável por trazer o ranking de usuários por vitórias',
  })
  @Get('ranking/filterByWins')
  filterByWins() {
    return this.usersService.filterByWins();
  }

  @ApiTags('Ranking')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('/ranking/user/:id')
  @ApiOperation({
    summary: 'Rota responsável pela visualização de um usuário pelo Id.',
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @ApiTags('User')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Get('/myAccount')
  @ApiOperation({
    summary: 'Rota que retorna o perfil do usuário autenticado no momento',
  })
  profile(@LoggedUser() user: User) {
    return this.usersService.profile(user);
  }

  @ApiTags('User')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Patch('/myAccount')
  @ApiOperation({ summary: 'Rota que edita dados do usuário logado' })
  update(@LoggedUser() user: User, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(user, updateUserDto);
  }

  @ApiTags('User')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/myAccount')
  @ApiOperation({
    summary: 'Rota que remove usuário logado.',
  })
  delete(@LoggedUser() user: User) {
    return this.usersService.delete(user);
  }
}
