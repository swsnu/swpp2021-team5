import React, { Component } from "react";
import Nutrient from "../../component/Nutrient";
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actionCreators from '../../store/actions/index';

class NutritionalInfoAndRecipe extends Component {

    componentDidMount(){
        this.props.onGetMenu();
    }

    render(){
        let menu_name = '';
        let calories = 0;
        let carbs = 0;
        let protein = 0;
        let fat = 0;
        if(this.props.selectedMenu){
            menu_name = this.props.selectedMenu.name;
            calories = this.props.selectedMenu.calories;
            carbs = this.props.selectedMenu.carbs;
            protein = this.props.selectedMenu.protein;
            fat = this.props.selectedMenu.fat;
        }
        return(
            <div className="NutritionalInfoAndRecipe">
                <Nutrient 
                    menu_name={menu_name}
                    calories={calories}
                    carbs={carbs}
                    protein={protein}
                    fat={fat} />
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        selectedMenu: state.menu.selectedMenu
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetMenu: (menuName) => dispatch(actionCreators.getMenu(menuName)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NutritionalInfoAndRecipe));