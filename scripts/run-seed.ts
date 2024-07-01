import { TopicType } from "@/domain/models/topic";
import db from "@/main/common/postgres/client";
import { CoffeeRepository } from "@/main/repositories/postgres/coffee";
import { UserRepository } from "@/main/repositories/postgres/user";
import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";

const userRepo = new UserRepository(db);

// create user
const createdUser = await userRepo.create({
  address: {
    city: "São Paulo",
    id: randomUUID(),
    uf: "SP",
    complement: null,
    neighborhood: null,
    number: null,
    streetName: null,
    zipCode: null,
  },
  email: "mock@gmail.com",
  id: randomUUID(),
  password: "1234",
  phone: faker.string.numeric(11),
  profilePhoto: { id: randomUUID(), url: faker.internet.url() },
  username: faker.internet.userName(),
});

//creates net cafes
const createdBrand = await db.brand.create({
  data: {
    cnpj: "26109811000119 ",
    name: "NetCafes",
    id: randomUUID(),
    createdAt: new Date(),
    updatedAt: new Date(),
    address: {
      create: {
        uf: "MG",
        city: "Pedro Leopoldo",
      },
    },
    Photo: {
      create: {
        url: "https://acdn.mitiendanube.com/stores/001/371/162/themes/common/logo-367843348-1602120744-9dd1ffde8ecb3734d0d85a79e8e0698b1602120744-320-0.webp",
        id: randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    },
  },
  include: { address: true, Photo: true },
});

// create coffee

const coffeeRepo = new CoffeeRepository(db);

const createdCoffee = await coffeeRepo.insert({
  acidity: 5,
  body: 4,
  brandId: createdBrand.id,
  category: "specialty",
  id: randomUUID(),
  internalGrade: 4,
  name: "abobora com mel",
  photo: { id: randomUUID(), url: "https://slaaaa" },
  roast: "Média",
  sweetness: 2,
  tasteNotes: "abóbora, mel, acucar mascavo e amendoas",
  topicType: TopicType.COFFEE,
  afterTaste: "nennum",
  elevation: 1_200,
  generalGrade: 84,
  processingMethod: "fermentado",
});

console.log("user", createdUser.id);
console.log("brand", createdBrand.id);
console.log("coffee", createdCoffee.id);
