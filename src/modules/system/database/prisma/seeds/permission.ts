/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PrismaClient } from '@prisma/client';
import { flatten } from 'lodash';

const prisma = new PrismaClient();

const ResourceAction = {
  c: 'create',
  u: 'update',
  d: 'delete',
  r: 'read',
};

export async function seedPermissionsAndAdmin() {
  const PERMISSION_GROUPS = [
    {
      resourceName: 'USER',
      description: 'User',
      permissions: ['C', 'R', 'U', 'D'],
    },
    {
      resourceName: 'ROLE',
      description: 'Role',
      permissions: ['C', 'R', 'U', 'D'],
    },
    {
      resourceName: 'USER_P',
      description: 'User Permissions',
      permissions: ['C', 'R', 'U', 'D'],
    },
    {
      resourceName: 'CGPT',
      description: 'Cai Gia Phai Tra (CGPT) (User Portal)',
      permissions: ['C', 'R', 'U', 'D'],
    },
  ];

  let dbPermissionGroups = await prisma.permissionGroup.findMany();
  let adminRole = await prisma.role.findFirst({
    where: {
      name: 'ADMIN',
    },
  });

  await prisma.$transaction(async (trx) => {
    if (!adminRole) {
      adminRole = await trx.role.create({
        data: {
          name: 'ADMIN',
          displayName: 'Admin',
          description:
            'The role for Admin can access and action on all portals',
          canBeDeleted: false,
          canBeUpdated: true,
        },
      });
    }

    const deletedGroups = dbPermissionGroups.filter(
      (g) => !PERMISSION_GROUPS.some((x) => x.resourceName === g.resourceName),
    );

    if (deletedGroups.length) {
      console.warn('Deleting groups: ', deletedGroups);
      await trx.permissionGroup.deleteMany({
        where: {
          id: {
            in: deletedGroups.map((x) => x.id),
          },
        },
      });
    }

    const newGroups = PERMISSION_GROUPS.filter(
      (g) => !dbPermissionGroups.some((x) => x.resourceName === g.resourceName),
    );

    if (newGroups.length > 0) {
      await Promise.all(
        newGroups.map(async (g) => {
          const group = await trx.permissionGroup.create({
            data: {
              resourceName: g.resourceName,
              description: g.description,
            },
          });

          await trx.permission.createMany({
            data: g.permissions.map((p) => ({
              resourceName: g.resourceName,
              displayName: `${g.resourceName}:${p}`,
              //@ts-ignore
              description: `Allow to ${ResourceAction[p.toLowerCase()]} ${g.resourceName}`,
              canCreate: p === 'C',
              canRead: p === 'R',
              canUpdate: p === 'U',
              canDelete: p === 'D',
              permissionGroupId: group?.id,
            })),
          });

          const permissions = await trx.permission.findMany({
            where: {
              resourceName: group.resourceName,
            },
            select: {
              id: true,
            },
          });

          await trx.roleToPermission.createMany({
            data: permissions.map((x) => ({
              roleId: adminRole!.id,
              permissionId: x.id,
            })),
          });
        }),
      );

      dbPermissionGroups = await trx.permissionGroup.findMany();
    }

    const existedGroups = PERMISSION_GROUPS.filter((g) =>
      dbPermissionGroups.some((x) => x.resourceName === g.resourceName),
    );
    if (existedGroups.length > 0) {
      await Promise.all(
        existedGroups.map(async (x) => {
          const dbGroup = dbPermissionGroups.find(
            (p) => p.resourceName === x.resourceName,
          );
          if (dbGroup!.description !== x.description) {
            await trx.permissionGroup.update({
              where: { id: dbGroup!.id },
              data: {
                description: x.description,
              },
            });
          }
        }),
      );
    }

    const permissions = await trx.permission.findMany({
      select: {
        id: true,
        resourceName: true,
        description: true,
      },
    });

    const formattedPermissions = flatten(
      PERMISSION_GROUPS.map((g) => {
        const group = dbPermissionGroups.find(
          (pg) => pg.resourceName === g.resourceName,
        )!;
        return g.permissions.map((p) => ({
          resourceName: g.resourceName,
          displayName: `${g.resourceName}:${p}`,
          //@ts-ignore
          description: `Allow to ${ResourceAction[`${p}`.toLowerCase()]} ${g.resourceName}`,
          canCreate: p === 'C',
          canRead: p === 'R',
          canUpdate: p === 'U',
          canDelete: p === 'D',
          permissionGroupId: group.id,
        }));
      }),
    );

    const newPermissions = formattedPermissions.filter(
      (p) => !permissions.some((x) => x.resourceName === p.resourceName),
    );

    if (newPermissions.length) {
      await trx.permission.createMany({
        data: newPermissions,
      });
    }

    const deletedPermissions = permissions.filter(
      (p) =>
        !formattedPermissions.some((x) => x.resourceName === p.resourceName),
    );

    if (deletedPermissions.length) {
      console.warn('Deleting groups: ', deletedPermissions);

      await trx.permission.deleteMany({
        where: {
          id: {
            in: deletedPermissions.map((x) => x.id),
          },
        },
      });
    }
  });
}
