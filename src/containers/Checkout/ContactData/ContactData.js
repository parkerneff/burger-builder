import React, {Component} from 'react';
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import axiosOrders from '../../../axios-orders';
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";


class ContactData extends Component {
    state = {
        orderForm: {

            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Name"
                },
                value: ""
            },
            street: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Street"
                },
                value: ""
            },
            city: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "City"
                },
                value: ""
            },
            state: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "State"
                },
                value: ""
            },
            postalCode: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Postal Code"
                },
                value: ""
            },
            country: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Country"
                },
                value: ""
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "email"
                },
                value: ""
            },
            deliveryMethod: {
                elementType: "select",
                elementConfig: {
                    options: [
                        {value: "fastest", displayValue: "Fastest"},
                        {value: "cheapest", displayValue: "Cheapest"}
                    ]
                },
                value: ""
            }
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

        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]

            });
        }
        let form = (
            <form>
                {formElementsArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                    />

                ))}

                <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner/>
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