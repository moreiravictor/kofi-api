import { Post, PostType } from "@/domain/models/post";
import { IUsecase } from "@/domain/usecases/usecase";

export interface IGetLatestPostsUseCase extends IUsecase<PostType, Post[]> {}