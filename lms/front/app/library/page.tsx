import LibraryCard from "@/common/components/library/index";
import getLibrarys from "@/common/action/docs.api"
import styles from "./blog.module.css";

export default async function libraryPage() {
  const librarys = await getLibrarys()
  return (
    <div >
      <LibraryCard librarys={librarys}/>
    </div>
  );
}
