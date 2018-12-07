import React from 'react';
import {connect} from 'react-redux';
import UserJobCard from './UserJobCard.js';

export class CurrentJobs extends React.Component{
  constructor(props){
    super(props)
  }

  render() {
    let listOfJobs = []
    listOfJobs = this.props.jobs.map((job, index) => {
      if (!job.completed) {
      return (
        <UserJobCard job={job} key={index} />
      )
      }
    })

  return (
    <section>
    <h2>Current Jobs</h2>
    <ul>
      {listOfJobs}
    </ul>
  </section>
  )
  }
}

const mapStateToProps = state => ({
  user: state.auth.currentUser,
  jobs: state.jobs.jobs
})

export default connect(mapStateToProps)(CurrentJobs)