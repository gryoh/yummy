import Layout from "../../components/common/layout";
import IngredientSubheading from "../../components/ingredient/IngredientSubheading";
import IngredientImgText from "../../components/ingredient/IngredientImgText";
import IngredientImg from "../../components/ingredient/IngredientImg";
import {useRouter} from "next/router";
import React, { useEffect, useState, useRef } from "react";
import { Card } from "antd";
import "./ingredientDetail.css";
const { Meta } = Card;

let rollingBannerObj = {
    position : 0,
    startX : 0,
    endX : 0,
    imgCnt : 0,
    imgWidth : 0
}

function rollingBannerSetting(imgWidth) {
    const rollingBanner = document.getElementById("rollingIner");
    rollingBanner.addEventListener('touchstart', touchStart);
    rollingBanner.addEventListener('touchend', touchEnd);
    rollingBannerObj.position = 0;
    rollingBannerObj.startX = 0;
    rollingBannerObj.endX = 0;
    rollingBannerObj.imgWidth = imgWidth;
    rollingBannerObj.imgCnt = rollingBanner.childElementCount;
}

function touchStart(event) {
    rollingBannerObj.startX = event.touches[0].pageX;
}

function touchEnd(event) {
    rollingBannerObj.endX = event.changedTouches[0].pageX;
    const moveDistance =  rollingBannerObj.endX - rollingBannerObj.startX;
    rollingMove(moveDistance);
}

function rollingMove(moveDistance) {
    const totalLength = rollingBannerObj.imgCnt * (rollingBannerObj.imgWidth + 10);
    const nowWidth = document.getElementById("rolllingList").offsetWidth;

    let nowTransLateX = document.getElementById("rollingIner").style.transform;
    nowTransLateX = !!parseFloat(nowTransLateX.substring(11, nowTransLateX.length - 3)) ? parseFloat(nowTransLateX.substring(11, nowTransLateX.length - 3)) : 0;
    if(moveDistance > 0) {
        if(nowTransLateX + moveDistance > 0) {
            document.getElementById("rollingIner").style.transform = `translateX(0px)`;
        }else {
            moveDistance += nowTransLateX;
            document.getElementById("rollingIner").style.transform = `translateX(${moveDistance}px)`;
        }
    }else {
        if(nowTransLateX + moveDistance + totalLength < nowWidth) {
            document.getElementById("rollingIner").style.transform = `translateX(${-totalLength + nowWidth -10}px)`;
        }else {
            moveDistance += nowTransLateX;
            document.getElementById("rollingIner").style.transform = `translateX(${moveDistance}px)`;
        }
    }

}

async function getGoodsInfo(goodsNo) {
    const response = await fetch("/api/ingredient/ingredient?goodsNo=" + goodsNo);
    const apiData = await response.json();
    return apiData;
}

async function getRecipeList(goodsNo) {
    const response = await fetch("/api/ingredient/recipeListforIngredient?goodsNo=" + goodsNo);
    const apiData = await response.json();
    return apiData;
}

function IngredientDetail() {
  const router = useRouter();

  const goodsNo = router.query?.goodsNo;
  const [goodsInfo, setGoodsInfo] = useState();
  const [recipeList, setRecipeList] = useState();

  useEffect(()=> {
    rollingBannerSetting(100)
  });

  useEffect(()=>{
      getGoodsInfo(goodsNo).then((data) =>
          setGoodsInfo(data))
  },[]);

  useEffect(()=>{
    getRecipeList(goodsNo).then((data) =>
        setRecipeList(data))
  },[]);

  const recipeListUI = recipeList?.map(data =>
      <Card key={data.name}
          hoverable
          style={{ marginRight:10,flexBasis : 1}}
          cover={<img alt="example" src={data.imgUrl} style={{width: 100, height: 80, boxSizing:"border-box"}} />}
      >
          <Meta title={data.name} style={{textAlign:"center"}}/>
      </Card>
  );
  return(
      <Layout title="재료 상세">
        <IngredientImg width={150} height={600} src={goodsInfo?.imgUrl}/>
        <IngredientImgText name={goodsInfo?.name} data1={goodsInfo?.data1} data2={goodsInfo?.data2} data3={goodsInfo?.data3}/>
        <div className="clearBox"></div>
        <IngredientSubheading text="해당 재료를 사용한 레시피"/>
        <div className="rolllingList" id ="rolllingList">
            <div className="rollingIner" id ="rollingIner">
                {recipeListUI}
            </div>
        </div>
        <div className="clearBox"></div>
      </Layout>
  );

}

export default IngredientDetail;