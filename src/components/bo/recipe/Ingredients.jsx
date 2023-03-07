import React,{useState} from "react";
import {Space, Button, Input, Upload, message, Form} from "antd";
import TextArea from "antd/lib/input/TextArea";

export default function Ingredients(props){

    const removeIngre = (id) => {

        if ( props.ingreList.length == 1){
            alert('삭제할 수 없습니다.')
            return;
        }

        let countIngre = props.ingreList.filter((data) => data.id !== Number(id))
        props.setIngreList(
            countIngre
        );
    }

    return (
        <Form.Item
            label="재료"
            style={{
                marginBottom: 0,
            }}
        >
            {props.ingreList && props.ingreList.map((item, i) => (
                <Form.Item key={item.id}>
                    <Form.Item
                        name={`ingreName${item.id}`}
                        style={{
                            display: 'inline-block',
                            width: 'calc(50% - 8px)',
                        }}
                    >
                        <Input placeholder="재료명" value={item.name}/>
                    </Form.Item>
                    <Form.Item
                        name={`ingreCnt${item.id}`}
                        rules={[
                            {
                                required: false,
                            },
                        ]}
                        style={{
                            display: 'inline-block',
                            width: 'calc(30% - 8px)',
                            margin: '0 8px',
                        }}
                    >
                    <   Input placeholder="수량" value={item.cnt}/>
                    </Form.Item>
                    <Form.Item
                        name="month"
                        rules={[
                            {
                                required: false,
                            },
                        ]}
                        style={{
                            display: 'inline-block',
                            width: 'calc(10% - 8px)',
                            margin: '0 8px',
                        }}
                    >
                    <Button onClick={(event) => removeIngre(item.id)} type="primary" style={{width: '100%'}} ghost>
                    -
                    </Button>
                    </Form.Item>
                </Form.Item>
            ))}
        </Form.Item>
    )
}