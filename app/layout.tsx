import type { Metadata } from "next";
import { headers } from "next/headers";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ModalRoot } from "@/components/ui/modal";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "In-Deal",
  description: "In-Deal, your trusted industrial guide.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headersList = headers();
  const locale = (await headersList).get("x-locale") ?? "en";

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={roboto.variable}>
        {children}
        <ModalRoot />
      </body>
    </html>
  );
}
