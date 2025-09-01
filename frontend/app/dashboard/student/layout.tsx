import { NEXT_AUTH } from "@/services/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";

export default async function studentLayout({
    children
}:{
    children: React.ReactNode
}) {
    const session = await getServerSession(NEXT_AUTH);
    if(!session?.user) {
        return redirect("/login")
    }
    return <div className="min-h-screen">{children}</div>
}