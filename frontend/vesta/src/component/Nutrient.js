import React from 'react';

const Nutrient = (props) => {
    return(
        <div>
            <h1>{props.menu_name}</h1>
            <img className="menu_img"></img>
            <text>{props.calories, props.carbs, props.protein, props.fat}</text>
        </div>    
    );
}

export default Nutrient;