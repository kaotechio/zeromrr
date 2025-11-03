"use client";

import { authClient } from "@/auth-client";
import LoginButton from "./login-button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { HomeIcon, LogOutIcon, UserIcon } from "lucide-react";

export default function AuthButton() {
  const { data: session } = authClient.useSession();
  const pathname = usePathname();
  const router = useRouter();
  if (session?.user) {
    const onProfile = pathname === "/profile";
    return (
      <div className="flex items-center gap-2">
        <Link
          href={onProfile ? "/" : "/profile"}
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-sky-700 hover:text-sky-800 border border-sky-200 rounded-md hover:bg-sky-50 transition-colors duration-200"
          title={onProfile ? "Home" : "My Profile"}
        >
          { onProfile ? <HomeIcon className="size-4" /> : <UserIcon className="size-4" /> }
          {onProfile ? "Home" : "My Profile"}
        </Link>
        <Button
          variant="outline"
          size="sm"
          className="border-sky-200 cursor-pointer"
          onClick={() => { authClient.signOut(); router.push("/"); }}
          title="Sign out"
        >
          <LogOutIcon className="size-4" />
          Sign out
        </Button>
      </div>
    );
  } else {
    return <LoginButton />;
  }
}
