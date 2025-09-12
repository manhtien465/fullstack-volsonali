import { getCategories } from "@/services/postService";
import CategoryButton from "./category-button";

export async function CategorySelect({ currentCategory }: { currentCategory: string }) {
  const data = await getCategories();
  const categories = data?.data;
  if (!categories) return null;

  return (
    <>

      {categories.map((cat) => (
        <CategoryButton
          key={cat.slug}
          value={cat.slug}
        >
          <span className="text-sm">{cat.title}</span>
        </CategoryButton>
      ))}
    </>
  );
}
