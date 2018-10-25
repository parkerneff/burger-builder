import React, {Component} from 'react';
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axiosOrders from '../../../axios-orders';
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";



class ContactData extends Component {
    state = {
        name: "",
        email: "",
        address: {
            street: "",
            postalCode: ""
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props.ingredients);
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: "Parker Neff",
                address: {
                    street: "2261 W. Harrison St",
                    city: "Chandler",
                    state: "AZ",
                    postalCode: "85225",
                    country: "US"
                },
                email: "test@test.com"

            },
            deliveryMethod: "fastest"
        }
        console.log("Posting order via Axios");
        axiosOrders.post("/orders.json", order)
            .then(response => {
                this.setState({loading: false});
                console.log("Order was posted");
                this.props.history.push("/");
            })
            .catch(error => {
                this.setState({loading: false});
                console.log(error)
            });
    }

    render() {
        let form = (
            <form>
                <Input inputtype="input" type="text" name="name" placeholder="Your name"/>
                <Input  inputtype="input" type="email" name="email" placeholder="Your email"/>
                <Input  inputtype="input" type="text" name="street" placeholder="Your street"/>
                <Input  inputtype="input" type="text" name="postal" placeholder="Your postal code"/>
                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );

    }
}

export default ContactData;