import { Controller, Post, Body, Get, Param, Patch, UseGuards, Put, Delete } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/JwtAuthGuard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  @Post('login')
  async login(@Body() createUserDto: CreateUserDto) {

    const userExist = await this._usersService.findByEmailAndPassword(createUserDto.email, createUserDto.password);
    if (!userExist) {
      return 'Invalid credentials';
    }
    const token = await this._usersService.generateJwt(createUserDto);
    return { user: userExist, access_token: token, token_type: "bearer" };
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this._usersService.create(createUserDto);
  }
  
  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return this._usersService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    console.log(id);
    return await this._usersService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    // return this._usersService.update(+id, updateUserDto);
    const user = await this._usersService.update(+id, updateUserDto);
    return user;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return this._usersService.remove(+id);
  }
}
