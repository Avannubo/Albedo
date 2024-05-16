 
import Layout from "@/app/(admin)/admin/AdminLayout";
import Password from '@/components/admin/settings/password';
import Envios from '@/components/admin/settings/envios';
import Iban from '@/components/admin/settings/iban';
import Iva from '@/components/admin/settings/iva';
export default function page() {
  
  // const [updateMessage, setUpdateMessage] = useState(null); // State for update message
  // const [errorMessage, setErrorMessage] = useState(null); // State for update message
  // const [loading, setLoading] = useState(false); // State for loading indicator
  // useEffect(() => {
  //   // Clear update message after 5 seconds
  //   const timer = setTimeout(() => {
  //     setUpdateMessage(null);
  //     setErrorMessage(null);
  //   }, 5000);
  //   return () => clearTimeout(timer);
  // }, [updateMessage, errorMessage]);
  
  
  
 
  return (
    <Layout>
      {/* Display update message and loading bar if there's a message */}
      {/* {updateMessage && (
        <div className="absolute top-5 right-5 rounded-lg border-2  border-green-500  bg-green-200 text-slate-800 py-2 px-4 z-10">
          {updateMessage} 
        </div>
      )}
      {errorMessage && (
        <div className="absolute top-5 right-5 rounded-lg border-2 animate-bounce border-red-600  bg-red-200 text-slate-800 py-2 px-4 z-10">
          {errorMessage}
          {loading && (<div className="h-1 bg-red-600 mt-1" style={{ width: '100%', borderRadius: '0.25rem' }} />)}
        </div>
      )} */}
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