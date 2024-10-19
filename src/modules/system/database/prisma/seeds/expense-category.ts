import { CategoryGroupType, PrismaClient } from '@prisma/client';

export async function seedExpenseCategories(client: PrismaClient) {
  const categories: { type: CategoryGroupType; name: string }[] = [
    {
      type: CategoryGroupType.ENTERTAINMENT,
      name: 'Games',
    },
    {
      type: CategoryGroupType.ENTERTAINMENT,
      name: 'Movies',
    },
    {
      type: CategoryGroupType.ENTERTAINMENT,
      name: 'Music',
    },
    {
      type: CategoryGroupType.ENTERTAINMENT,
      name: 'Sports',
    },
    {
      type: CategoryGroupType.ENTERTAINMENT,
      name: 'Others',
    },

    {
      type: CategoryGroupType.FOOD,
      name: 'Dining out',
    },
    {
      type: CategoryGroupType.FOOD,
      name: 'Groceries',
    },
    {
      type: CategoryGroupType.FOOD,
      name: 'Liquor',
    },
    {
      type: CategoryGroupType.FOOD,
      name: 'Others',
    },

    {
      type: CategoryGroupType.HOME,
      name: 'Furniture',
    },
    {
      type: CategoryGroupType.HOME,
      name: 'Electronics',
    },
    {
      type: CategoryGroupType.HOME,
      name: 'Household supplies',
    },
    {
      type: CategoryGroupType.HOME,
      name: 'Maintenance',
    },
    {
      type: CategoryGroupType.HOME,
      name: 'Mortgage',
    },
    {
      type: CategoryGroupType.HOME,
      name: 'Rent',
    },
    {
      type: CategoryGroupType.HOME,
      name: 'Services',
    },
    {
      type: CategoryGroupType.HOME,
      name: 'Pets',
    },
    {
      type: CategoryGroupType.HOME,
      name: 'Others',
    },

    {
      type: CategoryGroupType.LIFE,
      name: 'Childcare',
    },
    {
      type: CategoryGroupType.LIFE,
      name: 'Education',
    },
    {
      type: CategoryGroupType.LIFE,
      name: 'Education',
    },
    {
      type: CategoryGroupType.LIFE,
      name: 'Gifts',
    },
    {
      type: CategoryGroupType.LIFE,
      name: 'Insurance',
    },
    {
      type: CategoryGroupType.LIFE,
      name: 'Medical expenses',
    },
    {
      type: CategoryGroupType.LIFE,
      name: 'Taxes',
    },
    {
      type: CategoryGroupType.LIFE,
      name: 'Others',
    },

    {
      type: CategoryGroupType.TRANSPORTATION,
      name: 'Bicycle',
    },
    {
      type: CategoryGroupType.TRANSPORTATION,
      name: 'Bus/train',
    },
    {
      type: CategoryGroupType.TRANSPORTATION,
      name: 'Car',
    },
    {
      type: CategoryGroupType.TRANSPORTATION,
      name: 'Gas/fuel',
    },
    {
      type: CategoryGroupType.TRANSPORTATION,
      name: 'Others',
    },
    {
      type: CategoryGroupType.TRANSPORTATION,
      name: 'Hotel',
    },
    {
      type: CategoryGroupType.TRANSPORTATION,
      name: 'Parking',
    },
    {
      type: CategoryGroupType.TRANSPORTATION,
      name: 'Plane',
    },
    {
      type: CategoryGroupType.TRANSPORTATION,
      name: 'Taxi',
    },
    {
      type: CategoryGroupType.UNCATEGORIZED,
      name: 'General',
    },
    {
      type: CategoryGroupType.UTILIZED,
      name: 'Cleaning',
    },
    {
      type: CategoryGroupType.UTILIZED,
      name: 'Electricity',
    },
    {
      type: CategoryGroupType.UTILIZED,
      name: 'TV/Internet/Phone',
    },
    {
      type: CategoryGroupType.UTILIZED,
      name: 'Water',
    },
    {
      type: CategoryGroupType.UTILIZED,
      name: 'Trash',
    },
    {
      type: CategoryGroupType.UTILIZED,
      name: 'Heat/gas',
    },
    {
      type: CategoryGroupType.UTILIZED,
      name: 'Others',
    },
  ];

  const category = await client.lKExpenseCategory.findFirst({
    select: { id: true },
  });
  if (category) {
    return;
  }
  await client.lKExpenseCategory.createMany({
    data: categories.map((x) => ({ ...x })),
  });
}
