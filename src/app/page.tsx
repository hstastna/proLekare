import { navItems } from "@/lib/constants";
import { redirect } from "next/navigation";
import { FC } from "react";

const Home: FC = () => {
  redirect(navItems.clanky.href);
};

export default Home;
