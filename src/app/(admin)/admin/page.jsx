import Login from "@/components/admin/login";
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers'
export default function Page() {
    const cookieStore = cookies()
    const token = cookieStore.has('token');
    //console.log(token);
    if (token) {
        redirect('/admin/dashboard');
    }
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-24 lg:px-8">
            <Login />
        </div>
    );
}
