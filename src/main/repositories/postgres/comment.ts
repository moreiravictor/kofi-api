import { Comment } from "@/domain/models";
import {
  ICreateCommentRepository,
  ICreateCommentRepositoryInput,
} from "@/domain/repositories";
import { UserRepository } from "@/main/repositories/postgres/user";
import { Prisma, PrismaClient } from "@prisma/client";
import { SetOptional } from "type-fest";

export type DBComment = Prisma.CommentGetPayload<{
  include: { User: { include: { ProfilePhoto: true; Address: true } } };
}>;

export class CommentRepository implements ICreateCommentRepository {
  constructor(private readonly db: PrismaClient) {}

  static fromDbToEntities(dbComment: DBComment[]): Comment[] {
    return dbComment.map(CommentRepository.fromDbToEntity);
  }

  static fromDbToEntity(dbComment: SetOptional<DBComment, "User">): Comment {
    return {
      content: dbComment.content,
      id: dbComment.id,
      user: dbComment.User
        ? UserRepository.fromDBToEntity(dbComment.User)
        : undefined,
    };
  }

  async create(input: ICreateCommentRepositoryInput): Promise<Comment> {
    const comment = await this.db.comment.create({
      data: {
        postId: input.postId,
        userId: input.userId,
        content: input.content,
        createdAt: new Date(),
        deletedAt: null,
        updatedAt: new Date(),
      },
    });

    return CommentRepository.fromDbToEntity(comment);
  }
}
