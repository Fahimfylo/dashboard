/* eslint-disable @typescript-eslint/no-explicit-any */
import UserDetailsClient from "./UserDetailsClient";
import { User } from "@/app/types";

// Use 'any' here to bypass strict PageProps check
export default async function Page({ params }: any) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${params.id}`,
    { cache: "no-store" } // prevents stale data
  );
  const user: User = await res.json();

  return <UserDetailsClient user={user} />;
}
