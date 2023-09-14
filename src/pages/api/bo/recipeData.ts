export default function handler(req: any, res: any) {
        const recipeId = req.query.recipeId;
        let resultJson = {};
        if (recipeId == "ingre"){
            resultJson = {
                data : [
                    {
                        value: 1,
                        label: "쌀",
                    },
                    {
                        value: 2,
                        label: "김치",
                    },
                    {
                        value: 3,
                        label: "된장",
                    }
                ],
                totalPages : 2
            }
        } else if (recipeId == "type"){
            resultJson = {
                data : [
                    {
                        value: 1,
                        label: "한식",
                    },
                    {
                        value: 2,
                        label: "양식",
                    },
                    {
                        value: 3,
                        label: "중식",
                    }
                ],
                totalPages : 2
            }
        } else {
            if (recipeId == 1) {
                resultJson = {
                    key: 1,
                    name: "보쌈",
                    typekey: 1,
                    type: "한식"
                }
            } else if ( recipeId == 2){
                resultJson = {
                    key: 2,
                    name: "짜장면",
                    typekey : 3,
                    type: "중식",
                }
            } else if ( recipeId == 3) {
                resultJson = {
                    key: 3,
                    name: "파스타",
                    typekey : 2,
                    type: "양식",
                }
            } else {
                resultJson = {
                    data : [
                        {
                            key: 1,
                            name: "보쌈",
                            typekey : 1,
                            type: "한식",
                        },
                        {
                            key: 2,
                            name: "짜장면",
                            typekey : 3,
                            type: "중식",
                        },
                        {
                            key: 3,
                            name: "파스타",
                            typekey : 2,
                            type: "양식",
                        }
                    ],
                    totalPages : 2
                }
            }
        }

        res.status(200).json(resultJson);

}
