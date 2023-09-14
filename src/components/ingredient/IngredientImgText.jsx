import "./ingredientImgText.css";
function IngredientImgText(props) {

    return (
        <section className="ingredientImgTextSection">
            <div className="ingredientImgText">이름 : {props.name}</div>
            <div className="ingredientImgText">이름 : {props.data1}</div>
            <div className="ingredientImgText">이름 : {props.data2}</div>
            <div className="ingredientImgText">이름 : {props.data3}</div>
        </section>
    )

}
export default IngredientImgText;