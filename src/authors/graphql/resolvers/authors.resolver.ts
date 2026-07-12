import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Author } from '../models/author';
import { ListAuthorsUseCase } from '@/authors/usecases/list-authors.usecase';
import { Inject } from '@nestjs/common';
import { SearchParamsArgs } from '../args/search-params.args';
import { SearchAuthorsResult } from '../models/search-authors-result';
import { CreateAuthorUseCase } from '@/authors/usecases/create-author.usecase';
import { CreateAuthorInput } from '../inputs/create-author.input';
import { GetAuthorUseCase } from '@/authors/usecases/get-author.usecase';
import { AuthorIdArgs } from '../args/author-id.args';
import { UpdateAuthorUseCase } from '@/authors/usecases/update-author.usecase';
import { UpdateAuthorInput } from '../inputs/update-author.input';
import { DeleteAuthorUseCase } from '@/authors/usecases/delete-author.usecase';

@Resolver(() => Author)
export class AuthorsResolver {
  @Inject(ListAuthorsUseCase.UseCase)
  private listAuthorUseCase: ListAuthorsUseCase.UseCase;

  @Inject(CreateAuthorUseCase.UseCase)
  private createAuthorUseCase: CreateAuthorUseCase.UseCase;

  @Inject(GetAuthorUseCase.UseCase)
  private getAuthorUseCase: GetAuthorUseCase.UseCase;

  @Inject(UpdateAuthorUseCase.UseCase)
  private updateAuthorUseCase: UpdateAuthorUseCase.UseCase;

  @Inject(DeleteAuthorUseCase.UseCase)
  private deleteAuthorUseCase: DeleteAuthorUseCase.UseCase;

  @Query(() => SearchAuthorsResult)
  authors(@Args() { page, perPage, sort, sortDir, filter }: SearchParamsArgs) {
    return this.listAuthorUseCase.execute({
      page,
      perPage,
      sort,
      sortDir,
      filter,
    });
  }

  @Query(() => Author)
  getAuthorById(@Args() { id }: AuthorIdArgs) {
    return this.getAuthorUseCase.execute({ id });
  }

  @Mutation(() => Author)
  createAuthor(@Args('data') data: CreateAuthorInput) {
    return this.createAuthorUseCase.execute(data);
  }

  @Mutation(() => Author)
  updateAuthor(
    @Args() { id }: AuthorIdArgs,
    @Args('data') data: UpdateAuthorInput,
  ) {
    return this.updateAuthorUseCase.execute({ id, ...data });
  }

  @Mutation(() => Author)
  deleteAuthor(@Args() { id }: AuthorIdArgs) {
    return this.deleteAuthorUseCase.execute({ id });
  }
}
