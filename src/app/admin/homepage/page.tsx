'use server'

import { getHomePage } from "@/lib/actions/pages.actions";
import HomePageContentForm from "./components/HomePageContent";

export default async function Page() {
  const content = await getHomePage();
  return <HomePageContentForm content={content} />;
}
