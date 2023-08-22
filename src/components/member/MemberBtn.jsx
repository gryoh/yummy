import { Button } from "antd";
import styles from "./member.module.css";

export default function MemberBtn(props, ref) {

    const parentEvent = () => {
        props.parentBtnEvent();
    }
   
    return (
        <>
            <Button type="primary" className={styles.btn_member} htmlType={props.type} onClick={parentEvent}>
                {props.name}
            </Button>
        </>  
    )
}