export default function handler(req: any, res: any) {
    res.status(200).json(
        {
            name : "불고기",
            level : 1,
            requiredTime : 30000,
            material : [
                {key : "고추가루", value : "10g"},
                {key : "설탕", value : "5g"},
                {key : "고추장", value : "5g"},
                {key : "고기", value : "5g"},
                {key : "간장", value : "5g"},
                {key : "소금", value : "15g0g"},
                {key : "양파", value : "100g"},
            ],
            description : [
                {key : "1", value : "aaaaaaaaaaaa"},
                {key : "2", value : "bbbbbbbbbbbb"},
                {key : "3", value : "ccccccccccc"},
                {key : "4", value : "dddddddddd"},
                {key : "5", value : "eeeeeeeeeee"},
                {key : "6", value : "ffffffffffff"},
                {key : "7", value : "gggggggggggg"},
            ],
        }
    );
}
