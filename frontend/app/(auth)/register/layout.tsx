import { NEXT_AUTH } from "@/services/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";

export default async function RegisterLayout({
    children
}:{
    children: React.ReactNode
}) {
    const session = await getServerSession(NEXT_AUTH);
    if(session?.user) {
        return redirect("/dashboard")
    }
    return <div className="">{children}</div>
}