"use client";

import { useState } from "react";
import { PlusIcon } from "lucide-react";
import LoginDialog from "./login-dialog";

export default function LoginButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setOpen(true)}
        className="cursor-pointer inline-flex items-center px-3 py-1.5 text-sm font-medium text-sky-700 hover:text-sky-800 border border-sky-200 rounded-md hover:bg-sky-50 transition-colors duration-200"
      >
        <PlusIcon className="size-4 mr-2" />
        Add Your Startup
      </button>
      <LoginDialog 
        open={open} 
        onOpenChange={setOpen}
        callbackURL="/profile"
        errorCallbackURL="/"
      />
    </>
  );
}


