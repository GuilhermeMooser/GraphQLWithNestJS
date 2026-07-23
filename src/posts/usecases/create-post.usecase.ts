import { AuthorsPrismaRepository } from '@/authors/repositories/authors-prisma.repository';
import { PostOutput } from '../dto/post-output';
import { PostsPrismaRepository } from '../repositories/posts-prisma.repository';
import slugify from 'slugify';
import { BadRequestError } from '@/shared/errors/bad-request-error';
import { ConflictError } from '@/shared/errors/conflict-error';

export namespace CreatePostUseCase {
  export type Input = {
    title: string;
    content: string;
    authorId: string;
  };

  export type Output = PostOutput;

  export class UseCase {
    constructor(
      private postsRepository: PostsPrismaRepository,
      private authorsRepository: AuthorsPrismaRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
      const { authorId, title, content } = input;

      if (!title || !content || !authorId) {
        throw new BadRequestError('Input data not provided');
      }

      await this.authorsRepository.get(authorId);

      const slug = slugify(title, { lower: true });

      const slugExist = await this.postsRepository.findBySlug(slug);

      if (slugExist) {
        throw new ConflictError('Title used by other post.');
      }

      const post = await this.postsRepository.create({
        slug,
        createdAt: new Date(),
        published: false,
        ...input,
      });

      return post as PostOutput;
    }
  }
}
