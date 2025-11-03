import { headers } from "next/headers";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getStartupsByUserId } from "@/db/queries/startup";
import Icon from "@/components/icon";
import Header from "@/components/header";
import AddStartupDialog from "@/components/add-startup-dialog";

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
      <main className="min-h-screen px-4 py-16">
        <div className="w-full max-w-4xl mx-auto bg-white">
          <Icon imageSize={42} textSize={21} />
          <div className="px-1">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl md:text-2xl font-semibold text-sky-900">Your Startups</h2>
              <AddStartupDialog />
            </div>

            {startups.length === 0 ? (
              <p className="text-center text-slate-600 text-base md:text-lg">
                You haven't added any startups yet.
              </p>
            ) : (
              <ul className="space-y-4">
                {startups.map((startup) => (
                  <li
                    key={startup.id}
                    className="p-4 border border-sky-200 rounded-lg bg-sky-50/50 hover:bg-sky-50 transition-colors duration-200"
                  >
                    <div className="flex flex-col gap-2">
                      <a
                        href={startup.startupLink}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-lg font-semibold text-sky-900 hover:text-sky-800 underline underline-offset-2"
                      >
                        {startup.startupName}
                      </a>
                      <div className="text-sm text-slate-600">
                        <span className="font-medium">Founder:</span> {startup.founderName}
                        {startup.founderXUsername && (
                          <>
                            {" "}
                            (
                            <a
                              href={`https://x.com/${startup.founderXUsername}`}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="text-sky-700 hover:text-sky-800 underline underline-offset-2"
                            >
                              @{startup.founderXUsername}
                            </a>
                            )
                          </>
                        )}
                      </div>
                      {startup.tags && startup.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {startup.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 text-xs font-medium bg-sky-100 text-sky-800 rounded-md"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

