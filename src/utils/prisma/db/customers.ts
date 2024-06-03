import prisma from "../prisma";

export async function insertCustomer(email: string, password: string, name: string, companyName: string) {
    try {
        const customer = await prisma.customer.create({
            data: {
                email,
                password,
                name,
                companyName,
            },
        });
        return customer;
    } catch (error) {
        console.error('Error inserting customer:', error);
        throw error;
    }
}

export async function getCustomer(email: string) {
    try {
        const customer = await prisma.customer.findUnique({
            where: {
                email,
            },
        });
        return customer;
    } catch (error) {
        console.error('Error getting customer:', error);
        throw error;
    }
}

export async function getAllCustomers() {
    try {
        const customers = await prisma.customer.findMany();
        return customers;
    } catch (error) {
        console.error('Error fetching customers:', error);
        throw error;
    }
}