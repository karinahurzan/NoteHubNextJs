import Link from "next/link";
import css from "./SidebarNotes.module.css";
import { NOTES_FILTER_ALL, NOTES_FILTER_CATEGORIES } from "@/lib/constants";

export default function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <Link
          href={`/notes/filter/${NOTES_FILTER_ALL}`}
          className={css.menuLink}
        >
          All notes
        </Link>
      </li>
      {NOTES_FILTER_CATEGORIES.map((category, i) => (
        <li className={css.menuItem} key={"SideBarMenu" + i}>
          <Link href={`/notes/filter/${category}`} className={css.menuLink}>
            {category}
          </Link>
        </li>
      ))}
    </ul>
  );
}
