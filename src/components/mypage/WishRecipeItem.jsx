import { Image } from "antd";
import styles from "./mypage.module.css";
import { Card } from 'antd';

export default function WishRecipeItem(props) {
    // 아이콘 텍스트 분리 후 커스텀 필요
    return (
        <>
             <Card
                style={{
                margin: 5,
                }}
                bodyStyle={{padding:'10px'}}
            >
                <div className={styles.lateView_img_box}>
                <Image
                    width={'100px'}
                    height={'80px'}
                    src={props.imgUrl}
                />
                </div>
                <div className={styles.lateView_cont_box}>
                    <p className={styles.lateView_title_box}>{props.name}</p>
                    <p className={styles.lateView_writer_box}>by {props.writer}</p>
                    <p>
                        <img style={{width: '10px', display:'inline-block'}} alt="별점" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJDl8d9OEA-kKEwWVx-tVPROFry3I3tBddUg&usqp=CAU"/>
                        <span>{props.point}({props.reviewCnt})</span>
                        &nbsp; &nbsp;
                        <span>조회수 {props.viewCnt}</span>
                    </p>
                </div>
                <div className={styles.wishlist_btn_box}>
                    <Image
                        width={'20px'}
                        height={'20px'}
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRecIxNxNBLvXCvb4rYDgbfIYNE5d9VaaGdBg&usqp=CAU'
                    />
                </div>
            </Card>
        </>
    )
}