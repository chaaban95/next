import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const users = [
  { nickname: "Test", email: "test@test.no" },
  { nickname: "Test 2", email: "test2@test.no" },
];

// Kort versjon
const createUsers = async () => {
  await Promise.all(
    users.map(async (user) => {
      await prisma.user.create({
        data: {
          ...user,
        },
      });
    })
  );
};

// [ Promise { <pending> }, Promise { <pending> } ]
console.log(usersPromises);
await Promise.all(usersPromises);

async function main() {
  console.log("Start seeding ...");
  await createUsers();
  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
