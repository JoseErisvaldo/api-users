import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { email, phone, name } = createUserDto;

    if (!email || !phone || !name) {
      throw new ConflictException('Email, telefone e nome são obrigatórios.');
    }

    // Verifica duplicidade de email ( ConflictException lança a mensagem de error)
    const emailExists = await this.userRepository.findOne({ where: { email } });
    if (emailExists) {
      throw new ConflictException('Este e-mail já está cadastrado.');
    }

    // Verifica duplicidade de telefone ( ConflictException lança a mensagem de error)
    const phoneExists = await this.userRepository.findOne({ where: { phone } });
    if (phoneExists) {
      throw new ConflictException('Este número de telefone já está em uso.');
    }

    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: string) {
    const user = this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new ConflictException('Usuário não encontrado.');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new ConflictException('Usuário não encontrado.');
    }

    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  remove(id: string) {
    return this.userRepository.delete(id).then((result) => {
      if (result.affected === 0) {
        throw new ConflictException('Usuário não encontrado.');
      }
      return { message: 'Usuário removido com sucesso.' };
    });
  }
}
