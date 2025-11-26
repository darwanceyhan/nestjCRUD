import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepoSitory: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    const newuUser = new User();
    newuUser.firstName = createUserDto.firstName;
    newuUser.lastName = createUserDto.lastName;
    return this.userRepoSitory.save(newuUser);
  }

  findAll() {
    return this.userRepoSitory.find();
  }

  findOne(id: number) {
    return this.userRepoSitory.findOneBy({ id });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const found = await this.userRepoSitory.findOneBy({ id });
    if (found === null) throw new Error();

    if (updateUserDto.firstName !== undefined) {
      found.firstName = updateUserDto.firstName;
    }
    if (updateUserDto.lastName !== undefined) {
      found.lastName = updateUserDto.lastName;
    }

    return await this.userRepoSitory.save(found);
  }

  remove(id: number) {
    return this.userRepoSitory.softRemove({ id });
  }
}
