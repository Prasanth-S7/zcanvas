'use client'
import { useRouter } from "next/navigation"

export default function SignUpButton({ text }: {
    text: string
}) {

    const router = useRouter();
    return (
        <button className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-colors" onClick={() => router.push("/login")}>{text}</button>
    )
}