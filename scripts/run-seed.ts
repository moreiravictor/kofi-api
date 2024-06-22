import db from "@/main/common/postgres/client";
import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";

const userPhoto = await db.photo.create({data: {id: randomUUID(), url: faker.internet.url()}});

await db.user.create({
  data: {
    id: randomUUID(), email: faker.internet.email(),
    password: faker.internet.password(),
    username: faker.internet.userName(),
    city: faker.location.city(),
    phone: faker.string.numeric(11),
    photoId: userPhoto.id,
    uf: "SP"
  }
});