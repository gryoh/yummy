


export default function handler(req: any, res: any) {
        res.status(200).json({
            name: "apple",
           imgUrl: "/images/apple.jpeg",
            data1: "data1",
            data2: "data2",
            data3: "data3",
            data4: "data4"
        });
}
