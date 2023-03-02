import { Descriptions } from 'antd';
import React, { useEffect,  useState } from 'react';
import DetailDescript from "./detailDescript";

export default function detailSummary(props) {
    let recipeData = {};
    const [recipeTime, setrecipeTime] = useState(0);
    const [recipeName, setrecipeName] = useState("");
    const [recipelevel, setrecipelevel] = useState(0);
    const [recipematerial, setrecipematerial] = useState([]);
    const [recipedescription, setrecipedescription] = useState([]);

    const getData = async()=>{
    const res = await fetch("/api/recipe/recipeDtail"
    ).then((res)=> res.json());
    
    setrecipeTime(res.requiredTime / 1000 / 60) ;
    setrecipeName(res.name);
    setrecipelevel(res.level);
    setrecipematerial(res.material);
    setrecipedescription(res.description);

  };
  useEffect(()=>{
    getData();
  },[]);

    return (
        <div>
        <Descriptions
          title={recipeName}
          bordered
          column={{
            xxl: 3,
            xl: 3,
            lg: 3,
            md: 3,
            sm: 2,
            xs: 1,
          }}
        >
          <Descriptions.Item label="요리명">{recipeName}</Descriptions.Item>
          <Descriptions.Item label="난이도">{recipelevel}</Descriptions.Item>
          <Descriptions.Item label="조리시간(분)">{recipeTime}</Descriptions.Item>
          <Descriptions.Item label="재료">
            {recipematerial.map((it, idx) => (
                    <div key={idx}>
                      {it.key} : {it.value}
                    </div>
                ))}
          </Descriptions.Item>
        </Descriptions>
        <div>
        <DetailDescript recipedescription={recipedescription}/>
        </div>
      </div>
      
    )
}