import { getUsers } from "@/lib/data";

export default async function page() {
  const data = await getUsers();

  return (
    <section className="">
      <h1 className="font-semibold text-4xl mb-6">Usuarios</h1>
      {data.map((user) => {
        return (
          <div key={user.id} className="flex space-x-2 h-auto  bg-slate-200 rounded-lg mb-2 p-2">
            <p>{user.id}</p>
            <p>{user.username}</p>
            <p>{user.email}</p>
          </div>
        );
      })}
    </section>
  );
}