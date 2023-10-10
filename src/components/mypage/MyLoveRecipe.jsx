import { Card, Col } from 'antd';
import Image from 'next/image';
const { Meta } = Card;

export default function MyLoveRecipe(props) {

    return (
        <>
            <Col span={8} style={{width: '100%',padding: '5px'}}>
                <Card
                    hoverable
                    style={{width: '100%', height:'150px'}}
                    cover={<img style={{width: '100%', height:'90px'}} alt={props.fileName} src={props.filePath}/>
                    }
                    bodyStyle={{padding:'10px', fontSize: '10px'}}
                    >
                    <Meta
                        style={{fontSize: '10px', margin: '0px'}}
                        title={props.rcpName}
                        description={
                            <span>
                            <img style={{width: '10px', display:'inline-block'}} alt="별점" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJDl8d9OEA-kKEwWVx-tVPROFry3I3tBddUg&usqp=CAU"/>
                            {props.point} ({props.viewCount})
                            </span>
                        }
                    />
                </Card>
            </Col>
        </>
    );

    

}