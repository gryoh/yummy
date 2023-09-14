import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import Header from "../components/common/Header.jsx";
import Footer from "../components/common/footer.js";
import Config from "../../configs/config.export";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    return (
        <main className={styles.main}>
            <Header></Header>
            <div>메인 내용444</div>
            <div>{Config().mode}</div>
            <Footer></Footer>
        </main>
    );
}
