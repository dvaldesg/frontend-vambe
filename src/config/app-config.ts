import packageJson from "../../package.json";

const currentYear = new Date().getFullYear();

export const APP_CONFIG = {
  name: "Vambe AI Dashboard",
  version: packageJson.version,
  copyright: `© ${currentYear}, Vambe AI Dashboard.`,
  meta: {
    title: "Vambe AI Dashboard",
    description:
      "Vambe AI Dashboard is a modern dashboard built with Next.js 15, Tailwind CSS v4, and shadcn/ui.",
  },
};
