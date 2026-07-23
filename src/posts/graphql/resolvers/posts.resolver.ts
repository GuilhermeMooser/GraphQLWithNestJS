import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Post } from '../models/post';
import { CreatePostUseCase } from '@/posts/usecases/create-post.usecase';
import { Inject } from '@nestjs/common';
import { CreatePostInput } from '../inputs/create-post.input';

@Resolver(() => Post)
export class PostsResolver {
  @Inject(CreatePostUseCase.UseCase)
  private createPostUseCase: CreatePostUseCase.UseCase;

  @Mutation(() => Post)
  createPost(@Args('data') data: CreatePostInput) {
    return this.createPostUseCase.execute(data);
  }
}
