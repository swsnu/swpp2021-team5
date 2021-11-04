import React from 'react';

const Nutrient = (props) => {
    return(
        <div>
            <h1>{props.menu_name}</h1>
            <img className="menu_img"></img>
            <text>{props.nutrient}</text>
        </div>    
    );
}

export default Nutrient;