import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
    return new PrismaClient()
}

declare global {
    const prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
if (process.env.NODE_ENV !== 'production') { // @ts-ignore
    globalThis.prisma = prisma
}