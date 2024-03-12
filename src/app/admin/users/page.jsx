import { getUsers } from "@/lib/data";

export default async function page() {
  const data = await getUsers();

  return (
    <section className="">
        <h1>Usuarios</h1>
      {data.map((user) => {
        return (
          <div key={user.id} className="flex space-x-4 h-auto  bg-slate-200 rounded-lg m-4 p-2">
            <p>{user.id}</p>
            <p>{user.username}</p>
            <p>{user.email}</p>
          </div>
        );
      })}
    </section>
  );
}