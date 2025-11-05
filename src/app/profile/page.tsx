import { headers } from "next/headers";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getStartupsByUserId } from "@/db/queries/startup";
import Icon from "@/components/icon";
import Header from "@/components/header";
import AddStartupDialog from "@/components/add-startup-dialog";
import StartupListItem from "@/components/startup-list-item";
import DeleteAccountDialog from "@/components/delete-account-dialog";
import { Button } from "@/components/ui/button";
import { ShareIcon } from "lucide-react";
import InfoMenu from "@/components/info-menu";

export default async function Profile() {
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session?.user) {
    redirect("/");
  }

  const startups = await getStartupsByUserId(session.user.id);

  return (
    <>
      <Header />
      <main className="min-h-screen px-4 py-16 bg-linear-to-br from-sky-50 via-blue-50 to-indigo-50 relative">
        <InfoMenu />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
        <div className="relative w-full max-w-5xl mx-auto bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-slate-200/50 p-6 md:p-8">
          <Icon imageSize={42} textSize={21} />
          <div className="px-1">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl md:text-2xl font-semibold text-sky-900">Your Startups</h2>
              <div className="flex items-center gap-2">
                <Button asChild variant="outline" size="sm" className="border-sky-200">
                  <Link href={`/?userId=${session.user.id}`} title="Share profile">
                    <ShareIcon className="size-4" />
                    Share Profile
                  </Link>
                </Button>
                <AddStartupDialog />
              </div>
            </div>

            {startups.length === 0 ? (
              <p className="text-center text-slate-600 text-base md:text-lg">
                You haven't added any startups yet.
              </p>
            ) : (
              <ul className="space-y-4">
                {startups.map((startup) => (
                  <StartupListItem key={startup.id} startupItem={startup} />
                ))}
              </ul>
            )}

            <div className="mt-8 pt-6 border-t border-slate-200">
              <h3 className="text-lg font-semibold text-sky-900 mb-4">Account Settings</h3>
              <DeleteAccountDialog />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

