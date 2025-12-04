import { PrismaClient } from "generated/prisma/client" 
import { faker } from '@faker-js/faker'
import dotenv from 'dotenv'
dotenv.config()
console.log('Seeding...')
const prisma = new PrismaClient()
async function main() {
  await prisma.$transaction(async tx => {
    for (let i = 0; i < 20; i++) {
      await tx.team.create({
        data: {
          country: faker.location.country(),
        }
      })
    }
    
    const teams = await tx.team.findMany({ select: { id: true } })
    const teamIds = teams.map(t => t.id)

    for (let i = 0; i < 10; i++) {
      const player = await tx.player.create({
        data: {
          name: faker.person.fullName(),
          goalCount: faker.number.int({ min: 0, max: 100 }),
          birthDate: faker.date.past({ years: 30 }),
          teamId: teamIds[Math.floor(Math.random() * teamIds.length)]
        }
      })
    }

    
  })
}
main()
.then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
