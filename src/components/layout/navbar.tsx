"use client"

import React from "react";
import Link from "next/link";
import classes from "./navbar.module.css";
import { useSession ,signOut } from "next-auth/react";

export default function Navbar(){
    const { data: session } = useSession() as any;
    console.log(session)
    return (
        <nav className={classes.navBar}>
            <ul>
                <li>
                    <Link href="/dashboard">
                        <button>Dashboard</button>
                    </Link>
                </li>
                <li>
                    <Link href="/about">
                        <button>About</button>
                    </Link>
                </li>
                <li>
                    <Link href="/Account">
                        <button>Account</button>
                    </Link>
                </li>
                {
                    session ? (
                        <li>
                            <button onClick={() => signOut()}>{session.user.name}</button>
                        </li>
                    ) : (
                        <li>
                            <Link href="api/auth/signin">
                                <button>SignIn</button>
                            </Link>
                        </li>
                    )
                }
            </ul>
        </nav>
    );
};