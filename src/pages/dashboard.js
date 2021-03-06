import React from "react";
import { connect } from "react-redux";
import Profile from "../components/userProfileComponent";
import { Redirect } from "react-router-dom";
import Job from "../components/DriverBid";
import { getAllJobs, getAllBids } from "../actions/jobs";
import { getMapCenter } from "../actions/maps.js";
import MapContainer from "../components/MapContainer.js";
import DriverReviewBids from "../components/DriverBidReview.js";
import DriverAcceptedBids from "../components/DriverAcceptedBids";
import DriverCompletedBids from "../components/DriverCompletedBids";
import DashboardNav from "../components/DashboardNav";
require("../css/dashboard.css");

export class Dashboard extends React.Component {
  componentDidMount() {
    //gets all jobs related to a given user
    this.props.dispatch(getAllJobs());
    this.props.dispatch(getAllBids());
    if (this.props.currentUser) {
      this.props.dispatch(getMapCenter());
    }
  }

  render() {
    // need to dispatch to get jobs
    const getJobs = job => {
      const jobs = this.props.driverJobs.jobs.jobs.map((job, index) => {
        return (
          <Job
            key={index}
            accepted={job.accepted}
            name={job.title}
            title={job.title}
            desc={job.description}
            budget={job.budget}
            image={job.image}
            id={job.id}
            date={job.date}
            coordinates={
              job.coords
                ? { lat: job.coords.lat, lng: job.coords.long }
                : { lat: 0, lng: 0 }
            }
            form={job.id}
          />
        );
      });
      return jobs;
    };

    let jobs = getJobs();

    if (!this.props.loggedIn) {
      return <Redirect to="/" />;
    }

    if (this.props.currentUser.type === "DRIVER") {
      function renderDriverPage(props) {
        if (props.view === "currentJobs") {
          return (
            <DriverReviewBids
              props={props.driverJobs}
              dispatch={props.dispatch}
            />
          );
        }
        if (props.view === "pastJobs") {
          return (
            <DriverAcceptedBids
              props={props.driverJobs}
              dispatch={props.dispatch}
            />
          );
        }
        if (props.view === "completedJobs") {
          return (
            <DriverCompletedBids
              props={props.driverJobs}
              dispatch={props.dispatch}
            />
          );
        }
        if (props.view === "default") {
          return <MapContainer jobs={jobs} />;
        }
        if (props.view === "bidPosted") {
          return <h2>Thank you! Your bid has been posted.</h2>
        }
      }
      let welcome = '';
      if (this.props.view !== "default") {
        welcome = (
          <h1>
            Welcome back, {this.props.currentUser.firstName}{" "}
            {this.props.currentUser.lastName}!
          </h1>
        );
      }
      return (
        <div>
          <DashboardNav type="DRIVER" view={this.props.view} />
          <div className="dashboard-content">
            {welcome}
            {renderDriverPage(this.props)}
          </div>
        </div>
      );
    }
    if (this.props.currentUser.type === "USER") {
      return (
        <div>
          <DashboardNav type="USER" view={this.props.view} />
          <div className="dashboard-content">
            <h1>
              Welcome back, {this.props.currentUser.firstName}{" "}
              {this.props.currentUser.lastName}!
            </h1>
            <ul style={{ display: "flex", justifyContent: "center" }}>
              <Profile
                view={this.props.view}
                bids={this.props.driverJobs.bids}
              />
            </ul>
          </div>
        </div>
      );
    }
  }
}

const mapStateTothis = state => {
  return {
    loggedIn: state.auth.currentUser !== null,
    driverJobs: state,
    currentUser: state.auth.currentUser,
    view: state.view.view,
    mapCenter: state.map.mapCenter
  };
};

export default connect(mapStateTothis)(Dashboard);
