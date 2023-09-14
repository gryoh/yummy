import "./ingredientListNav.css";
import { Button } from 'antd';
function IngredientListNav() {

    return (
        <nav className="ingredientListNav">
            <Button style={{marginRight:5}}>전체 재료</Button>
            <Button style={{marginRight:5}}>많이 남은 재료</Button>
            <Button>유통기한 주의 재료</Button>
        </nav>
    )
}
export default IngredientListNav;