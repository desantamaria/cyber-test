import { auth } from "@/auth";
import NavBar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import "../../globals.css";
import { use } from "react";

export const metadata: Metadata = {
  title: "Projects",
  description: "LLM Evaluation Platform",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}>) {
  const session = await auth();
  const { id } = await params;
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="w-screen h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar session={session!} projectId={id} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
