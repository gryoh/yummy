import React,{useState} from "react";
import {Space, Button, Input, Upload, message, Form} from "antd";
import TextArea from "antd/lib/input/TextArea";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import TextEditor from "./TextEditor";


const onChange = (e) => {
    console.log('Change:', e.target.fileList);
};
const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};

export default function Recipe(props){

    return (
        <Form.Item
            label="레시피"
            style={{
                marginBottom: 0, fontWeight: "bold",
            }}
        >
            <Form.Item>
                <TextEditor />
            </Form.Item>
        </Form.Item>
    )
}