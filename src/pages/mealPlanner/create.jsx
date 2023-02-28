import Layout from "../../components/common/layout";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import utilStyles from "../../assets/utils.module.css";
import { Row, Col, Input, Image, Avatar, Button, List, Skeleton } from "antd";

const { Search } = Input;

const getMealPlannerListUrl = `/api/mealPlanner/mealPlannerList`;

export default function Create() {
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);
    const [day, setDay] = useState(0);
    const [pageIdx, setPageIdx] = useState(1);
    const [lastMpCd, setLastMpCd] = useState(0);
    const [isLastData, setIsLastData] = useState(false);

    useEffect(() => {
        const getMealPlannerList = async () => {
            const res = await fetch(
                `${getMealPlannerListUrl}?pageIdx=${pageIdx}&limit=3`
            );
            const data = await res.json();
            const result = data.result;

            setInitLoading(false);
            setData(result);
            setList(result);
            setLastMpCd(result.lastMpCd);

            let tempPageIdx = pageIdx;
            setPageIdx(++tempPageIdx);
        };

        getMealPlannerList();
    }, []);

    function renderAddMealPlannerList() {
        return [...Array(3)].map((index) => (
            <Col span={8} key={index}>
                <Image src="/images/add_button.png" width={50} alt="식단추가" />
            </Col>
        ));
    }

    const saerchMealPlanner = async (conditions) => {
        const res = await fetch(
            `${getMealPlannerListUrl}?name=${conditions.mpName}&pageIdx=${conditions.pageIdx}&limit=3`
        );
        const data = await res.json();
        const result = data.result;
        setData(result);
        setList(result);

        return result;
    };

    const onSearch = (value) => {
        setPageIdx(1);

        saerchMealPlanner({ day: 0, mpName: value, pageIdx: 1 }).then(
            (result) => {
                console.log("result", result);
                setInitLoading(false);
                setLastMpCd(result.lastMpCd);

                let tempPageIdx = pageIdx;
                setPageIdx(++tempPageIdx);
            }
        );
    };

    const addMealPlannerComponent = renderAddMealPlannerList();

    const addMealPlannerComponentWrapper = (
        <>
            <h2 className={utilStyles.plannerWrapperTitle}>메뉴 추가</h2>
            <Row gutter={16} className={utilStyles.mealRow} wrap={false}>
                {addMealPlannerComponent}
            </Row>
        </>
    );

    const searchComponet = (
        <div>
            <Search
                placeholder="메뉴를 입력해주세요"
                allowClear
                onSearch={onSearch}
                style={{ width: 200 }}
                //enterButton
            />
        </div>
    );

    const resultFilterComponet = (
        <>
            <div>필터영역</div>
        </>
    );

    const onLoadMore = () => {
        setLoading(true);
        setList(
            data.concat(
                [...new Array(3)].map(() => ({
                    loading: true,
                    name: "",
                    description: "",
                    image: "",
                }))
            )
        );
        fetch(`${getMealPlannerListUrl}?pageIdx=${pageIdx}&limit=3`)
            .then((res) => res.json())
            .then((res) => {
                const result = data.concat(res.result);

                setData(result);
                setList(result);
                setLastMpCd(result.lastMpCd);
                setLoading(false);

                let tempPageIdx = pageIdx;
                setPageIdx(++tempPageIdx);

                if (result.find((mp) => mp.mpCd == res.lastMpCd)) {
                    console.log("더이상 없음");
                    setIsLastData(true);
                }

                window.dispatchEvent(new Event("resize"));
            });
    };

    const loadMore =
        !initLoading && !loading && !isLastData ? (
            <div
                style={{
                    textAlign: "center",
                    marginTop: 12,
                    height: 32,
                    lineHeight: "32px",
                }}
            >
                <Button onClick={onLoadMore}>더보기</Button>
            </div>
        ) : null;

    const resultListComponet = (
        <>
            <div>검색결과({list.length})</div>
            <List
                className="demo-loadmore-list"
                loading={initLoading}
                itemLayout="vertical"
                loadMore={loadMore}
                dataSource={list}
                renderItem={(item) => (
                    <List.Item>
                        <Skeleton
                            avatar
                            title={false}
                            loading={item.loading}
                            active
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={item.image} />}
                                title={
                                    <Link href="/recipe/1">{item.name}</Link>
                                }
                                description={item.description}
                            />
                            {/* <div>{item.description}</div> */}
                        </Skeleton>
                    </List.Item>
                )}
            />
        </>
    );

    return (
        <Layout>
            <Head>
                <title>식단표 목록</title>
            </Head>
            <div className={utilStyles.mb20}>
                {addMealPlannerComponentWrapper}
            </div>
            <div className={utilStyles.mb20}>{searchComponet}</div>
            <div className={utilStyles.mb20}>{resultFilterComponet}</div>
            <div>{resultListComponet}</div>
        </Layout>
    );
}
