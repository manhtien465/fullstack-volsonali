import { getLandingPage } from "@/data/loaders";
import { BlockRenderer } from "@/components/block-renderer";

export default async function Home() {
  const data = await getLandingPage();
  console.log("landingpage",data)
  const blocks = data?.data?.blocks;
  if (!blocks) return null;
  return <div>{blocks ? <BlockRenderer blocks={blocks} /> : null}</div>;
}
