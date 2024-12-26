import { auth } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await auth();
  return (
    <div>
      <main>
        {!session ? (
          <div className="w-screen h-screen flex flex-col gap-3 justify-center items-center">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Cyber Trust
            </h1>
            <Button asChild>
              <a href="/api/auth/signin">Sign in</a>
            </Button>
          </div>
        ) : (
          <div className="w-screen h-screen flex flex-col gap-3 justify-center items-center">
            <Button asChild>
              <a href="/api/auth/signout">Sign out</a>
            </Button>
          </div>
        )}
      </main>
    </div>
  );
}
