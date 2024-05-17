import Layout from "@/app/(admin)/admin/AdminLayout";
import InfoComponents from "@/components/admin/panel/InfoComps";
import { redirect, useRouter } from 'next/navigation';
import cookies from 'js-cookie';
export default function page() {
  // const Router = useRouter();
  const token = cookies.get('token');
  console.log('token: ' + token);
  if (!token) {
    redirect('/admin');
    // Router.push('/admin');
  }
  return (
    <>
      {token ? (

        <div></div>
      ) : (
        <Layout>
          <div>
            <h1 className="font-semibold text-4xl">Admin Panel</h1>
            <InfoComponents />
          </div>
        </Layout>
      )}

    </>

  );
}