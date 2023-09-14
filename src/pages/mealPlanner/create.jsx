import Layout from "../../components/common/layout";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import utilStyles from "../../assets/utils.module.css";
import {Row, Col, Input, Image, Avatar, Button, List, Skeleton, Space} from "antd";
import {PlusOutlined, CloseOutlined} from "@ant-design/icons";
import {debug} from "util";
import FilterArea from "../../components/mealPlanner/FilterArea";

const { Search } = Input;

// ant design Input 사용
// ant design List 사용

//const getRecipeListUrl = `/api/mealPlanner/mealPlannerList`; // 동일 프로젝트
//const getRecipeListUrl = `http://gryoh.synology.me:8083/v1/mbrList`; // jpa서버
const getRecipeListUrl = `/rcp/v1/recipeList`; // jpa서버
const saveMealPlannerListUrl = `/mealPlanner/v1/insertMealPlanner`; // jpa서버
const size = 3; // 한번에 조회할 갯수
export default function Create() {
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);
    const [listCnt, setListCnt] = useState(0);
    const [page, setPage] = useState(1);
    const [lastRcpNo, setLastRcpNo] = useState(0);
    const [isLastData, setIsLastData] = useState(false);
    const [selectedRcpList, setSelectedRcpList] = useState([]);

    useEffect(() => {
        const getMealPlannerList = async () => {
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

            const res = await fetch(
                `${getRecipeListUrl}?page=${page}&size=${size}`
            ).finally(() => {
                setLoading(true);
            });

            const resultData = await res.json();
            const result = resultData.content;

            setInitLoading(false);
            setData(result);
            setList(result);
            setLastRcpNo(result?.lastRcpNo);

            let tempPage = page;
            setPage(++tempPage);
        };

        getMealPlannerList();
    }, []);

    useEffect(() => {
        const count = list.find(l => !!l.loading)?.length;
        setListCnt(count ? count : 0);
    }, [list]);

    /******** [S]상단에 선택된 메뉴들 노출 영역 그리기 ********/
    function renderAddMealPlannerList() {
        if(selectedRcpList.length < 1){
            return (
                <div className={utilStyles.noMealList}>아래에서 선택하여 추가해주세요</div>
            );
        }

        return selectedRcpList.map((value, index) => (
            <Col span={8} key={index}>
                <CloseOutlined onClick={handlerRemoveRcp} data-rcpno={value.rcpNo} className={utilStyles.mealListRemoveBtn}/>
                <img src={value.image} width="100%" alt={value.name} onClick={handlerRemoveRcp} data-rcpno={value.rcpNo} />
            </Col>
        ));
    }

    const handlerMealPlannerItem = (item) => {
        const clickedRcpNo = item?.currentTarget.dataset.rcpno;
        const clickedRcpName = item?.currentTarget.dataset.rcpname;
        const clickedRcpDescription = item?.currentTarget.dataset.rcpdescription;
        const clickedRcpImage = item?.currentTarget.dataset.rcpimage;

        // 이미 등록된 레시피면 alert
        if(selectedRcpList.filter(rcp => rcp.rcpNo === clickedRcpNo).length > 0){
            alert("이미 선택되어 있습니다");
            return false;
        }
        // 7개가 넘으면 alert
        if(selectedRcpList.length > 6){
            alert("최대 7개까지 등록이 가능합니다");
            return false;
        }

        setSelectedRcpList([{
            rcpNo: clickedRcpNo,
            name: clickedRcpName,
            description: clickedRcpDescription,
            image: clickedRcpImage,
            selected: true
        }, ...selectedRcpList, ]);
    };

    const handlerRemoveRcp = (item) => {
        console.log("handlerRemoveRcp click", item);
        const clickedItemRcpNo = item.currentTarget.dataset.rcpNo;
        let tempSelectedRcpList = [];
        selectedRcpList.forEach((rcpItem) => {
            if (rcpItem.rcpNo !== clickedItemRcpNo) {
                tempSelectedRcpList.push(rcpItem);
            }else{
                //todo 해당 조건이 맞으면 검새한 목록의 메뉴의 selected값을 false로 변경!!!!!!!!
                list.forEach((item) => {
                    if (rcpItem.rcpNo === item) {
                        item.selected = false;
                    }
                });
            }
        });

        setSelectedRcpList(tempSelectedRcpList);
    }

    const addMealPlannerComponent = renderAddMealPlannerList();
    const addMealPlannerComponentWrapper = (
        <>
            <h2 className={utilStyles.plannerWrapperTitle}>선택된 메뉴({selectedRcpList.length}/7)</h2>
            <Row gutter={16} className={utilStyles.mealRow} wrap={false}>
                {addMealPlannerComponent}
            </Row>
        </>
    );
    /******** [E]상단에 선택된 메뉴들 노출 영역 그리기 ********/

    /******** [S]검색 영역 그리기 및 검색 로직 ********/
    const saerchMealPlanner = async (conditions) => {
        const res = await fetch(
            `${getRecipeListUrl}?name=${conditions.rcpName}&page=${conditions.page}&size=${size}`
        );
        const data = await res.json();
        const result = data.result;
        setData(result);
        setList(result);

        return result;
    };

    const onSearch = (value) => {
        setPage(1);

        saerchMealPlanner({ day: 0, rcpName: value, page: 1 }).then(
            (result) => {
                setInitLoading(false);
                setLastRcpNo(result.lastRcpNo);
            }
        );
    };

    const handlerSaveButton = async () => {
        console.log("저장하기", selectedRcpList);
        const param = {
            mbrNo : 1,
            rcpNos : selectedRcpList.map(s => s.rcpNo).join(","),
        };
        console.log("param", param);
        const res = await fetch(
            `${saveMealPlannerListUrl}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(param)
            },
        );
        const data = await res.json();
        const result = data.result;
    }
    /******** [E]검색 영역 그리기 및 검색 로직 ********/


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
        let paramPage = page+1;
        fetch(`${getRecipeListUrl}?page=${paramPage}&size=${size}`)
            .then((res) => res.json())
            .then((res) => {
                const result = data.concat(res.result);

                setData(result);
                setList(result);
                setLastRcpNo(result.lastRcpNo);
                setLoading(false);

                let tempPage = page;
                setPage(++tempPage);

                if (result.find((rcp) => rcp.rcpNo === res.lastRcpNo)) {
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

    const sortHandler = (isAlpha) => {
        let listTemp = list;

        if(isAlpha){
            // a->z
            // name 기준으로 정렬
            listTemp = listTemp.sort(function (a, b) {
                const nameA = a.rcpName.toUpperCase(); // ignore upper and lowercase
                const nameB = b.rcpName.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;

                // 이름이 같을 경우
                return 0;
            });
        }else{
            // z->a
            // name 기준으로 정렬
            listTemp = listTemp.sort(function (a, b) {
                const nameA = a.rcpName.toUpperCase(); // ignore upper and lowercase
                const nameB = b.rcpName.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) return 1;
                if (nameA > nameB) return -1;

                // 이름이 같을 경우
                return 0;
            });
        }

        setList([...listTemp]);
    }

    return (
        <Layout>
            <Head>
                <title>식단표 목록</title>
            </Head>
            <div className={utilStyles.mb20}>
                {addMealPlannerComponentWrapper}
            </div>

            <Space direction="vertical" style={{width: '100%', marginBottom: '10px'}}>
                <Button type="primary" block onClick={handlerSaveButton}>
                    저장하기
                </Button>
            </Space>

            <div className={utilStyles.mb20}>
                <Search
                    placeholder="메뉴를 입력해주세요"
                    allowClear
                    onSearch={onSearch}
                    enterButton
                />
            </div>

            <FilterArea sortHandler={sortHandler} />

            <div className={utilStyles.menuResultList}>
                {
                    list && list.length < 1 && <>
                        <div>검색결과(0)</div>
                        <div>검색결과 없음</div>
                    </>
                }
                {
                    list && list.length > 0 && <>
                        <div>검색결과({listCnt})</div>
                        <List
                            className="demo-loadmore-list"
                            loading={initLoading}
                            itemLayout="vertical"
                            loadMore={loadMore}
                            dataSource={list}
                            renderItem={(item) => (
                                <List.Item
                                    extra={
                                        <PlusOutlined onClick={handlerMealPlannerItem}
                                                      data-rcpno={item.rcpNo}
                                                      data-rcpname={item.rcpName}
                                                      data-rcpdescription={item.rcpDescription}
                                                      data-rcpimage={item.filePath+item.fileName}
                                                      data-selected={item.selected}
                                            // style={{fontSize:'40px', color:'#1677ff'}}
                                            // style={item.selected ? "fontSize:'40px', color:'#1677ff'" : "fontSize:'40px'"}
                                                      style={{fontSize: '40px', color: item.selected ? "#1677ff" : "none"}}
                                        />
                                        // <img
                                        //     width={50}
                                        //     alt="logo"
                                        //     src="/images/add_button.png"
                                        //     onClick={handlerMealPlannerItem}
                                        //     data-rcpNo={item.rcpNo}
                                        //     data-rcpName={item.name}
                                        //     data-rcpdescription ={item.description}
                                        //     data-rcpimage={item.filePath+item.fileName}
                                        // />
                                    }
                                >
                                    <Skeleton
                                        avatar
                                        title={false}
                                        loading={item.loading}
                                        active
                                    >
                                        <List.Item.Meta
                                            avatar={<Avatar src={item.filePath+item.fileName}/>}
                                            title={
                                                <Link href={"/recipe/recipeDetail?recipeId=" + item.rcpNo}>{item.rcpName}</Link>
                                            }
                                            description={item.rcpDescription}
                                        />
                                        {/* <div>{item.description}</div> */}
                                    </Skeleton>
                                </List.Item>
                            )}
                        />
                    </>
                }
            </div>

        </Layout>
    );
}
