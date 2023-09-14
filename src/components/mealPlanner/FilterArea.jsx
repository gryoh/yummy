import utilStyles from "../../assets/utils.module.css";
import React, { useEffect, useState } from "react";
import {SortAscendingOutlined, SortDescendingOutlined} from "@ant-design/icons";

export default function FilterArea(props) {
    const [isAlpha, setIsAlpha] = useState(false);  //true : a->z / false : z->a

    const toggleAlphaHandler = () => {
        props.sortHandler(isAlpha);
        setIsAlpha(!isAlpha);
    };

    return(
        <div className={utilStyles.filterArea}>
            <div>
                { isAlpha && <SortAscendingOutlined onClick={toggleAlphaHandler} />}
                { !isAlpha && <SortDescendingOutlined  onClick={toggleAlphaHandler}/>}
            </div>

        </div>
    )
}

