import { Comment } from "@/domain/models";

export interface ICreateCommentRepositoryInput {
  postId: string;
  userId: string;
  content: Comment["content"];
}

export interface ICreateCommentRepository {
  create(input: ICreateCommentRepositoryInput): Promise<Comment>;
}
