
import { Inter } from "@next/font/google";
import styles from "../../app/page.module.css";
import Head from "next/head";
import Header from "../../components/common/Header.jsx";
import Footer from "../../components/common/footer.js";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../../components/common/layout";
import { Card, Col, Row } from "antd";
import { Image } from "antd";
import utilStyles from "../../assets/utils.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const router = useRouter();

    const [showBestRecipe, setShowBestRecipe] = useState([]);
    const [showRecommendRecipe, setShowRecommendRecipe] = useState([]);

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    //--------------------------------베스트 메뉴 시작
    useEffect(() => {
        const getBestRecipe = async () => {
            const res = await fetch(
                "/api/home/bestRecipe"
            );
            const data = await res.json();
            setShowBestRecipe(data.bestRecipe);
        };
        getBestRecipe();
    }, []);

    function renderBestMenuList(recipeList = [], des = "") {
        return recipeList.map((data, index) => (
            <Col span={8} key={index}>
                <Image src={data.image} alt={data.recommend} />
                <Card title={data.menuName} bordered={false}>
                    {des} : {data.recommend}
                </Card>
            </Col>
        ));
    }

    const bestRecipeWrapper = (
        <>
            <h2 className={utilStyles.plannerWrapperTitle}>베스트 메뉴</h2>
            <Row gutter={16} className={utilStyles.mealRow} wrap={false}>
                {renderBestMenuList(showBestRecipe, "추천수")}
            </Row>
        </>
    );
    
    //----------------------추천 메뉴 시작
    useEffect(() => {
        const getRecommendRecipe = async () => {
            const res = await fetch(
                "/api/home/recommendRecipe"
            );
            const data = await res.json();
            setShowRecommendRecipe(data.recommendRecipe);
        };
        getRecommendRecipe();
    }, []);

    function renderRecommendMenuList(recipeList = [], des = "") {
        return recipeList.map((data, index) => (
            <Col span={8} key={index}>
                <Image src={data.image} alt={data.summary} />
                <Card title={data.menuName} bordered={false}>
                    {data.summary}
                </Card>
            </Col>
        ));
    }

    const RecommendRecipeWrapper = (
        <>
            <h2 className={utilStyles.plannerWrapperTitle}>추천 메뉴</h2>
            <Row gutter={16} className={utilStyles.mealRow} wrap={false}>
                {renderRecommendMenuList(showRecommendRecipe, "")}
            </Row>
        </>
    );

    return (
      <>
        <Header></Header>

            <Layout>
                <Head>
                    <title>식단표 목록</title>
                </Head>
                <div>{bestRecipeWrapper}</div>
                <div>{RecommendRecipeWrapper}</div>
            </Layout>
        
        <Footer></Footer>
        </>

           
    );
}
