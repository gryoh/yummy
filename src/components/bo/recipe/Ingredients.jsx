import React,{useState} from "react";
import {Space, Button, Input, Upload, message, Form, Select} from "antd";
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

    const onChange = (id, value, type) => {
        let tempIngreList = props.ingreList;
        let ingreList = tempIngreList.map(data => {
            if(data.id == Number(id)){
                let arr = {};
                if ( type == 'name'){
                    arr = {
                        id: data.id,
                        name: value,
                        cnt: data.cnt
                    }
                } else {
                    arr = {
                        id: data.id,
                        name: data.name,
                        cnt: value
                    }
                }
                return arr
            }
            return data;
        });
        props.setIngreList(ingreList);
    };

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
                        style={{
                            display: 'inline-block',
                            width: 'calc(50% - 8px)',
                        }}
                    >
                        {/*<Input placeholder="재료명" value={item.name}/>*/}
                        <Select
                            // defaultValue={ingreOptions.typekey}
                            id = {item.id}
                            showSearch
                            style={{
                                width: 200,
                            }}
                            placeholder=""
                            optionFilterProp="children"
                            filterOption={(input, option) => (option?.label ?? '').includes(input)}
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            options={
                                props.ingreOptions.data
                            }
                            onChange={(e) => nameChange(item.id, e , 'name')}
                        />
                    </Form.Item>
                    <Form.Item
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
                        <Input placeholder="수량" value={item.cnt}  onChange={(e) => nameChange(item.id, e , 'cnt')}/>
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