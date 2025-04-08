import { CafeteriaType } from "@/domain/models";
import { TopicType } from "@/domain/models/topic";
import db from "@/main/common/postgres/client";
import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";

await db.cafeteria.create({
  data: {
    type: CafeteriaType.SPECIALTY,
    Topic: {
      create: {
        name: faker.company.name(),
        type: TopicType.CAFETERIA,
        id: randomUUID(),
        updatedAt: new Date(),
        createdAt: new Date(),
        Photo: {
          create: { id: randomUUID(), url: faker.image.urlPicsumPhotos() },
        },
      },
    },
    Address: {
      create: {
        uf: "SP",
        city: faker.location.city(),
      },
    },
  },
  include: { Address: true, Topic: true },
});
