import { Col, Row , Avatar, Space} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styles from "./mypage.module.css";

export default function MyPageHeader(props) {

    return (
        <>
            <Row className={styles.mypageHeader_box}>
                <Col span={12}>
                    <Avatar size={48} icon={<UserOutlined />} />
                    <span  className={styles.mypageHeader_name}>홍길동</span>
                </Col>
                <Col span={6}>
                    <p>4</p>
                    <p>레시피</p>
                </Col>
                <Col span={6}>
                    <p>28</p>
                    <p>재료</p>
                </Col>
            </Row>
        </>
    );

    

}