
import type {NextAuthOptions} from 'next-auth'
import CredentialsProviders from 'next-auth/providers/credentials'
import {getEmployee} from '@/utils/prisma/db/employees'
import {getCustomer} from '@/utils/prisma/db/customers'
import {Employee, Customer} from "@prisma/client"

export const options: NextAuthOptions = {
    session:{
        // strategy: 'jwt',
        maxAge: 14400 // 4 hours
    },
    providers: [
            CredentialsProviders({
            id: "Customer Login",
            name: "Customer Login",
            credentials: {
                email: {label: "Email:", type: "text", placeholder: "Email"},
                password: {label: "Password:", type: "password", placeholder: "Password"}
            },
            // get data from db
            async authorize(credentials, req) {
                if (!credentials) {
                    return null
                }
                var user = await getCustomer(credentials.email) as any
                if (credentials?.email === user.email && credentials?.password === user.password) {
                    return user
                } else {
                    return null
                }
            }
        }),
        CredentialsProviders({
            id:"Employee Login",
            name: "Employee Login",
            credentials: {
                email: {label: "Email:", type: "text", placeholder: "Email"},
                password: {label: "Password:", type: "password", placeholder: "Password"}
            },
            // get data from db
            async authorize(credentials, req) {
                if (!credentials) {
                    return null
                }
                // var user = await getEmployee(credentials.email) as Employee
                let user = await getEmployee(credentials.email) as any
                if (user == undefined){
                    console.log("Email Doesn't Exist")
                    //handle email doesn't exist
                }
                if (credentials?.email === user.email && credentials?.password === user.password) {
                    return user
                } else {
                    return null
                }
            }
        })
    ],
    // to be implemented
    // pages: {
    //     signIn: "/auth/signin",
    //     signOut: "/api/auth/signout",
    //     // error: "/auth/error",
    //     verifyRequest: "/auth/verify-request",
    //     // newUser: null
    // },
}
  

