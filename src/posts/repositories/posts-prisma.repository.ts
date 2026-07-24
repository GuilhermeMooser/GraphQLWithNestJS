import { Inject } from '@nestjs/common';
import { Post } from '../graphql/models/post';
import { PostsRepository } from '../interfaces/posts.repository';
import { PrismaService } from '@/database/prisma/prisma.service';
import { NotFoundError } from '@/shared/errors/not-found-error';

export class PostsPrismaRepository implements PostsRepository {
  constructor(private prismaService: PrismaService) {}

  async create(data: Omit<Post, 'id' | 'author'>): Promise<Post> {
    return this.prismaService.post.create({ data });
  }

  async update(post: Post): Promise<Post> {
    await this.get(post.id);
    const postUpdated = await this.prismaService.post.update({
      data: post as any,
      where: {
        id: post.id,
      },
    });

    return postUpdated;
  }

  async findById(id: string): Promise<Post> {
    return this.get(id);
  }

  async findBySlug(slug: string): Promise<Post | null> {
    return await this.prismaService.post.findUnique({
      where: { slug },
    });
  }

  async get(id: string): Promise<Post> {
    const post = await this.prismaService.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundError(`Post not found with id: ${id}`);
    }

    return post;
  }
}
