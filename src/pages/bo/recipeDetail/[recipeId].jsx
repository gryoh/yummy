import {Button, message, Upload, Form, Select} from 'antd';
import React, { useState } from 'react';
import Recipe from "../../../components/bo/recipe/Recipe";
import CustomLayout from "../../../components/common/layout";
import { Input } from 'antd';
import Head from "next/head";
import Ingredients from "../../../components/bo/recipe/Ingredients";
import Link from "next/link";

export async function getServerSideProps({ params, req }) {
    return {
        props: {
            params,
        },
    };
}

export default function RecipeId ({params}) {

    const [recipeList, setRecipeList] = useState([{id: 1, text: ''}]);
    const [ingreList, setIngreList] = useState([{id: 1, name: '', cnt: ''}]);
    const makeRecipe = () => {
        let cnt = recipeList[recipeList.length-1].id
        setRecipeList(recipeList.concat({
            id: ++cnt,
            text: ''
        }))
    }

    const makeIngre = () => {
        let id = ingreList[ingreList.length-1].id
        setIngreList(ingreList.concat({
            id: ++id,
            name: '',
            cnt:''
        }))
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
                    <Input value={params.recipeId}/>
                </Form.Item>
                <Form.Item label="종류">
                    <Select
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
                        options={[
                            {
                                value: '1',
                                label: '중식1',
                            },
                            {
                                value: '2',
                                label: '양식',
                            },
                            {
                                value: '3',
                                label: '한식',
                            }
                        ]}
                    />
                </Form.Item>
                <Ingredients ingreList={ingreList} setIngreList={setIngreList}>
                </Ingredients>
                <Form.Item label=":">
                    <Button onClick={makeIngre} type="primary" style={{width: '100%'}} ghost>
                        재료 추가
                    </Button>
                </Form.Item>
                <Recipe recipeList={recipeList} setRecipeList={setRecipeList}>
                </Recipe>
                <Form.Item label=":">
                    <Button onClick={makeRecipe} type="primary" style={{width: '100%'}} ghost>
                        레시피 추가
                    </Button>
                </Form.Item>
            </Form>
            <Link href="/bo/recipeList">
                <Button type="primary" style={{width: '45%', margin: '0 8px'}} ghost>
                    취소
                </Button>
            </Link>
            <Button type="primary" style={{width: '45%', margin: '0 8px'}} ghost>
                저장
            </Button>
        </CustomLayout>
    );
};


