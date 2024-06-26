import { PostType } from "@/domain/models";
import db from "@/main/common/postgres/client";
import { PostRepository } from "@/main/repositories/postgres/post";

// const userRepo = new UserRepository(db);

// await userRepo.create({
//   address: {
//     city: "São Paulo",
//     id: randomUUID(),
//     uf: "SP",
//     complement: null,
//     neighborhood: null,
//     number: null,
//     streetName: null,
//     zipCode: null,
//   },
//   email: faker.internet.email(),
//   id: randomUUID(),
//   password: faker.internet.password(),
//   phone: faker.string.numeric(11),
//   posts: [],
//   profilePhoto: { id: randomUUID(), url: faker.internet.url() },
//   username: faker.internet.userName(),
// });

//creates net cafes
// await db.brand.create({
//   data: {
//     cnpj: "26109811000119 ",
//     legalName: "Netcafes Cafes Especiais LTDA",
//     tradingName: "Netcafes",
//     id: "a6421272-16e1-40a7-a1b6-1e8ccad908fc",
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     address: {
//       create: {
//         uf: "MG",
//         city: "Pedro Leopoldo"
//       }
//     },
//     Photo: {create: {url: "https://acdn.mitiendanube.com/stores/001/371/162/themes/common/logo-367843348-1602120744-9dd1ffde8ecb3734d0d85a79e8e0698b1602120744-320-0.webp", id: randomUUID(), createdAt: new Date(), updatedAt: new Date()}}
//   },
//   include: {address: true, Photo: true}
// });

// await db.coffee.create({
//   data: {
//     id: "345c70a5-bcfa-4d83-8bba-29e3f725796f",
//     acidity: 5,
//     body: 4,
//     category: "specialty",
//     internalGrade: 4.5,
//     name: "Caramelo e Mel",
//     roast: "média",
//     Photo: {
//       create: {
//         id: randomUUID(),
//         url: "https://acdn.mitiendanube.com/stores/001/371/162/products/netcafes-sbv-cm-1024x10241-4504b61040fbf6d98316020971716784-1024-1024.webp",
//       },
//     },
//     sweetness: 3,
//     tasteNotes:
//       "Doçura intensa, corpo alto, acidez cítrica equilibrada com notas de caramelo e mel.",
//     Brand: { connect: { id: "a6421272-16e1-40a7-a1b6-1e8ccad908fc" } },
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     elevation: 1200,
//   },
//   include: { Photo: true, Brand: true },
// });

const repo = new PostRepository(db);

// const res = await repo.create({
//   post: {
//     id: randomUUID(),
//     content: faker.lorem.paragraphs(4),
//     likesAmount: 0,
//     photos: [{ id: randomUUID(), url: faker.internet.url() }],
//     title: faker.lorem.sentence(),
//     type: PostType.REVIEW,
//     userId: "89c95c83-1f97-4ecb-9360-0ec07941e68e",
//   },
//   topics: { coffeesIds: ["345c70a5-bcfa-4d83-8bba-29e3f725796f"] },
// });

// console.log(res);

const found = await repo.findMany(PostType.REVIEW);

console.log(found);
