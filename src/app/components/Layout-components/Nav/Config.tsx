import { HomeIcon, SparklesIcon, FolderIcon } from "@heroicons/react/20/solid";

export const items = [
  {
    title: "Dashboard",
    href: "/",
    icon: <HomeIcon className="h-6 w-6" />,
  },
  {
    title: "Collection",
    href: "/collection",
    icon: <FolderIcon className="h-6 w-6" />,
  },
  {
    title: "Wishlist",
    href: "/wishlist",
    icon: <SparklesIcon className="h-6 w-6" />,
  },
];
