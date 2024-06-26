import { Photo } from "@/domain/models/photo";

export class PhotoRepository {
  static fromEntityToDBCreate(photo: Photo) {
    return {
      postId: null,
      url: photo.url,
      id: photo.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };
  }

  static fromEntityToDBUpdate(photo: Photo) {
    return {
      postId: null,
      url: photo.url,
      id: photo.id,
      updatedAt: new Date(),
      deletedAt: null,
    };
  }
}
