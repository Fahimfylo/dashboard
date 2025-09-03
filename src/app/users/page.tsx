"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { User } from "../types";

export default function UserDetailsPage() {
  const { id } = useParams();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => res.json())
        .then((data: User) => setUser(data));
    }
  }, [id]);

  if (!user) {
    return <div className="text-center py-10">Loading user details...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">User Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded p-4 space-y-2">
          <h2 className="text-lg font-semibold">Personal Information</h2>
          <p>
            <span className="font-medium">Name:</span> {user.name}
          </p>
          <p>
            <span className="font-medium">Username:</span> @{user.username}
          </p>
          <p>
            <span className="font-medium">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-medium">Phone:</span> {user.phone}
          </p>
          <p>
            <span className="font-medium">Website:</span> {user.website}
          </p>
        </div>
        <div className="bg-white shadow rounded p-4 space-y-2">
          <h2 className="text-lg font-semibold">Address</h2>
          <p>
            <span className="font-medium">Street:</span> {user.address.street}
          </p>
          <p>
            <span className="font-medium">Suite:</span> {user.address.suite}
          </p>
          <p>
            <span className="font-medium">City:</span> {user.address.city}
          </p>
          <p>
            <span className="font-medium">Zipcode:</span> {user.address.zipcode}
          </p>
          <p>
            <span className="font-medium">Geo Location:</span>{" "}
            {user.address.geo.lat}, {user.address.geo.lng}
          </p>
        </div>
      </div>
      <div className="bg-white shadow rounded p-4 space-y-2">
        <h2 className="text-lg font-semibold">Company</h2>
        <p>
          <span className="font-medium">Company Name:</span> {user.company.name}
        </p>
        <p>
          <span className="font-medium">Catch Phrase:</span>{" "}
          {user.company.catchPhrase}
        </p>
        <p>
          <span className="font-medium">Business:</span> {user.company.bs}
        </p>
      </div>
    </div>
  );
}
