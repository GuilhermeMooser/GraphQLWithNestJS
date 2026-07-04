import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsPrismaRepository } from './authors-prisma.repository';
import { PrismaClient } from '@/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { execSync } from 'node:child_process';
import { NotFoundError } from '@/shared/errors/not-found-error';

describe('AuthorsPrismaRepository Integration Tests', () => {
  let module: TestingModule;
  let repository: AuthorsPrismaRepository;

  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
  });

  beforeAll(async () => {
    execSync('npm run prisma:migratetest');
    await prisma.$connect();
    module = await Test.createTestingModule({}).compile();
    repository = new AuthorsPrismaRepository(prisma as any);
  });

  beforeEach(async () => {
    await prisma.author.deleteMany();
  });

  afterAll(async () => {
    await module.close();
  });

  test('Should throws an error when the id is not found', async () => {
    await expect(
      repository.findById('5fb01537-4cc5-41a0-aa62-78ef20ec2406'),
    ).rejects.toThrow(
      new NotFoundError(
        `Author not found using ID 5fb01537-4cc5-41a0-aa62-78ef20ec2406`,
      ),
    );
  });
});
