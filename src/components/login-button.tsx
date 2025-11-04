"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authClient } from "@/auth-client";
import { toast } from "sonner";
import { PlusIcon } from "lucide-react";

export default function LoginButton() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await authClient.signIn.magicLink({
        email,
        callbackURL: "/profile",
        errorCallbackURL: "/",
      });
      if (error) {
        toast.error(error.message || "Failed to send magic link");
      } else {
        toast.success("Check your email for the magic link!");
        setEmail("");
        setOpen(false);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="cursor-pointer inline-flex items-center px-3 py-1.5 text-sm font-medium text-sky-700 hover:text-sky-800 border border-sky-200 rounded-md hover:bg-sky-50 transition-colors duration-200">
          <PlusIcon className="size-4 mr-2" />
          Add Your Startup
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign in with Magic Link</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              placeholder="user@email.com"
            />
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading || !email} className="flex-1">
              {isLoading ? "Sending..." : "Send Magic Link"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}


