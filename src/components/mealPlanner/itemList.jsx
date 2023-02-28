import React from "react";
import utilStyles from "../../assets/utils.module.css";

export default function ItemList({ list }) {
    const MealPlannerItem = (list) => {
        return (
            <div className={utilStyles.mealPlannerItem}>
                <h1 className={utilStyles.headingXl}>{list.name}</h1>
                <div className={utilStyles.lightText}>{list.description}</div>
            </div>
        );
    };

    if (list == undefined) {
        return (
            <>
                <div>결과가 없습니다.</div>
            </>
        );
    }

    const mealPlanners = list.map((mealPlanner, index) => (
        <MealPlannerItem key={mealPlanner.name} {...mealPlanner} />
    ));

    return <>{mealPlanners}</>;
}
