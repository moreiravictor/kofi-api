import { Post } from "@/domain/models";
import { IUseCase } from "@/domain/usecases/usecase";

export interface ICreatePostUseCase extends IUseCase<Post, Post> {}