import localFont from "next/font/local";

export const geistSans = localFont({
    src: "./GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});

export const geistMono = localFont({
    src: "./GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const clashDisplay = localFont({
    src: "./ClashDisplay-Variable.ttf",
    variable: "--font-clash-display",
    weight: "100 900",
});

export const archivo = localFont({
    src: "./Archivo-Variable.ttf",
    variable: "--font-archivo",
    weight: "100 900",
})