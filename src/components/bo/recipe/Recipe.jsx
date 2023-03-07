import React,{useState} from "react";
import {Space, Button, Input, Upload, message, Form} from "antd";
import TextArea from "antd/lib/input/TextArea";
import {LoadingOutlined, PlusOutlined} from "@ant-design/icons";


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

    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                업로드
            </div>
        </div>
    );

    const removeRecipe = (id) => {

        if ( props.recipeList.length == 1){
            alert('삭제할 수 없습니다.')
            return;
        }
        let countRecipe = props.recipeList.filter((data) => data.id !== Number(id))

        props.setRecipeList(
            countRecipe
        );
    }

    return (
        <Form.Item
            label="레시피"
            style={{
                marginBottom: 0,
            }}
        >
            {props.recipeList && props.recipeList.map((item, i) => (
                <Form.Item key={item.id}>
                    <Form.Item
                        name={`content${item.id}`}
                        style={{
                            display: 'inline-block',
                            width: 'calc(65% - 8px)',
                        }}
                    >
                        <TextArea
                            showCount
                            maxLength={100}
                            style={{
                                height: 120,
                                resize: 'none',
                            }}
                            onChange={onChange}
                            placeholder=""
                            value={item.text}
                        />
                        {/*<textarea value={item.text} rows='10' cols='45' />*/}
                    </Form.Item>
                    <Form.Item
                        name=""
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        style={{
                            display: 'inline-block',
                            width: 'calc(25% - 8px)',
                            margin: '0 8px',
                        }}
                    >
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                        >
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt="avatar"
                                    style={{
                                        width: '100%',
                                    }}
                                />
                            ) : (
                                uploadButton
                            )}
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        name=""
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                        style={{
                            display: 'inline-block',
                            width: 'calc(5% - 8px)',
                            margin: '0 8px',
                        }}
                    >
                        <Button onClick={(event) => removeRecipe(item.id)} type="primary" ghost>
                            -
                        </Button>
                    </Form.Item>
                </Form.Item>
            ))}
        </Form.Item>
    )
}