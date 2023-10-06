"use client";

import { toast } from "react-toastify";
import useStore from "@/store";
import { IUser } from "@/store/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const { setAuthUser, setRequestLoading, authUser, requestLoading } =
    useStore();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setRequestLoading(true);
        const response = await fetch(`http://localhost:8000/api/users/me`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw await response.json();
        }

        const data = await response.json();

        const user = data.data as IUser;
        setRequestLoading(false);
        // consol---[]]../////-
        setAuthUser(user);
      } catch (error: any) {
        setRequestLoading(false);
        if (error.error) {
          error.error.forEach((err: any) => {
            toast.error(err.message, {
              position: "top-right",
            });
          });
          return;
        }
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        if (error?.message === "You are not logged in") {
          router.push("/login");
        }

        toast.error(resMessage, {
          position: "top-right",
        });
      }
    };
    fetchUser();
  }, [router, setAuthUser, setRequestLoading]);

  return (
    <div>
      {authUser ? JSON.stringify(authUser) : "loading"}
      <button
        onClick={() => {
          fetch("http://localhost:8000/api/auth/logout", {
            credentials: "include",
          }).then(() => {
            setAuthUser(null);
            router.push("/");
          });
        }}
      >
        logout
      </button>
    </div>
  );
}
