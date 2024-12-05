import { useState } from "react";
import { useEffect } from "react";

const dataUser = [
  {
    id: 1,
    nama: "Dwi Fauzul Ahmad",
    email: "fauzultanjung05@gmail.com",
    noHp: "082246480985"
  },
  {
    id: 2,
    nama: "Anwar Juniansyah",
    email: "Anwarjuni@gmail.com",
    noHp: "082248520785"
  },
  {
    id: 3,
    nama: "Fazri Khairan Masdi",
    email: "fazrikhairan@gmail.com",
    noHp: "085246483355"
  },
];

const users = localStorage.getItem("users");

function App() {
  const [detail, setDetail] = useState();
  const [user, setUser] = useState(users ? JSON.parse(users) : dataUser);
  const [editUser, setEditUser] = useState();

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(user));
  });

  const handleDelete = (us) => {
    if (confirm("Apakah Anda Ingin Menghapus User ini?")) {
      setUser(user.filter((u) => u.id !== us.id));
    }
  };

  return (
    <>
      {
        detail && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <div  className="m-auto flex flex-col bg-slate-300 p-5 gap-5 rounded-lg">
              <h1>Nama : {detail.nama}</h1>
              <h1>Email : {detail.email}</h1>
              <h1>No Hp : {detail.noHp}</h1>
              <button onClick={()=> setDetail()}>close</button>
            </div>
          </div>
        )
      }
      {editUser && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="m-auto flex flex-col bg-slate-300 p-5 gap-5 rounded-lg">
            <div className="flex justify-between">
              <label htmlFor="nama">Masukan Nama : </label>
              <input
                type="text"
                name="nama"
                placeholder="Nama"
                value={editUser.nama}
                onChange={(e) => {
                  setEditUser({ ...editUser, nama: e.target.value });
                }}
              />
            </div>
            <div className="flex justify-between">
              <label htmlFor="nama">Masukan Email : </label>
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={editUser.email}
                onChange={(e) => {
                  setEditUser({ ...editUser, email: e.target.value });
                }}
              />
            </div>
            <div className="flex justify-between">
              <label htmlFor="nama">Masukan Nomor Hp : </label>
              <input
                type="text"
                name="nomorHp"
                placeholder="Nomor Hp"
                value={editUser.noHp}
                onChange={(e) => {
                  setEditUser({ ...editUser, noHp: e.target.value });
                }}
              />
            </div>
            <button
              className="bg-blue-500 rounded-lg hover:bg-blue-700 "
              onClick={() => {
                if (editUser.id) {
                  setUser(
                    user.map((u) => (u.id === editUser.id ? editUser : u))
                  );
                } else {
                  setUser([
                    ...user,
                    { id: user[user.length-1].id + 1, ...editUser }
                  ]);
                }
                setEditUser();
              }}
            >
              Tambah
            </button>
            <button className="bg-blue-500 rounded-lg hover:bg-blue-700" onClick={()=> setEditUser()}>
              Batalkan
            </button>
          </div>
        </div>
      )}

      <header
        className={`text-black-1000 bg-gray-400 text-5xl text-center p-3 m-5`}
      >
        User Management
      </header>

      <body>
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <td className="w-1/3 py-2">Nama</td>
              <td className="w-1/3 py-2">Email</td>
              <td className="w-1/3 py-2">Aksi</td>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {user.map((u) => (
              <tr key={u.id}>
                <td className="text-left py-2 px-4">{u.nama}</td>
                <td className="text-left py-2 px-4">{u.email}</td>
                <td className="text-left py-2 px-4">
                  <button
                    onClick={() => {
                      setEditUser(u);
                    }}
                    className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-700 mx-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(u)}
                    className="bg-red-500 text-white px-4 py-1 rounded ml-2 hover:bg-red-700 mx-4"
                  >
                    Delete
                  </button>
                  <button className="bg-blue-500 text-white px-4 py-1 rounded ml-2 hover:bg-blue-700 mx-4" onClick={() => setDetail(u)}>
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="bg-blue-500 hover:bg-blue-600 text-center text-white rounded-md m-8">
          <button
            onClick={() =>
              setEditUser({
                nama: "",
                email: "",
              })
            }
          >
            Tambahkan User
          </button>
        </div>
      </body>
    </>
  );
}

export default App;
