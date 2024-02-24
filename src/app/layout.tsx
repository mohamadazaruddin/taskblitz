"use client";
import { Inter } from "next/font/google";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { theme } from "./styles/theme";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChakraProvider theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          {children}
        </ChakraProvider>
      </body>
    </html>
  );
}
