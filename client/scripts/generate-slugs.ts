// scripts/generate-slugs.ts
import { getAllHtmlGameSlug, getAllHtmlToolSlug, getAllPostSlug } from "@/features/games/service/get-slug";
import { saveFile } from "@/utils/saveFile";

async function main() {
  const slugs = await getAllHtmlGameSlug(); 
  saveFile(slugs, 'game.json')
  const slugsTool = await getAllHtmlToolSlug();
  saveFile(slugsTool, 'tool.json')
  const slugPost = await getAllPostSlug();
  saveFile(slugPost, 'post.json')
}

main();
