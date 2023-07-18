import "./ingredientSubheading.css";
/**
 * @param text : 내용
 * @returns {JSX.Element}
 */
function IngredientSubheading({text}) {
    return (
        <h2 className="subheading">
            {text}
        </h2>
    );
}
export default IngredientSubheading;