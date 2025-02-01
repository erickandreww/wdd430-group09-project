import { Merriweather, Lato, Roboto, Playfair_Display  } from "next/font/google";

export const merriweather = Merriweather({subsets: ['latin'], weight: ["300", "400", "700", "900"]})
export const lato = Lato({subsets: ['latin'], weight: ["300", "400", "700", "900", "100"]})
export const roboto = Roboto({subsets: ['latin'], weight: ["300", "400", "700", "900", "100", "500"]})
export const playfairDisplay = Playfair_Display({subsets: ['latin'], weight: ["400", "700", "900", "500", "600", "800"]})