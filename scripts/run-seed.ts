import db from "@/main/common/postgres/client";
import { UserRepository } from "@/main/repositories/postgres/user";
import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";

// const userPhoto = await db.photo.create({data: {id: randomUUID(), url: faker.internet.url()}});
// const postPhoto = await db.photo.create({data: {id: randomUUID(), url: faker.internet.url()}});

const userRepo = new UserRepository(db);

await userRepo.create({
  address: { city: "São Paulo", id: randomUUID(), uf: "SP", complement: null, neighborhood: null, number: null, streetName: null, zipCode: null},
  email: faker.internet.email(),
  id: randomUUID(),
  password: faker.internet.password(),
  phone: faker.string.numeric(11),
  posts: [],
  profilePhoto: {id: randomUUID(), url: faker.internet.url()},
  username: faker.internet.userName()
});
