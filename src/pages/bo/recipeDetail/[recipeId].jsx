import {Button, message, Upload, Form, Select} from 'antd';
import React, { useState, useEffect } from 'react';
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
    const [title, setTitle] = useState(data.name);
    const [ingreList, setIngreList] = useState([]);
    const [contentValue, setContentValue] = useState('');
    /*const makeRecipe = () => {
        let cnt = recipeList[recipeList.length-1].id
        setRecipeList(recipeList.concat({
            id: ++cnt,
            text: ''
        }))
    }*/

    async function save() {
        console.log(ingreList)
        console.log(title)
        console.log(contentValue)

        // axios.post(`${apiUrl}/posts/`, {
        //     ingreList : ingreList,
        //     title : title,
        //     contentValue : contentValue,}).then(() => {
        //     //navigate('../');
        // })

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
                <Form.Item label="레시피명" style={{fontWeight: "bold"}}>
                    <Input name="title" value={title}/>
                </Form.Item>
                <Form.Item label="종류" style={{fontWeight: "bold"}}>
                    <Select
                        name = "type"
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
                          <Select.Option key={data.value} value={data.value}>{data.label}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                {/*<Form.Item style={{marginTop:0}} label="">*/}
                    <Ingredients ingreOptions={ingreOptions} ingreList={ingreList} setIngreList={setIngreList}>
                    </Ingredients>
                {/*</Form.Item>*/}
                {/*<Recipe recipeList={recipeList} setRecipeList={setRecipeList}>
                </Recipe>*/}
                <Form.Item
                    label="레시피"
                    style={{
                        marginBottom: 0, fontWeight: 'bold'
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


