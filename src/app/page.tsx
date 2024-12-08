import Image from "next/image";
import styles from "./page.module.css";
import Homepage from "@/components/Homepage";
import WithTopNavBar from "@/components/layouts/WithTopNavBar";

export default function Home() {
    return (
        <div >
            <main>
                <WithTopNavBar>
                    <Homepage />
                </WithTopNavBar>
            </main>
        </div>
    );
}
