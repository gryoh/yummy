import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../../components/common/layout";
import utilStyles from "../../assets/utils.module.css";
import Head from "next/head";
import { Card, Col, Row } from "antd";
import { Image } from "antd";


const getMealPlannerListUrl = `/mealPlanner/v1/mealPlannerList`; // jpa서버
export default function List() {
    const router = useRouter();
    const [mealPlannerList, setMealPlannerList] = useState([]);

    useEffect(() => {
        const getMealPlannerListAll = async () => {
            const res = await fetch(
                `${getMealPlannerListUrl}?page=0&size=10&mbrNo=1`
            );
            const data = await res.json();

            setMealPlannerList(data.content);
        };

        getMealPlannerListAll();
    }, []);

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <Layout>
            <Head>
                <title>식단표 목록</title>
            </Head>
            <div>
                {mealPlannerList?.map((mealPlanner, i) => (
                    <>
                    <h2 className={utilStyles.plannerWrapperTitle}>{mealPlanner?.mpName} / {mealPlanner?.mpDescription}</h2>
                    <Row gutter={16} className={utilStyles.mealRow} wrap={false} key={i}>
                        {mealPlanner.rcpBaseList?.map((rcp, j) => (
                            <Col span={8} key={j}>
                                <Image src={rcp.filePath + rcp.fileName} alt={rcp.rcpName} />
                                <Card title={rcp.rcpName} bordered={false}>
                                    {rcp.mpDescription}
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    </>
                ))}
            </div>
        </Layout>
    );
}
