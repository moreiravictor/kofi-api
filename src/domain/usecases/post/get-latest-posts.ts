import { Post, PostType } from "@/domain/models/post";
import { IUseCase } from "@/domain/usecases/usecase";

export interface IGetLatestPostsUseCase extends IUseCase<PostType, Post[]> {}