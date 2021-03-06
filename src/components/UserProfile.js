import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actionCreators from "../store/actions";
// Components
import Loading from "./Loading";
import AddressList from "./AddressList";
import AddressForm from "./AddressForm";

class UserProfile extends Component {
  componentDidMount() {
    if (!this.props.user) {
      this.props.history.push("/login");
    }
    this.props.getProfile();
  }

  componentDidUpdate() {
    if (!this.props.user) {
      this.props.history.push("/");
    }
  }

  render() {
    const type = this.props.match.url.substring(1);
    if (this.props.loading) {
      return <Loading />;
    } else if (!this.props.user) {
      this.props.history.push("/");
      return null;
    } else {
      const profile = this.props.profile;
      return (
        <div className="row">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div className="card-title mb-4">
                  <div className="d-flex justify-content-start">
                    <div className="image-container">
                      <div className="middle">
                        <Link
                          to="/profile/update/"
                          type="button"
                          className="btn btn-secondary"
                          id="btnUpdate"
                        >
                          Update profile
                        </Link>
                        <input
                          type="file"
                          style={{ display: "none" }}
                          id="profilePicture"
                          name="file"
                        />
                      </div>
                    </div>
                    <div className="userData ml-3">
                      <h2
                        className="d-block"
                        style={{ fontSize: "1.5rem, font-weight: bold" }}
                      />
                      <h2>{this.props.user.username}</h2>
                    </div>
                    <div className="ml-auto">
                      <input
                        type="button"
                        className="btn btn-primary d-none"
                        id="btnDiscard"
                        value="Discard Changes"
                      />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <ul className="nav nav-tabs mb-4" id="myTab" role="tablist">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          id="basicInfo-tab"
                          data-toggle="tab"
                          href="#basicInfo"
                          role="tab"
                          aria-controls="basicInfo"
                          aria-selected="true"
                        >
                          Basic Info
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content ml-1" id="myTabContent">
                      <div
                        className="tab-pane fade show active"
                        id="basicInfo"
                        role="tabpanel"
                      >
                        <div className="row">
                          <div className="col-sm-3 col-md-2 col-5">
                            <p style={{ fontWeight: "bold" }}>Full Name</p>
                          </div>
                          <div className="col-md-8 col-6">
                            {profile.firstname} {profile.lastname}
                          </div>
                        </div>
                        <hr />

                        <div className="row">
                          <div className="col-sm-3 col-md-2 col-5">
                            <p style={{ fontWeight: "bold" }}>Birth Date</p>
                          </div>
                          <div className="col-md-8 col-6">{profile.dob}</div>
                        </div>
                        <hr />

                        <div className="row">
                          <div className="col-sm-3 col-md-2 col-5">
                            <p style={{ fontWeight: "bold" }}>Email</p>
                          </div>
                          <div className="col-md-8 col-6">{profile.email}</div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3 col-md-2 col-5">
                            <p style={{ fontWeight: "bold" }}>Addresses</p>
                          </div>
                          <div className="col-md-8 col-6">
                            <button
                              type="button"
                              className="btn btn-primary"
                              data-toggle="modal"
                              data-target="#addressList"
                            >
                              Saved Addresses
                            </button>
                            <AddressList type={type} />
                            <div className="col-xs-3">
                              <button
                                type="button"
                                className="btn btn-primary"
                                data-toggle="modal"
                                data-target="#addressForm"
                              >
                                Add New Address
                              </button>
                              <div
                                className="modal fade"
                                id="addressForm"
                                tabIndex="-1"
                                role="dialog"
                                aria-labelledby="exampleModalCenterTitle"
                                aria-hidden="true"
                              >
                                <div
                                  className="modal-dialog modal-dialog-centered"
                                  role="document"
                                >
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <h5
                                        className="modal-title"
                                        id="exampleModalCenterTitle"
                                      >
                                        Modal title
                                      </h5>
                                      <button
                                        type="button"
                                        className="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                      >
                                        <span aria-hidden="true">&times;</span>
                                      </button>
                                    </div>
                                    <div className="modal-body">
                                      <AddressForm />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div className="row">
                          <div className="col-sm-3 col-md-2 col-5">
                            <p style={{ fontWeight: "bold" }}>Phone Number</p>
                          </div>
                          <div className="col-md-8 col-6">{profile.number}</div>
                        </div>
                        <hr />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
const mapStateToProps = state => {
  return {
    user: state.auth.user,
    profile: state.profile.profile,
    loading: state.profile.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProfile: () => dispatch(actionCreators.fetchUserProfile())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfile);
