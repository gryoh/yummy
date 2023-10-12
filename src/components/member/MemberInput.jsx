import { Input } from "antd"
import styles from "./member.module.css";
export default function MemberInput(props, ref) {

    const parentEvent = (e) => {
        props.parentInputEvent(e);
    }

    return (
        <>
            <Input placeholder={props.placeholder} name={props.name} className={styles.input_member} onChange={parentEvent} type={props.type}/>
        </>  
    )
}