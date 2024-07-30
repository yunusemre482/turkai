import { PrismaClient, Role } from '@prisma/client';
import { fa, faker } from '@faker-js/faker';
import * as argon from 'argon2';

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$transaction(async (tx) => {

      const users = await Promise.all(Array.from({ length: 150 }).map(async () => {
        const password = await argon.hash(faker.internet.password());
        return tx.user.create({
          data: {
            email: faker.internet.email(),
            password,
            roles: [Role.EMPLOYEE],
          },
        });
      }));


      const admins = await Promise.all(Array.from({ length: 5 }).map(async () => {
        const email = faker.internet.email();
        const password = await argon.hash(faker.internet.password());

        console.log("admin user created with email: ", email, " and password:", password);

        return tx.user.create({
          data: {
            email: faker.internet.email(),
            password,
            roles: [Role.ADMIN],
          },
        });
      }));

      const companies = await Promise.all(Array.from({ length: 50 }).map(async () => {
        return tx.company.create({
          data: {
            name: faker.company.name(),
            email: faker.internet.email(),
            logo: faker.image.url(),
            website: faker.internet.url(),
          },
        });
      }));


      const employees = await Promise.all(Array.from({ length: 150 }).map(async (_, index) => {
        return tx.employee.create({
          data: {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            phone: faker.phone.number(),
            userId: users[index].id,
            companyId: companies[Math.floor(Math.random() * companies.length)].id,
          },
        });
      }));

    })
  } catch (err) {
    console.error(err);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });