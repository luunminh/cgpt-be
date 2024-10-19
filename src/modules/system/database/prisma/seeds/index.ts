import { PrismaClient } from '@prisma/client';
import { seedCountries } from './country';
import { seedExpenseCategories } from './expense-category';
import { seedPermissionsAndAdmin } from './permission';
import { seedRoles } from './role';

const seedData = async () => {
  const prisma = new PrismaClient();

  await seedCountries(prisma);
  await seedExpenseCategories(prisma);
};

async function main() {
  console.warn('Seeding...');

  await seedPermissionsAndAdmin();
  await seedRoles();
  await seedData();

  console.warn('Seeding done!');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
