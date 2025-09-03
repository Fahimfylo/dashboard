"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { User } from "./types";

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filtered, setFiltered] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data: User[]) => {
        setUsers(data);
        setFiltered(data);
      });
  }, []);

  const handleSearch = () => {
    const lower = search.toLowerCase();
    const result = users.filter(
      (u) =>
        u.name.toLowerCase().includes(lower) ||
        u.email.toLowerCase().includes(lower)
    );
    setFiltered(result);
    setCurrentPage(1);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filtered.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filtered.length / usersPerPage);

  return (
    <div className="flex flex-col min-h-[900px] p-6 mt-5 w-full sm:max-w-3xl md:max-w-5xl lg:max-w-7xl xl:max-w-[1400px] border border-gray-100 bg-white rounded-xl shadow-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 border-gray-300 rounded-lg flex-1 w-full"
          placeholder="Search by name or email"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 font-medium text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Search
        </button>
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-4 text-gray-500 mb-2 p-3 bg-gray-100 sticky top-0">
            <div>NAME</div>
            <div>EMAIL</div>
            <div>PHONE</div>
            <div>COMPANY</div>
          </div>
          {currentUsers.length > 0 ? (
            currentUsers.map((user) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: user.id * 0.05 }}
              >
                <Link
                  href={`/users/${user.id}`}
                  className="grid border-b border-gray-200 grid-cols-4 py-4 px-3
             transition-transform duration-300
             md:hover:scale-102 md:hover:shadow-sm
             hover:bg-gray-50"
                >
                  <div className="flex flex-col">
                    {user.name.length > 15
                      ? `${user.name.slice(0, 15)}…`
                      : user.name}
                    <span className="text-gray-500 truncate sm:overflow-visible">
                      @{user.username}
                    </span>
                  </div>
                  <div className="pt-2 break-words pl-2">
                    {user.email.length > 15
                      ? `${user.email.slice(0, 15)}…`
                      : user.email}
                  </div>
                  <div className="pt-2 break-words">
                    {user.phone.length > 15
                      ? `${user.phone.slice(0, 15)}…`
                      : user.phone}
                  </div>
                  <div className="pt-2">{user.company.name}</div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500 col-span-4">
              No users found.
            </div>
          )}
        </div>
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-4 flex-wrap">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
