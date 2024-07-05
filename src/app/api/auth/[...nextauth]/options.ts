
import type {NextAuthOptions} from 'next-auth'
import CredentialsProviders from 'next-auth/providers/credentials'
import {getEmployee} from '@/utils/prisma/db/employees'
import {getCustomer} from '@/utils/prisma/db/customers'
import {Employee, Customer} from "@prisma/client"

import { Prisma } from '@prisma/client'

export const options: NextAuthOptions = {
    session:{
        // strategy: 'jwt',
        maxAge: 14400 // 4 hours
    },
    providers: [
        // GithubProvider({
            //     clientId: process.env.GITHUB_ID as string,
            //     clientSecret: process.env.GITHUB_SECRET as string
            // }),
            CredentialsProviders({
            name: "Customer Login",
            credentials: {
                email: {label: "email:", type: "text", placeholder: "Email"},
                password: {label: "Password:", type: "password", placeholder: "Password"}
            },
            // get data from db
            async authorize(credentials, req) {
                
                if (!credentials) {
                    return null
                }
                console.log("RUNNING")
                // var user = await getCustomer(credentials.email) as Customer
                var user = await getCustomer(credentials.email) as any
                console.log(user)
                console.log(credentials?.email === user.email , credentials?.password === user.password)
                if (credentials?.email === user.email && credentials?.password === user.password) {
                    // return Promise.resolve(user)
                    return user
                } else {
                    // return Promise.resolve(null)
                    return null
                }
                // })
            }
        }),
        CredentialsProviders({
            name: "Employee Login",
            credentials: {
                email: {label: "email:", type: "text", placeholder: "Email"},
                password: {label: "Password:", type: "password", placeholder: "Password"}
            },
            // get data from db
            async authorize(credentials, req) {
                if (!credentials) {
                    return null
                }
                // var user = await getEmployee(credentials.email) as Employee
                var user?: Employee = await getEmployee(credentials.email)
                if (user == undefined){
                    //handle email doesn't exist
                }
                console.log(credentials?.email === user.email , credentials?.password === user.password)
                if (credentials?.email === user.email && credentials?.password === user.password) {
                    // return Promise.resolve(user)
                    return user
                } else {
                    // return Promise.resolve(null)
                    return null
                }
                // })
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
  