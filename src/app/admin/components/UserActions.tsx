"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { LogOut } from "lucide-react";

export default function UserActions() {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/"); 
  };

  return (
    <Button  size="icon" className="cursor-pointer" onClick={handleSignOut}>
      <LogOut className="h-[50px] w-[50px]"/>
    </Button>
  );
}