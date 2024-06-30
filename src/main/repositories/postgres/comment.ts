import { Comment } from "@/domain/models";
import { UserRepository } from "@/main/repositories/postgres/user";
import { Prisma } from "@prisma/client";

export type DBComment = Prisma.CommentGetPayload<{
  include: { User: { include: { ProfilePhoto: true; Address: true } } };
}>;

export class CommentRepository {
  static fromDbToEntities(dbComment: DBComment[]): Comment[] {
    return dbComment.map(CommentRepository.fromDbToEntity);
  }

  static fromDbToEntity(dbComment: DBComment): Comment {
    return {
      content: dbComment.content,
      id: dbComment.id,
      user: UserRepository.fromDBToEntity(dbComment.User),
    };
  }
}
