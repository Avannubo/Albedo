import Layout from "@/app/(admin)/admin/AdminLayout";
import InfoComponents from "@/components/admin/panel/InfoComps";
import { redirect, useRouter } from 'next/navigation';
import { cookies } from 'next/headers'
export default function page() {
  const cookieStore = cookies()
  const token = cookieStore.has('token');
  console.log(token);
  if (!token) {
    redirect('/admin');
  }
  return (
    <>
        <Layout>
          <div>
            <h1 className="font-semibold text-4xl">Admin Panel</h1>
            <InfoComponents />
          </div>
        </Layout>
    </>
  );
}