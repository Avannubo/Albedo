import Layout from "@/app/(admin)/admin/AdminLayout";
import Password from '@/components/admin/settings/password';
import Envios from '@/components/admin/settings/envios';
import Iban from '@/components/admin/settings/iban';
import Iva from '@/components/admin/settings/iva';
export default function page() { 
  return (
    <Layout>
      {/* Display update message and loading bar if there's a message */}
      
      <h1 className="font-semibold text-4xl mb-6">Parametros Globales</h1>
      <div className="flex flex-col space-y-6 my-4">
        <div className="flex flex-row justify-between space-x-6 ">
          <Password/>
          <Envios/>
        </div>
        <div className="flex flex-row justify-between space-x-6 ">
          <Iban/>
          <Iva/>
        </div>
      </div>
    </Layout>
  );
}