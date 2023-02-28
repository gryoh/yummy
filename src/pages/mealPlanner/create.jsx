import Layout from "../../components/common/layout";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import utilStyles from "../../assets/utils.module.css";
import { Row, Col, Input, Image, Avatar, Button, List, Skeleton } from "antd";

const { Search } = Input;

// ant design Input 사용
// ant design List 사용

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
    const [selectedMpList, setSelectedMpList] = useState([]);

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

    /******** [S]상단에 선택된 메뉴들 노출 영역 그리기 ********/
    function renderAddMealPlannerList() {
        if(selectedMpList.length < 1){
            return (
                <div>아래에서 선택하여 추가해주세요</div>
            );
        }

        return selectedMpList.map((value, index) => (
            <Col span={8} key={index}>
                <img src={value.image} width={100} alt="식단추가" onClick={handlerRemoveMp} data-mpcd={value.mpCd} />
            </Col>
        ));
    }

    const handlerMealPlannerItem = (item) => {
        const clickedMpCd = item?.target.dataset.mpcd;
        const clickedMpName = item?.target.dataset.mpname;
        const clickedMpDescription = item?.target.dataset.mpdescription;
        const clickedMpImage = item?.target.dataset.mpimage;

        // 이미 등록된 레시피면 alert
        if(selectedMpList.filter(mp => mp.mpCd == clickedMpCd)?.length > 0){
            alert("이미 등록되어 있습니다");
            return false;
        }
        // 7개가 넘으면 alert
        if(selectedMpList.length > 6){
            alert("최대 7개까지 등록이 가능합니다");
            return false;
        }

        setSelectedMpList([{
            mpCd: clickedMpCd,
            name: clickedMpName,
            description: clickedMpDescription,
            image: clickedMpImage
        }, ...selectedMpList, ]);
    };

    const handlerRemoveMp = (item) => {
        console.log("handlerRemoveMp click", item);
        const clickedItemMpCd = item.target.dataset.mpcd;
        let tempSelectedMpList = [];
        selectedMpList.forEach((mpItem) => {
            if (mpItem.mpCd != clickedItemMpCd) {
                tempSelectedMpList.push(mpItem);
            }
        });

        setSelectedMpList(tempSelectedMpList);
    }

    const addMealPlannerComponent = renderAddMealPlannerList();
    const addMealPlannerComponentWrapper = (
        <>
            <h2 className={utilStyles.plannerWrapperTitle}>메뉴 추가({selectedMpList.length}/7)</h2>
            <Row gutter={16} className={utilStyles.mealRow} wrap={false}>
                {addMealPlannerComponent}
            </Row>
        </>
    );
    /******** [E]상단에 선택된 메뉴들 노출 영역 그리기 ********/

    /******** [S]검색 영역 그리기 및 검색 로직 ********/
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
                setInitLoading(false);
                setLastMpCd(result.lastMpCd);
            }
        );
    };


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
    /******** [E]검색 영역 그리기 및 검색 로직 ********/

    /******** [S]필터 영역 그리기 및 필터 로직 ********/
    const resultFilterComponet = (
        <>
            <div>필터영역</div>
        </>
    );
    /******** [E]필터 영역 그리기 및 필터 로직 ********/

    /******** [S]더보기 로직 ********/
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
        let paramPageIdx = pageIdx+1;
        fetch(`${getMealPlannerListUrl}?pageIdx=${paramPageIdx}&limit=3`)
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
    /******** [E]더보기 로직 ********/

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
                    <List.Item
                        extra={
                            <img
                                width={50}
                                alt="logo"
                                src="/images/add_button.png"
                                onClick={handlerMealPlannerItem}
                                data-mpcd={item.mpCd}
                                data-mpname={item.name}
                                data-mpdescription ={item.description}
                                data-mpimage={item.image}
                            />
                        }
                    >
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
