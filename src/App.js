import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
// Components
import Welcome from "./components/Welcome";
import NavBar from "./components/Navigation/NavBar";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import AddressForm from "./components/AddressForm";
import ItemList from "./components/ItemList";
import UserProfile from "./components/UserProfile";
import ItemDetail from "./components/ItemDetail";
import Cart from "./components/Cart";
import OrderList from "./components/OrderList";
import SideNav from "./components/Navigation/SideNav";
import * as actionCreators from "./store/actions";
import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    if (this.props.user) {
      this.props.fetchAddresses();
      this.props.fetchOrders();
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      this.props.fetchAddresses();
      this.props.fetchOrders();
    }
  }
  render() {
    return (
      <div className="content-wrapper">
        <NavBar />
        <SideNav />
        <Switch>
          <Route path="/welcome" component={Welcome} />
          <Route path="/login" component={LoginForm} />
          <Route path="/address" component={AddressForm} />
          <Route path="/signup" component={SignupForm} />
          <Route path="/items/:itemID" component={ItemDetail} />
          <Route path="/profile" component={UserProfile} />
          <Route path="/cart" component={Cart} />
          <Route path="/items" component={ItemList} />
          <Route path="/orders" component={OrderList} />
          <Route path="/orders/:orderID" component={OrderList} />
          <Redirect to="/welcome" />
        </Switch>
        <Footer />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  fetchAddresses: () => dispatch(actionCreators.fetchAddresses()),
  fetchOrders: userData => dispatch(actionCreators.fetchOrders(userData))
});
const mapStateToProps = state => {
  return {
    user: state.auth.user,
    errs: state.errors.error
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
