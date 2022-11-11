import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Author } from 'src/authors/entities/author.entity';
import { CreatePostInput } from './dto/create-post.input';
import { Post } from './entities/post.entity';
import { PostsService } from './posts.service';

@Resolver((of) => Post)
export class PostsResolver {
  constructor(private readonly postService: PostsService) {}

  /* A query that returns an array of posts. */
  @Query((returns) => [Post])
  posts() {
    return this.postService.findAll();
  }

  /* A mutation that creates a post. */
  @Mutation((returns) => Post)
  createPost(@Args('postInput') postInput: CreatePostInput) {
    return this.postService.createPost(postInput);
  }

  /* This is a query that returns a single post. */
  @Query((returns) => Post)
  post(@Args('id', { type: () => Int }) id: number) {
    return this.postService.findPostById(+id);
  }

  /* A resolver that returns the author of a post. */
  @ResolveField((returns) => Author)
  author(@Parent() post: Post): Promise<Author> {
    return this.postService.getAuthor(post.authorId);
  }
}
