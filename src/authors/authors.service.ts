import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorsRepository: Repository<Author>,
  ) {}

  /**
   * It creates a new author using the createAuthorInput, and then saves it to the database
   * @param {CreateAuthorInput} createAuthorInput - CreateAuthorInput
   * @returns A promise of an author
   */
  create(createAuthorInput: CreateAuthorInput): Promise<Author> {
    const newAuthor = this.authorsRepository.create(createAuthorInput);
    return this.authorsRepository.save(newAuthor);
  }

  /**
   * It returns a promise that resolves to an array of Author objects
   * @returns An array of Author objects
   */
  findAll(): Promise<Author[]> {
    return this.authorsRepository.find();
  }

  /**
   * It finds a user by id and returns it
   * @param {number} id - number - The id of the author we want to find.
   * @returns A promise of an author
   */
  findOne(id: number): Promise<Author> {
    const findUser = this.authorsRepository.findOne({
      where: {
        id,
      },
    });
    if (!findUser) {
      throw new Error('User not found');
    }
    return findUser;
  }

  update(id: number, updateAuthorInput: UpdateAuthorInput) {
    return `This action updates a #${id} author`;
  }

  remove(id: number) {
    return `This action removes a #${id} author`;
  }
}
