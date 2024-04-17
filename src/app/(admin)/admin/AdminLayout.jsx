import SideNav from "@/components/admin/nav/aside";

export default function layout({ children }) {
  return (
    <div className="flex flex-row justify-start"> 
      <SideNav />

      <div className="mx-40 mt-24 w-[100%]">{children}</div>

    </div>
  );
}