import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../../components/common/layout";
import { Card } from 'antd';
import MyIngredient from "../../components/mypage/MyIngredient";
import { Row } from "antd";
import MyLoveRecipe from "../../components/mypage/MyLoveRecipe";
import LatestViewRecipe from "../../components/mypage/LatestViewRecipe";
import MyPageHeader from "../../components/mypage/MyPageHeader";
import styles from "../../components/mypage/mypage.module.css";
import globalStyle from "../../assets/global.css";
import axios from 'axios';
import { isLogin } from '../../utils/memberUtil.js';

export default function Mypage() {
    const [loveRecipeList, setloveRecipeList] = useState([]);
    const [mbrStuffList, setstuffList] = useState([]);
    const [memberName, setmemberName] = useState("");
    
    const router = useRouter();
    if (router.isFallback) {
        return <div>Loading...</div>;
    }
    //https://eundol1113.tistory.com/281
    useEffect(() => {

        if (!isLogin()) {
            router.push('/member/login');
        } else {
            //header에 토큰 설정
            axios.defaults.headers.common['Authorization'] = window.sessionStorage.getItem('mbrLoginId');
            const getMemberInfo = async () => {
                axios.get('/member/getMbrInfo')
                .then((res) => {
                    setmemberName(res.data.name);
                    getMyPageRcpStuff();
                })
                .catch((error) => {
                    console.log(error);
                })
            }
            getMemberInfo();
                //찜란 레시피, 재료 가져오기
            const getMyPageRcpStuff = async () => {
                axios.get('/mypage/getMyPageRcpStuff')
                .then((res) => {
                    setloveRecipeList(res.data.myPageMbrRcpLike[0]);
                    setstuffList(res.data.myPageMbrStuff[0]);
                })
                .catch((error) => {
                    console.log(error);
                })
            };
        }
        
    },[])

    //레시피 컴포넌트 생성
    const loveRecive = loveRecipeList.map((loveRecive, index) => (
        <MyLoveRecipe key={loveRecive.rcpName} {...loveRecive} />
    ));
    //재료 컴포넌트 생성
    const mbrStuff = mbrStuffList.map((mbrStuff, index) => (
        <MyIngredient key={mbrStuff.stuffName} {...mbrStuff} />
    ));
    
 
    return (
        <Layout>
            <div>
                <MyPageHeader mbrName={memberName}/>
            </div>
            <div style={{backgroundColor: '#E2E2E2', paddingTop:'20px'}}>
                <div className={styles.mypageCont_box}>
                    <h3 style={{margin: '15px 0px 5px 0px'}}>최근 본 레시피</h3>
                    <Card
                        bordered={true}
                        style={{width: '100%'}}
                    >
                        <LatestViewRecipe/>
                    </Card>
                </div>
                <div className={styles.mypageCont_box}>
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
                <div className={styles.mypageCont_box}>
                    <h3 style={{margin: '15px 0px 5px 0px'}}>내 재료</h3>
                    <Card
                        bordered={true}
                        style={{width: '100%'}}
                        bodyStyle={{padding: '10px'}}
                    >
                        <Row wrap="ture">
                            {mbrStuff}
                        </Row>
                    </Card>
                </div>
            </div>
           
        </Layout>
    );
}