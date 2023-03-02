import { Image } from "antd";
import styles from "./mypage.module.css";


export default function MyIngredient(props) {
    // 아이콘 텍스트 분리 후 커스텀 필요
    return (
        <>
            <div className={styles.lateView_img_box}>
                <Image
                    width={'100px'}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
            </div>
            <div className={styles.lateView_cont_box}>
                <p className={styles.lateView_title_box}>구내식당 제육볶음 맛은 닭갈비 맛이랑 똑같아요</p>
                <p className={styles.lateView_writer_box}>by 더푸드캐슬</p>
                <p>
                    <img style={{width: '10px', display:'inline-block'}} alt="별점" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJDl8d9OEA-kKEwWVx-tVPROFry3I3tBddUg&usqp=CAU"/>
                    <span>4.75(869)</span>
                    &nbsp; &nbsp;
                    <span>조회수 1,444</span>
                </p>
            </div>
            
        </>
    )
}