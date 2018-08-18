import React, { Component } from 'react'
import compare from '../lib/compare'
 
class Card extends Component {
 
    truncate(str, no_words) {
        return str.split(" ").splice(0, no_words).join(" ");
    }   

    handleClick(id) {
        
        this.props.onClick(id);
    }
    render() {
        const {info, sortfield} = this.props;
        const filterfield = this.props.filterfield.toLowerCase();

        info.sort(compare(sortfield));

        const data = info.filter((emp) => {          
            return !emp.lastName.toLowerCase().indexOf(filterfield) || !emp.firstName.toLowerCase().indexOf(filterfield)
        });

        if (data.length!=0)
        {          
        const items = data.map((emp) => {

            const bio = this.truncate(emp.bio, 10);
            return (
                <div key={emp.id} className="card col-4" onClick={() => {this.handleClick(emp.id)}}>
                    <div className="card-image">
                        <img src={emp.avatar} alt={emp.firstName} />
                    </div>
                    <div className="card-details">
                        <h3>{emp.firstName} {emp.lastName}</h3>
                        <p>{bio}</p>
                    </div>
                </div>
            )
        })
        return items;
        }
        else
        {
            return (<div> No Employee Found </div>)
        }
    }
}

export default Card;