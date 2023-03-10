import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from 'src/helper/auth.messages';
import { Repository } from 'typeorm';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { User } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { Codes } from 'src/helper/codes';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { SignInAuthDto } from './dto/signin-auth.dto';
import moment from 'moment';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  /** new user signup */
  async signUp(createAuthDto: CreateAuthDto): Promise<any> {
    try {
      const { username, email, password, dob, phone } = createAuthDto;
      const findEmail = await this.userRepository.findOneBy({ email });
      const token = Math.floor(1000 + Math.random() * 9000).toString();

      if(findEmail) {
        throw new HttpException(Messages.emailExist, HttpStatus.BAD_REQUEST);
      }

      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);

      const user = new User();
      user.username = username;
      user.email = email;
      user.password = hashPassword;
      user.dob = dob;
      user.phone = phone;

      const result = await this.userRepository.save(user);

      if(!result) {
        throw new HttpException(Messages.signFailed, HttpStatus.BAD_REQUEST);
      }

      return {
        statusCode: Codes.Success,
        message: Messages.signupsuccess,
      }

    } catch (error) {
      throw error;
    }
  }

  /** update email verification status */
  async markEmailAsConfirmed(email: string): Promise<any> {
    try {
      const emailConfirmed = await this.userRepository.update({ email }, {
        emailVerified: true
      });

      if(!emailConfirmed) {
        throw new HttpException(Messages.emailNotConfirmed, HttpStatus.BAD_REQUEST)
      }
      return {
        statusCode: Codes.Success,
        message: Messages.emailConfirmed
      }

    } catch (error) {
      throw error;
    }
  
  }

  /** get user by email */
  async getByEmail(email: string): Promise<any> {
    try {
      const user = await this.userRepository.findOneBy({ email })

      if(!user) {
        throw new HttpException(Messages.userNotFound, HttpStatus.BAD_REQUEST)
      }
      return user
      
    } catch (error) {
      throw error;
    }
  }

  /** sign in */  
  async signIn(signinAuthDto: SignInAuthDto): Promise<any> {
    try {
      const { email, password } = signinAuthDto;
      const user = await this.userRepository.findOneBy({ email: email });

      if(user.isActive !== true) {
        throw new HttpException(Messages.inactiveAccount, HttpStatus.BAD_REQUEST);

      } else if(user.emailVerified !== true) {
        throw new HttpException(Messages.unverifiedEmail, HttpStatus.BAD_REQUEST);

      } else {
        if(user && await bcrypt.compare(password, user.password )) {
          
          const payload: JwtPayload = { email };
          const accesstoken: string = await this.jwtService.sign(payload, { secret: process.env.JWT_SECRET });
          const deviceData = await this.updateDeviceData(user.id, signinAuthDto);

          return {
            statusCode: Codes.Success,
            message: Messages.loginSuccess,
            data: {
              id: user.id,
              deviceType: deviceData.deviceType,
              deviceId: deviceData.deviceId,
              fcmToken: deviceData.fcmToken,
              username: user.username,
              email: user.email,
              dob: user.dob == null ? "" : user.dob,
              phone: user.phone,
              active: user.isActive,
              token: accesstoken
            }
          }
        }
        throw new HttpException(Messages.invalidUser, HttpStatus.NOT_FOUND);
      }

    } catch (error) {
      throw error;
    }
  }

  async updateDeviceData(id: string, signinAuthDto: SignInAuthDto): Promise<any> {
    try {
      const { deviceId, deviceType, fcmToken } = signinAuthDto
      const updateResult = await this.userRepository.update({ id }, {
        deviceId: deviceId,
        deviceType: deviceType,
        fcmToken: fcmToken
      })

      if(!updateResult) {
        throw new HttpException(Messages.updateFailed, HttpStatus.BAD_REQUEST);
      }
      return {
        deviceId,
        deviceType,
        fcmToken
      }
    } catch (error) {
      
    }
  }
}
