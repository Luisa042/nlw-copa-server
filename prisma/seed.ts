import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Jane Doe',
      email: 'jane.doe@gmail.com',
      avatarUrl: 'https://github.com/Luisa042.png',
    },
  });

  const pool = await prisma.pool.create({
    data: {
      code: 'BOL123',
      title: 'Example Pool',
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id,
        },
      },
    },
  });

  await prisma.game.create({
    data: {
      date: '2022-11-13T16:00:00.938Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR',

      guesses: {
        create: {
          firstTeamPoints: 7,
          secondTeamPoints: 1,

          participant: {
            connect: {
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              },
            },
          },
        },
      },
    },
  });

  await prisma.game.create({
    data: {
      date: '2022-11-14T19:00:00.938Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'AR',
    },
  });
}

main();
