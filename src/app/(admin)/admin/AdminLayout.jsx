import SideNav from "@/components/admin/nav/aside";

export default function layout({ children }) {
  return (
      <div className="flex flex-row justify-start">
        <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
        <SideNav />
        <div className="w-[100%] overflow-y-auto" style={{ maxHeight: '100vh' }}>
          <div className="mt-24 mx-20">
            {children}
          </div>
        </div>
      </div>
  );
}