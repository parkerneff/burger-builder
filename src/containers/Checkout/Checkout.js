import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "../Checkout/ContactData/ContactData";






class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0

    }

    // Will be called when mounted from router
    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        let price = 0;
        const ingredients = {};
        for (let param of query.entries()) {
            if (param[0] === "price") {
                price = param[1];
              //  this.setState({price: param[1]});
            } else {
                ingredients[param[0]] = +param[1];
            }

        }
        this.setState({ingredients: ingredients, totalPrice: price});

    }

    checkoutCannceledHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-data");
    }


    render() {

        return (
           <div>
              <CheckoutSummary
                  ingredients={this.state.ingredients}
                  checkoutCanceled={this.checkoutCannceledHandler}
                  checkoutContinued={this.checkoutContinuedHandler}
              />
               <Route path={this.props.match.path + '/contact-data'} render={(props) => (<ContactData
                   ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                   {...props} />)}/>

           </div>
        );

    }

}

export default Checkout;