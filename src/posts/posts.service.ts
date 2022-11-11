import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorsService } from 'src/authors/authors.service';
import { Author } from 'src/authors/entities/author.entity';
import { Repository } from 'typeorm';
import { CreatePostInput } from './dto/create-post.input';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    private readonly authorsService: AuthorsService,
  ) {}

  /**
   * It returns a promise that resolves to an array of Post objects
   * @returns An array of Post objects
   */
  async findAll(): Promise<Post[]> {
    return await this.postRepository.find();
  }

  /**
   * It creates a new post using the postRepository.create() method, then saves it using the
   * postRepository.save() method
   * @param {CreatePostInput} post - CreatePostInput
   * @returns A promise of a post
   */
  async createPost(post: CreatePostInput): Promise<Post> {
    const newPost = this.postRepository.create(post);
    return await this.postRepository.save(newPost);
  }

  /**
   * "Find a post by its id."
   * 
   * The function is async, so it returns a Promise. The function returns a Post object
   * @param {number} id - number - The id of the post we want to find.
   * @returns A promise of a post
   */
  async findPostById(id: number): Promise<Post> {
    return await this.postRepository.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * This function returns a promise that resolves to an Author object.
   * @param {number} userId - number - The userId is the parameter that we're passing in.
   * @returns An author object
   */
  async getAuthor(userId: number): Promise<Author> {
    return await this.authorsService.findOne(userId);
  }
}
