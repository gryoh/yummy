export default function handler(req: any, res: any) {
    res.status(200).json([{
        name: "떡볶이",
        imgUrl: "/images/tteokbokki.jpeg",
    },
    {
        name: "비빔밥",
        imgUrl: "/images/bibimbab.jpeg",
    },
    {
        name: "보쌈",
        imgUrl: "/images/bossam.jpeg",
    },
    {
        name: "아몽1" ,
        imgUrl: "/images/among.png"
    },
    {
        name: "아몽2" ,
        imgUrl: "/images/among.png"
    },
    {
        name: "아몽3" ,
        imgUrl: "/images/among.png"
    }


    ]);
}