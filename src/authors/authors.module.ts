import { Module } from '@nestjs/common';
import { AuthorsResolver } from './graphql/resolvers/authors.resolver';
import { DatabaseModule } from '@/database/database.module';
import { PrismaService } from '@/database/prisma/prisma.service';
import { AuthorsPrismaRepository } from './repositories/authors-prisma.repository';
import { CreateAuthorUseCase } from './usecases/create-author.usecase';
import { GetAuthorUseCase } from './usecases/get-author.usecase';
import { ListAuthorsUseCase } from './usecases/list-authors.usecase';
import { UpdateAuthorUseCase } from './usecases/update-author.usecase';
import { DeleteAuthorUseCase } from './usecases/delete-author.usecase';

@Module({
  imports: [DatabaseModule],
  providers: [
    AuthorsResolver,
    {
      provide: 'PrismaService',
      useClass: PrismaService,
    },
    {
      provide: 'AuthorsRepository',
      useFactory: (prisma: PrismaService) => {
        return new AuthorsPrismaRepository(prisma);
      },
      inject: ['PrismaService'],
    },
    {
      provide: ListAuthorsUseCase.UseCase,
      useFactory: (authorsRepository: AuthorsPrismaRepository) => {
        return new ListAuthorsUseCase.UseCase(authorsRepository);
      },
      inject: ['AuthorsRepository'],
    },
    {
      provide: CreateAuthorUseCase.UseCase,
      useFactory: (authorsRepository: AuthorsPrismaRepository) => {
        return new CreateAuthorUseCase.UseCase(authorsRepository);
      },
      inject: ['AuthorsRepository'],
    },
    {
      provide: GetAuthorUseCase.UseCase,
      useFactory: (authorsRepository: AuthorsPrismaRepository) => {
        return new GetAuthorUseCase.UseCase(authorsRepository);
      },
      inject: ['AuthorsRepository'],
    },
    {
      provide: UpdateAuthorUseCase.UseCase,
      useFactory: (authorsRepository: AuthorsPrismaRepository) => {
        return new UpdateAuthorUseCase.UseCase(authorsRepository);
      },
      inject: ['AuthorsRepository'],
    },
    {
      provide: DeleteAuthorUseCase.UseCase,
      useFactory: (authorsRepository: AuthorsPrismaRepository) => {
        return new DeleteAuthorUseCase.UseCase(authorsRepository);
      },
      inject: ['AuthorsRepository'],
    },
  ],
})
export class AuthorsModule {}
