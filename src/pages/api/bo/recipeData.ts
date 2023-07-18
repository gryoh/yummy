export default function handler(req: any, res: any) {

        res.status(200).json({
            data : [
                {
                    key: 1,
                    name: "보쌈",
                    type: "한식",
                },
                {
                    key: 2,
                    name: "순대국밥",
                    type: "한식",
                },
                {
                    key: 3,
                    name: "파스타",
                    type: "양식",
                }
            ],
            totalPages : 2
        });

}
