import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../../components/common/layout";
import WishRecipeItem from "../../components/mypage/WishRecipeItem";

export default function WishRecipe() {
    const [wishRecipeList, setWishRecipeList] = useState([]);
    useEffect(() => {
        // 재려가져오기
        const getWishRecipeList = async () => {
            const res = await fetch("/api/mypage/wishrecipe");
            const data = await res.json();

            setWishRecipeList(data);
        };
        getWishRecipeList();
       
       
    },[])
    const wishrecpie = wishRecipeList.map((wishrecpie, index) => (
        <WishRecipeItem key={wishrecpie.name} {...wishrecpie} />
    ));
    const router = useRouter();
    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <Layout>
           {wishrecpie}
        </Layout>
    );
}
