import { type Metadata } from 'next'
import SignUp from "@/app/(auth)/register/SignUp";

export const metadata: Metadata = {
  title: 'Sign Up',
}

export default function Register() {
    return (
        <SignUp/>
    )
}