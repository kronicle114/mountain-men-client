import React from "react";
import { connect } from "react-redux";
import UserJobCard from "./UserJobCard.js";
import { getUserJobs, getAllBids } from "../actions/jobs";

export class CurrentJobs extends React.Component {
  componentDidMount() {
    //gets all jobs related to a given user
    this.props.dispatch(getAllBids());
    this.props.dispatch(getUserJobs());
  }

  render() {
    let listOfJobs = [];
    if (this.props.jobs.length > 0) {
      listOfJobs = this.props.jobs.filter(item => {
        return !item.completed && !item.accepted && item.userId === this.props.user.id;
      });

      listOfJobs = listOfJobs.map((job, index) => {
        const bids = this.props.bids.bids.filter(item => {
          return item.jobId === job.id;
        });
        return <UserJobCard job={job} key={index} bids={bids} />;
      });
    }

    if (listOfJobs.length === 0) {
      listOfJobs = (
        <li>
          Nothing to see here. To make a post, click on 'Create Post' above and
          submit a job.
        </li>
      );
    }
    return (
      <section>
        <h2>Current Job Postings</h2>
        <ul>{listOfJobs}</ul>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.currentUser,
  jobs: state.jobs.jobs
});

export default connect(mapStateToProps)(CurrentJobs);
