import Link from "next/link";
import styles from "./postCard.module.css";
import Image from "next/image";
import { API_URL } from "@/constants/api";

export default function LibraryCard({ librarys }) {
  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-semibold text-3xl p-2"> Library </h1>
        <button>
          <Link href="/library/add" className="custom-primary-btn">
            Add Document
          </Link>
        </button>
      </div>

      <hr className="my-5" />
      {librarys.map((library, key) => (
        <div className={styles.container} key={key}>
          <div className={styles.top}>
            <div className={styles.imgContainer}>
              <Image
                src={`${API_URL}/${library.id}.jpg`}
                alt=""
                fill
                className={styles.img}
              />
            </div>
            <span className={styles.date}>01.01.2024</span>
          </div>
          <div className={styles.bottom}>
            <h1 className={styles.title}>{library.name}</h1>
            <p className={styles.desc}>{library.description}</p>
            <Link className={styles.link} href={`${API_URL}/${library.id}.jpg`} target="_blank">
              READ MORE
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
