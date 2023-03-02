import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../../components/common/layout";
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space, Card } from 'antd';
import MyIngredient from "../../components/mypage/MyIngredient";
import { Row } from "antd";
import MyLoveRecipe from "../../components/mypage/MyLoveRecipe";
import LatestViewRecipe from "../../components/mypage/LatestViewRecipe";

export default function MyPage() {
    const [ingredienrList, setIngredienrList] = useState([]);
    const [loveRecipeList, setloveRecipeList] = useState([]);
    useEffect(() => {
        // 재려가져오기
        const getIngredienrList = async () => {
            const res = await fetch("/api/mypage/ingredient");
            const data = await res.json();

            setIngredienrList(data);
        };
        getIngredienrList();
        //레시피가져오기
        const getloveRecipeList = async () => {
            const res = await fetch("/api/mypage/loverecipe");
            const data = await res.json();

            setloveRecipeList(data);
        };
        getloveRecipeList();
       
    },[])
    const ingredienr = ingredienrList.map((ingredienr, index) => (
        <MyIngredient key={ingredienr.name} {...ingredienr} />
    ));
    const loveRecive = loveRecipeList.map((loveRecive, index) => (
        <MyLoveRecipe key={loveRecive.name} {...loveRecive} />
    ));
    
    const router = useRouter();
    if (router.isFallback) {
        return <div>Loading...</div>;
    }
    
    return (
        <Layout>
            <div>
                <h3>내정보</h3>
                <Avatar size={64} icon={<UserOutlined />} />
            </div>
            <div style={{margin: '20px 0'}}>
                <h3 style={{margin: '15px 0px 5px 0px'}}>최근 본 레시피</h3>
                <Card
                    bordered={true}
                    style={{width: '100%'}}
                >
                    <LatestViewRecipe/>
                </Card>
            </div>
            <div style={{margin: '20px 0'}}>
                <h3 style={{margin: '15px 0px 5px 0px'}}>찜한 레시피</h3>
                <Card
                    bordered={true}
                    style={{width: '100%'}}
                    bodyStyle={{padding: '10px'}}
                >
                      <Row wrap="ture">
                      {loveRecive}
                    </Row>
                </Card>
            </div>
            <div style={{margin: '20px 0'}}>
                <h3 style={{margin: '15px 0px 5px 0px'}}>내 재료</h3>
                <Card
                    bordered={true}
                    style={{width: '100%'}}
                    bodyStyle={{padding: '10px'}}
                >
                    <Row wrap="ture">
                        {ingredienr}
                    </Row>
                </Card>
            </div>
        </Layout>
    );
}
