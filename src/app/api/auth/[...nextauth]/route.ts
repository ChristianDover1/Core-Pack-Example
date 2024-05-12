import NextAuth from 'next-auth';
import {options} from './options';
import { getSession } from 'next-auth/react';

const handler = NextAuth(options);


export { handler as GET, handler as POST}