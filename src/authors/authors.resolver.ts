import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthorsService } from './authors.service';
import { Author } from './entities/author.entity';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';

@Resolver(() => Author)
export class AuthorsResolver {
  constructor(private readonly authorsService: AuthorsService) {}

  /* Creating a mutation that takes in a createAuthorInput and returns an author. */
  @Mutation(() => Author)
  createAuthor(
    @Args('createAuthorInput') createAuthorInput: CreateAuthorInput,
  ) {
    return this.authorsService.create(createAuthorInput);
  }

  /* This is a query that returns an array of authors. */
  @Query(() => [Author], { name: 'authors' })
  findAll() {
    return this.authorsService.findAll();
  }

  /* This is a query that returns an author. */
  @Query(() => Author, { name: 'author' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.authorsService.findOne(id);
  }

  /* This is a mutation that takes in an updateAuthorInput and returns an author. */
  @Mutation(() => Author)
  updateAuthor(
    @Args('updateAuthorInput') updateAuthorInput: UpdateAuthorInput,
  ) {
    return this.authorsService.update(updateAuthorInput.id, updateAuthorInput);
  }

  /* A mutation that takes in an id and returns an author. */
  @Mutation(() => Author)
  removeAuthor(@Args('id', { type: () => Int }) id: number) {
    return this.authorsService.remove(id);
  }
}
