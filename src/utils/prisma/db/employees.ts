import prisma from "../prisma";
import { Employee } from "@prisma/client";


export async function insertEmployee(email: string, password: string, name: string, type: string) {
    try {
        const employee = await prisma.employee.create({
            data: {
                email,
                password,
                name,
                admin: type === 'admin',
            },
        });
        return employee;
    } catch (error) {
        console.error('Error inserting employee:', error);
        throw error;
    }
}
export async function getEmployee(email: string) {
    try{
        const employee = await prisma.employee.findUnique({
        where: {
            email: email
        }
        }) as Employee;
        console.log("Employee",employee)
        return employee;
    } catch (error) {
        console.error('Error fetching employee:', error);
        throw error;
    }
}

export async function getAllEmployees() {
    try {
        const employees = await prisma.employee.findMany();
        return employees;
    } catch (error) {
        console.error('Error fetching employees:', error);
        throw error;
    }
}