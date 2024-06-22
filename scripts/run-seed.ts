import db from "@/main/common/postgres/client";
import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";

await db.user.create({
  data: {
    id: randomUUID(), email: faker.internet.email(),
    password: faker.internet.password(),
    username: faker.internet.userName(),
    city: faker.location.city(),
    phone: faker.string.numeric(11),
    photo: faker.internet.url(),
    uf: "SP"
  }
});