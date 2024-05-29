
import type {NextAuthOptions} from 'next-auth'
import CredentialsProviders from 'next-auth/providers/credentials'
import {getEmployee} from '@/utils/db/DB'

export const options: NextAuthOptions = {
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
                var user = await getEmployee(credentials.email) as any
                user = user[0]
                // user.finally(() => {})
                // const user = {id: "1", email:"John@corepack.com", name: "John", password: "password"}
                // const user = {id: "1", name: "Customer1", password: "Customer1"}
                // return user.then((res: any) => {
                // console.log(res)
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
                var user = await getEmployee(credentials.email) as any
                user = user[0]
                // user.finally(() => {})
                // const user = {id: "1", email:"John@corepack.com", name: "John", password: "password"}
                // const user = {id: "1", name: "Customer1", password: "Customer1"}
                // return user.then((res: any) => {
                // console.log(res)
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
  