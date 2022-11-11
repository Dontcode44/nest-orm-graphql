import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class CreatePostInput {
  @MaxLength(20, {
    message: 'Title is too long',
  })
  @MinLength(3, {
    message: 'Title is too short',
  })
  @IsNotEmpty({
    message: 'Title is required',
  })
  @IsString({
    message: 'Title must be a string',
  })
  @Field()
  title: string;

  @MaxLength(300)
  @IsString({
    message: 'Content must be a string',
  })
  @Field({ nullable: true })
  content?: string;

  @IsInt()
  @Field()
  authorId: number;
}
