import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User)
    private readonly _userRepository: Repository<User>,
    private readonly _jwtService: JwtService
  ) {}

  async generateJwt(user: CreateUserDto) {
    const payload = { username: user.mobile_phone, sub: user.password };
    return this._jwtService.sign(payload);
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this._userRepository.save(createUserDto);
    
    user.token = undefined;
    user.id = undefined;
    return user;
  }

  async findAll() {
    return await this._userRepository.find();
    //  `This action returns all users`;
  }

  async findOne(id: number) {
    const res = await this._userRepository.findOne({ where: { id } });
    
    if (!res) {
      return 'User not found';
    }

    return res;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const newDataUser = await this._userRepository.update(id, updateUserDto);

    if (!newDataUser) {
      return 'User not found';
    }

    return updateUserDto;
  }

  async remove(id: number) {
    const user = await this._userRepository.findOne({ where: { id } });
    if (!user) {
      return 'User not found';
    }

    const res = await this._userRepository.delete(id);

    if (res.affected === 0) {
      return 'User not found'
    }
    return user;
  }

  async findByEmailAndPassword(email: string, password: string) {
      const userExist = await this._userRepository.findOne({ where: { email: email, password: password } });
      if (!userExist) {
        return 'Invalid credentials';
      }

      // Personalmente no veo correcto imprimir la contraseña en la respuesta
      // userExist.password = undefined;
      return userExist;
  }
}
