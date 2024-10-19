import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { v4 as uuid_v4 } from 'uuid';

// export const filterOperationByMode = (
//   search?: string,
//   mode: Prisma.QueryMode = Prisma.QueryMode.insensitive,
// ): Prisma.StringFilter | undefined => {
//   return search ? { contains: search, mode } : undefined;
// };

export const getRandomId = () => uuid_v4();

export const getFullName = ({
  firstName,
  lastName,
  middleName,
}: {
  firstName: string;
  lastName: string;
  middleName?: string;
}) =>
  middleName
    ? `${middleName} ${firstName} ${lastName}`
    : `${firstName} ${lastName}`;

export function createInterfaceToken(name: string): string {
  return name || randomStringGenerator();
}
