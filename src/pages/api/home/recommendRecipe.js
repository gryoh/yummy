export default function handler(req, res) {
    res.status(200).json(
        {
            recommendRecipe : [
                {menuName : "고추가루", image : "/images/among.png", summary: "11111111111111111111"},
                {menuName : "고추가루", image : "/images/among.png", summary: "2222222222222222222222"},
                {menuName : "고추가루", image : "/images/among.png", summary: "3333333333333333333333333333"},
                {menuName : "고추가루", image : "/images/among.png", summary: "4444444444444444444444444444444"},
                {menuName : "고추가루", image : "/images/among.png", summary: "5555555555555555555555555555"},
                {menuName : "고추가루", image : "/images/among.png", summary: "66666666666666666666666666666"},
                {menuName : "고추가루", image : "/images/among.png", summary: "77777777777777777777"},
                {menuName : "고추가루", image : "/images/among.png", summary: "88888888888888888"},
                {menuName : "고추가루", image : "/images/among.png", summary: "99999999999999999999999999999999"},
                {menuName : "고추가루", image : "/images/among.png", summary: "454645645645645654645645645"},
            ],
        }
    );
}
