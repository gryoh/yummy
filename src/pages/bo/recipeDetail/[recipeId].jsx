import {Button, message, Upload, Form, Select} from 'antd';
import React, { useState } from 'react';
import Recipe from "../../../components/bo/recipe/Recipe";
import CustomLayout from "../../../components/common/layout";
import { Input } from 'antd';
import Head from "next/head";
import Ingredients from "../../../components/bo/recipe/Ingredients";
import Link from "next/link";
import TextEditor from "../../../components/bo/recipe/TextEditor";

export async function getServerSideProps({params}) {
    let data = {};
        await fetch(`http://localhost:3000/api/bo/recipeData?recipeId=${params.recipeId}`)
            .then((res) => res.json())
            .then((results) => {
                    data = results;
        })

    let ingreOptions = {};
        await fetch(`http://localhost:3000/api/bo/recipeData?recipeId=ingre`)
        .then((res) => res.json())
        .then((results) => {
            ingreOptions = results;
        })

    let type = {};
    await fetch(`http://localhost:3000/api/bo/recipeData?recipeId=type`)
        .then((res) => res.json())
        .then((results) => {
            type = results;
        })

    return {
        props: {
            data,
            type,
            ingreOptions,
        },
    };
}

export default function RecipeId ({data, type, ingreOptions}) {
    /*const [recipeList, setRecipeList] = useState([{id: 1, text: ''}]);*/
    const [ingreList, setIngreList] = useState([]);
    const [contentValue, setContentValue] = useState('');
    const [form, setForm] = useState(
        {
            title : '',
            ingre : [],
            type : '',
            content :''
        }
    );
    /*const makeRecipe = () => {
        let cnt = recipeList[recipeList.length-1].id
        setRecipeList(recipeList.concat({
            id: ++cnt,
            text: ''
        }))
    }*/

    const makeIngre = () => {
        let id = 1;

        if ( ingreList.length > 0) {
            id = ingreList[ingreList.length-1].id +1
        }

        setIngreList(ingreList.concat({
            id: id,
            name: '',
            cnt:''
        }))
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        })
    }

    async function save() {
        //const formData = new FormData();
        //formData.append('img', file); // formData는 키-밸류 구조
        // 백엔드 multer라우터에 이미지를 보낸다.
        console.log(ingreList)
        console.log(contentValue)
        console.log(form)

    }

    return (
        <CustomLayout>
            <Head>
                <title>타이틀</title>
            </Head>
            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                style={{
                    maxWidth: 1000,
                }}
            >
                <Form.Item label="레시피명">
                    <Input name="title" value={data.name} onChange={handleChange}/>
                </Form.Item>
                <Form.Item label="종류">
                    <Select
                        name = "type"
                        value ={data.value}
                        onChange={handleChange}
                        defaultValue={data.typekey}
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
                    >
                        {type.data.map(data => (
                          <option value={data.value}>{data.label}</option>
                        ))}
                    </Select>
                </Form.Item>
                <Ingredients ingreOptions={ingreOptions} ingreList={ingreList} setIngreList={setIngreList}>
                </Ingredients>
                <Form.Item label=":">
                    <Button onClick={makeIngre} type="primary" style={{width: '100%'}} ghost>
                        재료 추가
                    </Button>
                </Form.Item>
                {/*<Recipe recipeList={recipeList} setRecipeList={setRecipeList}>
                </Recipe>*/}
                <Form.Item
                    label="레시피"
                    style={{
                        marginBottom: 0,
                    }}
                >
                    <Form.Item>
                        <TextEditor contentValue={contentValue} setContentValue={setContentValue}/>
                    </Form.Item>
                </Form.Item>
                {/*<Form.Item label=":">*/}
                {/*    <Button onClick={makeRecipe} type="primary" style={{width: '100%'}} ghost>*/}
                {/*        레시피 추가*/}
                {/*    </Button>*/}
                {/*</Form.Item>*/}
            </Form>
            <Link href="/bo/recipeList">
                <Button type="primary" style={{width: '45%', margin: '0 8px'}} ghost>
                    취소
                </Button>
            </Link>
            <Button type="primary" style={{width: '45%', margin: '0 8px'}} ghost onClick={save}>
                저장
            </Button>
        </CustomLayout>
    );
};


