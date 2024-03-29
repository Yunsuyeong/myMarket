import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { User } from "@prisma/client";

interface IProfResponse {
  ok: boolean;
  profile: User;
}

export default function useUser() {
  const { data, error } = useSWR<IProfResponse>("/api/users/prof");
  const router = useRouter();
  useEffect(() => {
    if (data && !data.ok) {
      router.replace("/login");
    }
  }, [data, router]);
  return { user: data?.profile, isLoading: !data && !error };
  //
}
