import { Image } from "antd";
import styles from "./mypage.module.css";


export default function MyIngredient(props) {
    // 아이콘 텍스트 분리 후 커스텀 필요
    return (
        <>
            <div className={styles.lateView_img_box}>
                <Image
                    width={100}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
            </div>
            <div>
                <p>구내식당 제육볶음 맛은 닭갈비 맛이랑 똑같아요</p>
            </div>
            
        </>
    )
}