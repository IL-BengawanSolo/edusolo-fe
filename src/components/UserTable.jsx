import { useState } from 'react';

export default function UserTable() {
  const [users, setUsers] = useState([
    { name: 'Budi', email: 'budi@example.com' },
    { name: 'Siti', email: 'siti@example.com' },
    { name: 'Amin', email: 'amin@example.com' },
    { name: 'Rina', email: 'rina@example.com' },
    { name: 'Andi', email: 'andi@example.com' }
  ]);

  const handleDelete = (email) => {
    setUsers(users.filter(user => user.email !== email));
  };

  return (
    <div className="bg-white rounded shadow p-4 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Daftar Pengguna</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">+ Tambah Pengguna</button>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b">
            <th className="py-2">Nama</th>
            <th className="py-2">Email</th>
            <th className="py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.email} className="border-b">
              <td className="py-2">{user.name}</td>
              <td className="py-2">{user.email}</td>
              <td className="py-2 space-x-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
                <button onClick={() => handleDelete(user.email)} className="bg-gray-300 px-3 py-1 rounded">Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
