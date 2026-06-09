import { PrismaPg } from '@prisma/adapter-pg';
import { resetDefaultCategories } from '../src/categories/sync-default-categories';
import { PrismaClient } from '../src/prisma/generated/client';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is required');
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  await resetDefaultCategories({
    library: prisma.library,
    category: prisma.category,
    product: prisma.product,
  });
  console.log('Categories and libraries reset from category-defaults.ts');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
