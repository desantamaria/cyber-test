import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import "../globals.css";
import { auth } from "@/auth";
import NavBar from "@/components/navbar";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Cyber Trust",
  description: "LLM Evaluation Platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="w-screen h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar session={session!} />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
