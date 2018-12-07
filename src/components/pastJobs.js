import React from 'react';
import {connect} from 'react-redux';
import {getUserJobs} from '../actions/jobs.js';

export class pastJobs extends React.Component {

  componentDidMount() {
    //gets all jobs related to a given user
    this.props.dispatch(getUserJobs())
  }

  render() {
    console.log('HERE', this.props)
    let listOfJobs = []
    listOfJobs = this.props.jobs.map((job, index) => {
      if (job.completed) {
      return (
        <li key={index}>
          <p>Title: {job.title}</p>
          <p>Description: {job.description}</p>
        </li>
      )
      }
    })

  return (
    <section>
    <h2>Past Jobs</h2>
    <ul>
      {listOfJobs}
    </ul>
  </section>
  )
}}

const mapStateToProps = state => ({
  user: state.auth.currentUser,
  jobs: state.jobs.jobs
})

export default connect(mapStateToProps)(pastJobs)
