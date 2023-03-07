import Layout from "../../components/common/layout";
import React, { useEffect, useState, useRef } from "react";
import { Card } from "antd";
import IngredientListNav from "./ingredientListNav";
const { Meta } = Card;

async function getIngredientList() {
    const response = await fetch("/api/ingredient/ingredientList");
    const apiData = await response.json();
    return apiData;
}


function IngredientList() {

    const [ingredientList, setIngredientList] = useState();

    useEffect(()=>{
        getIngredientList().then((data) =>
            setIngredientList(data))
    },[]);


    const ingredientListUI = ingredientList?.map(data =>
        <Card key={data.name}
              hoverable
              style={{ marginRight:10, display:"inline-block", marginTop:10}}
              cover={<img alt="example" src={data.imgUrl} style={{width: 100, height: 80, boxSizing:"border-box"}} />}
        >
            <Meta title={data.name} style={{textAlign:"center"}}/>
            <Meta title={data.amount} style={{textAlign:"center"}}/>
        </Card>
    );
    return (
        <Layout>
            <IngredientListNav/>
            <div className="ingredientListBox">
                {ingredientListUI}
            </div>
        </Layout>
    );

}
export default IngredientList;