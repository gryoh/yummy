export default function handler(req, res) {
    const recId = req.query.recId;
    let resultJson = {};
    if (recId == 1) {
        resultJson = {
            recId: "1",
            name: "불고기",
            description: "맛있음",
        };
    } else if (recId == 2) {
        resultJson = {
            recId: "2",
            name: "순대국밥",
            description: "좋음",
        };
    } else {
        resultJson = {
            recId: "9999",
            name: "없음",
            description: "없음",
        };
    }
    res.status(200).json([resultJson]);
}
