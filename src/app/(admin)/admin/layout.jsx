import SideNav from "@/components/admin/nav/aside";

export default function layout({ children }) {
  return (
    <section className="flex flex-col ">
      <div className="">
        <SideNav />
        <div className="ml-30">{children}</div>
      </div>
    </section>
  );
}
