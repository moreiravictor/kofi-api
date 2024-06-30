import { Photo } from "@/domain/models/photo";
import { Prisma } from "@prisma/client";

export type DBPhoto = Prisma.PhotoGetPayload<{}>;

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

  static fromDbToEntities(photos: DBPhoto[]): Photo[] {
    return photos.map(PhotoRepository.fromDbToEntity);
  }

  static fromDbToEntity(photo: DBPhoto): Photo {
    return { id: photo.id, url: photo.url };
  }
}
