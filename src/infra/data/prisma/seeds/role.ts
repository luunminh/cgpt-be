import { Permission, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedRoles() {
  const systemRoles = [
    {
      name: 'USER',
      display_name: 'User',
      description: 'The role for normal User',
      permissions: 'CGPT:CRUD',
    },
  ];

  const permissions = await prisma.permission.findMany();
  const roles = await prisma.role.findMany({
    where: {
      name: { not: 'ADMIN' },
      canBeDeleted: false,
    },
  });
  const roleToPermissions = await prisma.roleToPermission.findMany({
    select: {
      roleId: true,
      permissionId: true,
    },
  });

  await prisma.$transaction(
    async (trx) => {
      for (const role of systemRoles) {
        const existedRole = roles.find((x) => x.name === role.name);
        if (!existedRole) {
          const createdRole = await trx.role.create({
            data: {
              name: role.name,
              displayName: role.display_name,
              description: role.description,
              canBeDeleted: false,
              canBeUpdated: true,
            },
          });

          const permissionsArray = role.permissions.split(',').filter((p) => p);
          for (const p of permissionsArray) {
            const myPermissions = findPermissionsByKey(p, permissions);
            await trx.roleToPermission.createMany({
              data: myPermissions.map((x) => ({
                roleId: createdRole.id,
                permissionId: x.id,
              })),
            });
          }
        } else {
          const permissionsArray = role.permissions.split(',').filter((p) => p);
          for (const p of permissionsArray) {
            const myPermissions = findPermissionsByKey(p, permissions);
            const newPermissions = myPermissions.filter(
              (x) =>
                !roleToPermissions.find(
                  (r) => r.roleId === existedRole.id && x.id === r.permissionId,
                ),
            );

            if (newPermissions.length) {
              await trx.roleToPermission.createMany({
                data: newPermissions.map((x) => ({
                  roleId: existedRole.id,
                  permissionId: x.id,
                })),
              });
            }
          }
        }
      }

      const deletedRoles = roles.filter(
        (x) => !systemRoles.find((r) => r.name === x.name),
      );

      if (deletedRoles.length) {
        await trx.role.deleteMany({
          where: {
            id: {
              in: deletedRoles.map((x) => x.id),
            },
          },
        });
      }
    },
    {
      timeout: 30000,
    },
  );
}

/**
 * find
 * @param key e.g. USER:CRUD, ROLE:CU
 * @param permissions
 * @returns
 */
function findPermissionsByKey(key: string, permissions: Permission[]) {
  const [resource, actions] = key.split(':');
  const resources = actions.split('').map((x) => ({
    name: resource,
    action: x,
  }));

  return permissions.filter((p) => {
    return resources.find(
      (r) =>
        r.name === p.resourceName &&
        ((r.action === 'R' && p.canRead) ||
          (r.action === 'C' && p.canCreate) ||
          (r.action === 'U' && p.canUpdate) ||
          (r.action === 'D' && p.canDelete)),
    );
  });
}
