import React, { Component } from 'react';
import './App.css';
import Card from './components/Card';
import ModalBox from './components/ModalBox';
import data from './sample-data.json';
import moment from 'moment'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      sortfield: 'firstName',
      filterfield: '',
      details: {
        firstName: null,
        lastName: null,
        jobTitle: null,
        age: null,
        dateJoined: null,
        bio: null,
        avatar: null
      }
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal = (i) => {
    const { firstName, lastName, age, dateJoined, bio, avatar, jobTitle } = data.employees.find(x => x.id === i)

    this.setState({
      show: true,
      details: {
        firstName,
        lastName,
        jobTitle,
        age,
        dateJoined: moment(dateJoined).format('DD MMM, YYYY'),
        bio,
        avatar
      }
    });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  change = (e) => {
    this.setState({
      sortfield: e.target.value
    });
  }

  handleSearchChange = (e) => {
    this.setState({ filterfield: e.target.value });
  };

  render() {
    const { show } = this.state;
    const est = moment(data.companyInfo.companyEst).format('YYYY');

    return (
      <div className="App">
        <header className="App-header">
          <div className="App-companyname">
            <h1 className="App-title">{data.companyInfo.companyName}</h1>
            <h5 className="App-motto">{data.companyInfo.companyMotto}</h5>
          </div>
          <div className="App-companyname">
            <h5 className="App-motto">Since {est} </h5>
          </div>
        </header>
        <div className="App-bar">
          <div className="App-bar-title">
            <h1>Our Employees</h1>
          </div>
          <div className="App-bar-control">
            <div>
              <label>Sort by</label>
              <select id="pet-select" onChange={this.change} value={this.state.value}>
                <option value="firstName">Firstame</option>
                <option value="lastName">Lastname</option>
              </select>
            </div>
            <div>
              <label>Search</label>
              <input onChange={this.handleSearchChange} />
            </div>
          </div>
        </div>
        <div className="contents">
      
            <Card info={data.employees} onClick={this.showModal} sortfield={this.state.sortfield} filterfield={this.state.filterfield} />
            {show && <ModalBox show={this.state.show} handleClose={() => this.hideModal()}>

              <div className="profile" >
                <div className="profile-top">
                  <div className="profile-image">
                    <img src={this.state.details.avatar} alt={this.state.details.firstName} />
                  </div>
                  <div className="profile-name">
                    <p><strong> {this.state.details.firstName} {this.state.details.lastName}</strong></p>
                  </div>
                </div>

                <div className="profile-info">
                  <div className="profile-jobtitle">
                    <p>
                      <strong> {this.state.details.jobTitle}<br></br></strong>
                      {this.state.details.age}<br></br>
                      {this.state.details.dateJoined}
                    </p>
                  </div>
                  <div className="profile-details">

                    <p> {this.state.details.bio}</p>
                  </div>

                </div>
              </div>
            </ModalBox>}
        
        </div>
      </div>
    );
  }
}

export default App;
