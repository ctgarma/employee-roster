import React, { Component } from 'react';
import './App.css';
import Card from './components/Card';
import ModalBox from './components/ModalBox';
import data from './sample-data.json';

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
    const { firstName, lastName, age, dateJoined, bio, avatar } = data.employees.find(x => x.id === i)

    this.setState({
      show: true,
      details: {
        firstName,
        lastName,
        age,
        dateJoined,
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
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-companyname">
            <h1 className="App-title">{data.companyInfo.companyName}</h1>
            <h5 className="App-motto">{data.companyInfo.companyMotto}</h5>
          </div>
          <div className="App-companyname">
            <h5 className="App-motto">Since {data.companyInfo.companyEst}</h5>
          </div>
        </header>
        <section>
          <div>
            <h1>Employees</h1>
          </div>
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
          <hr />
        </section>
        <section>
          <Card info={data.employees} onClick={this.showModal} sortfield={this.state.sortfield} filterfield={this.state.filterfield} />
          {show && <ModalBox show={this.state.show} handleClose={() => this.hideModal()}>
            <div className="profile" >
              <div className="profile-image">
                <img src={this.state.details.avatar} alt={this.state.details.firstName} />
                <p>
                  {this.state.details.age}<br></br>
                  {this.state.details.dateJoined}
                </p>
              </div>
              <div className="profile-details">
                <strong> {this.state.details.firstName} {this.state.details.lastName}</strong>
                <p> {this.state.details.bio}</p>
              </div>
            </div>
          </ModalBox>}
        </section>
      </div>
    );
  }
}

export default App;