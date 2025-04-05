import { TopicType } from "@/domain/models/topic";
import db from "@/main/common/postgres/client";
import { CoffeeRepository } from "@/main/repositories/postgres/coffee";
import { UserRepository } from "@/main/repositories/postgres/user";
import { faker } from "@faker-js/faker";
import { randomUUID } from "crypto";

// create user
const userId = "b39e33b7-4361-4e48-a8fe-2f32abc8698f";

const userRepo = new UserRepository(db);

console.log("Will search for user...");

const foundUser = await userRepo.findOneById(userId);

if (!foundUser) {
  console.log("User not found. Will try to create it.");

  await userRepo.create({
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
    id: userId,
    password: "1234",
    phone: faker.string.numeric(11),
    profilePhoto: { id: randomUUID(), url: faker.internet.url() },
    username: faker.internet.userName(),
  });

  console.log("Created user Successfully!");
}

//creates net cafes
const brandId = "85a10d2c-9e51-47c6-b377-dcce592d8891";

console.log("Will search for brand...");

const foundBrand = await db.brand.findUnique({ where: { id: brandId } });

if (!foundBrand) {
  console.log("Brand not found. Will try to create it.");

  await db.brand.create({
    data: {
      cnpj: "26109811000119 ",
      name: "NetCafes",
      id: brandId,
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

  console.log("Created brand Successfully!");
}

// create coffee
const coffeeId = "2b007b42-8629-453c-b45d-ebad21753d87";

const coffeeRepo = new CoffeeRepository(db);

console.log("Will search for coffee...");

const foundCoffee = await db.coffee.findUnique({ where: { id: coffeeId } });

if (!foundCoffee) {
  console.log("Coffee not found. Will try to create it.");

  await coffeeRepo.insert({
    acidity: 5,
    body: 4,
    brandId,
    category: "specialty",
    id: coffeeId,
    internalGrade: 4,
    name: "Capim Limão",
    photo: { id: randomUUID(), url: "https://slaaaa" },
    roast: "Média",
    sweetness: 2,
    tasteNotes: "mel, acucar mascavo e capim limão",
    topicType: TopicType.COFFEE,
    afterTaste: "nennum",
    elevation: 1_200,
    generalGrade: 84,
    processingMethod: "fermentado",
  });

  console.log("Created coffee Successfully!");
}
