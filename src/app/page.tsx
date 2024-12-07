import Image from "next/image";
import styles from "./page.module.css";
import Homepage from "@/components/Homepage";
import WithTopNavBar from "@/components/layouts/WithTopNavBar";

export default function Home() {
    return (
        <div className={styles.page}>
            <main >
                <WithTopNavBar>
                    <Homepage />
                </WithTopNavBar>
            </main>
        </div>
    );
}
