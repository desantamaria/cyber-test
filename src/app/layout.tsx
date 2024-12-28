import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import "./globals.css";
import { auth } from "@/auth";
import NavBar from "@/components/navbar";

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
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NavBar session={session!} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
