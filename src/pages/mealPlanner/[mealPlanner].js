import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../../components/common/layout";
import MealPlannerItemList from "../../components/mealPlanner/itemList";

export async function getServerSideProps({ params, req }) {
    return {
        props: {
            params,
        },
    };
}

export default function MealPlannerOne({ params }) {
    const router = useRouter();
    const [mealPlannerList, setMealPlannerList] = useState([]);

    useEffect(() => {
        const getText = async () => {
            const res = await fetch(
                "/api/mealPlanner/mealPlannerOne?recId=" + params.mealPlanner
            );
            const data = await res.json();

            setMealPlannerList(data);
        };

        getText();
    }, []);

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <Layout>
            <div className="mealPlannerWrapper">
                <MealPlannerItemList list={mealPlannerList} />
            </div>
        </Layout>
    );
}
