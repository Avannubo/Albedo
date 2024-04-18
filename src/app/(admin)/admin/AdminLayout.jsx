import SideNav from "@/components/admin/nav/aside";

export default function layout({ children }) {
  return (
    <div className="flex flex-row justify-start"> 
      <SideNav />

      <div className="w-[100%] overflow-y-auto" style={{ maxHeight: '100vh' }}>
        <div className="mt-24 mx-40">
          {children}
        </div> 
      </div>

    </div>
  );
}