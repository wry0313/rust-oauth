"use client"

import { useEffect, useState } from "react";

async function getUser() {

  try {
    const response = await fetch(`http://localhost:8000/api/users/me`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
        throw await response.json();
      }

    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export default function Page() {
    const [user, setUser] = useState(null);
    useEffect(() => {
        getUser().then((data) => {
            console.log(data);
            setUser(data);
        })
        .catch((error) => {
            console.log(error);
        }
        )

    }
    , []);
  return <div>{user? user :"loading"}</div>;
}
