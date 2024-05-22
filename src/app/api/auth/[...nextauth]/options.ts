
import type {NextAuthOptions} from 'next-auth'
import CredentialsProviders from 'next-auth/providers/credentials'
import {getUser} from '@/utils/db/DB'

export const options: NextAuthOptions = {
    providers: [
        // GithubProvider({
        //     clientId: process.env.GITHUB_ID as string,
        //     clientSecret: process.env.GITHUB_SECRET as string
        // }),
        CredentialsProviders({
            name: "Credentials",
            credentials: {
                username: {label: "Username:", type: "text", placeholder: "username"},
                password: {label: "Password:", type: "password", placeholder: "password"}
            },
            // get data from db
            async authorize(credentials) {
                if (!credentials) {
                    return null
                }
                // const user = getUser(credentials.username)
                const user = {id: "1", email:"John@corepack.com", name: "John", password: "password"}
                // const user = {id: "1", name: "Customer1", password: "Customer1"}

                if (credentials?.username === user.name && credentials?.password === "password") {
                    // return Promise.resolve(user)
                    return user
                } else {
                    // return Promise.resolve(null)
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
  