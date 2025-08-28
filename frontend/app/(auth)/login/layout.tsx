import { NEXT_AUTH } from "@/services/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";

export default async function LoginLayout({
    children
}:{
    children: React.ReactNode
}) {
    const session = await getServerSession(NEXT_AUTH);
    if(session?.user) {
        return redirect("/dashboard")
    }
    return <div className="min-h-screen">{children}</div>
}