export default function handler(req, res) {
    res.status(200).json(
        {
            bestRecipe : [
                {menuName : "고추가루", image : "/images/among.png", recommend : 500},
                {menuName : "고추가루", image : "/images/among.png", recommend : 400},
                {menuName : "고추가루", image : "/images/among.png", recommend : 300},
                {menuName : "고추가루", image : "/images/among.png", recommend : 200},
                {menuName : "고추가루", image : "/images/among.png", recommend : 85},
                {menuName : "고추가루", image : "/images/among.png", recommend : 80},
                {menuName : "고추가루", image : "/images/among.png", recommend : 70},
                {menuName : "고추가루", image : "/images/among.png", recommend : 60},
                {menuName : "고추가루", image : "/images/among.png", recommend : 50},
            ],
        }
    );
}
