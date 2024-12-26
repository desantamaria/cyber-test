import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  return (
    <div>
      <main>
        {!session ? (
          <div>
            <p>Cyber Trust</p>
            <a href="/api/auth/signin">Sign in</a>
          </div>
        ) : (
          <div>
            <a href="/api/auth/signout">Sign out</a>
          </div>
        )}
      </main>
    </div>
  );
}
