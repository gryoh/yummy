import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../../components/common/layout";
import utilStyles from "../../assets/utils.module.css";
import Head from "next/head";
import { Card, Col, Row } from "antd";

export default function List() {
    const router = useRouter();
    const [thisWeekMealPlannerList, setThisWeekMealPlannerList] = useState([]);
    const [lastWeekMealPlannerList, setLastWeekMealPlannerList] = useState([]);
    const [beforeLastWeekMealPlannerList, setBeforeLastWeekMealPlannerList] =
        useState([]);

    useEffect(() => {
        const getThisWeekMealPlannerList = async () => {
            const res = await fetch("/api/mealPlanner/mealPlannerList?day=0");
            const data = await res.json();

            console.log("res", res);
            setThisWeekMealPlannerList(data);
        };

        getThisWeekMealPlannerList();
    }, []);

    useEffect(() => {
        const getLastWeekMealPlannerList = async () => {
            const res = await fetch("/api/mealPlanner/mealPlannerList?day=1");
            const data = await res.json();

            console.log("res", res);
            setLastWeekMealPlannerList(data);
        };

        getLastWeekMealPlannerList();
    }, []);

    useEffect(() => {
        const getBeforeLastWeekMealPlannerList = async () => {
            const res = await fetch("/api/mealPlanner/mealPlannerList?day=2");
            const data = await res.json();

            console.log("res", res);
            setBeforeLastWeekMealPlannerList(data);
        };

        getBeforeLastWeekMealPlannerList();
    }, []);

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    const thisWeekMealPlannersComponent = thisWeekMealPlannerList.map(
        (mealPlanner, index) => (
            <>
                <Col span={8}>
                    <Card title={mealPlanner.name} bordered={false}>
                        {mealPlanner.description}
                    </Card>
                </Col>
            </>
        )
    );
    const lastWeekMealPlannersComponent = lastWeekMealPlannerList.map(
        (mealPlanner, index) => (
            <>
                <Col span={8}>
                    <Card title={mealPlanner.name} bordered={false}>
                        {mealPlanner.description}
                    </Card>
                </Col>
            </>
        )
    );
    const beforeLastWeekMealPlannersComponent =
        beforeLastWeekMealPlannerList.map((mealPlanner, index) => (
            <>
                <Col span={8}>
                    <Card title={mealPlanner.name} bordered={false}>
                        {mealPlanner.description}
                    </Card>
                </Col>
            </>
        ));

    const thisWeekMealPlannersWrapper = (
        <>
            <h2 className={utilStyles.plannerWrapperTitle}>이번주 식단</h2>
            <Row gutter={16}>{thisWeekMealPlannersComponent}</Row>
        </>
    );

    const lastWeekMealPlannersWrapper = (
        <>
            <h2 className={utilStyles.plannerWrapperTitle}>지난주 식단</h2>
            <Row gutter={16}>{lastWeekMealPlannersComponent}</Row>
        </>
    );

    const beforeLastWeekMealPlannersWrapper = (
        <>
            <h2 className={utilStyles.plannerWrapperTitle}>지지난주 식단</h2>
            <Row gutter={16}>{beforeLastWeekMealPlannersComponent}</Row>
        </>
    );

    return (
        <Layout>
            <Head>
                <title>식단표 목록</title>
            </Head>
            <div>{thisWeekMealPlannersWrapper}</div>
            <div>{lastWeekMealPlannersWrapper}</div>
            <div>{beforeLastWeekMealPlannersWrapper}</div>
        </Layout>
    );
}
