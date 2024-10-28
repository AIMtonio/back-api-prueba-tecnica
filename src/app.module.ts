import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { User } from './users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST, // Cambia esto por la dirección de tu servidor MySQL
      port: 3306, // Puerto por defecto de MySQL
      username: process.env.DB_USER, // Cambia esto por tu usuario de MySQL
      password: process.env.DB_PASS, // Cambia esto por tu contraseña de MySQL
      database: process.env.DB_NAME, // Cambia esto por el nombre de tu base de datos
      entities: [User],
      synchronize: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

