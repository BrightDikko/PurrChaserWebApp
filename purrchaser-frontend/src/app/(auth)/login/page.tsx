import { type Metadata } from 'next'
import LogIn from "@/app/(auth)/login/Login";

export const metadata: Metadata = {
  title: 'Log In',
}

export default function Login() {
    return (<LogIn/>)
}


