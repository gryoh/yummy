import Image from 'next/image'
import './ingredientImg.css'
/**
 * @param src : 이미지경로
 * @param alt : 이미지대체문자
 * @param width : 너비
 * @param height : 높이
 * @returns {JSX.Element}
 */
function IngredientImg({src, alt, width, height}) {
    // 파라미터가 안 넘어올 시 기본 값 설정
    alt = !!alt ? alt : '이미지';
    width = !!width ? width : 100;
    height = !!height ? height : 50;
    return(
        <Image className="ingredientImg" src={src} alt={alt} width={width} height={height}/>
    );
}

export default IngredientImg;