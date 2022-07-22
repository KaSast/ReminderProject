import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface User {
    id: number,
    name: string,
    email: string,
    password: string,
    reminders: []
}

const userModel = {
    findByEmail: async (email: string) => {
        const user = await prisma.user.findUnique(
            { where: { email } }
        )
        if (user) {
            return user;
        } else {
            throw new Error(`User with ${email} does not exist`);
        }
    },

    findById: async (id: number) => {
        const user = await prisma.user.findUnique(
            { where: { id } }
        )
        if (user) {
            return user;
        } else {
            throw new Error(`User with ${id} does not exist`);
        }
    },

    addUser: async (user: User) => {

    }

}

