import React, { Component } from 'react';
import './App.css';
import Spinner from './spinner';

class App extends Component {
  state={
    url:'',
    total_issues:0,
    last24_issue:0,
    last7Days_issue:0,
    moreThan7Days_issues:0,
    isSubmit:false
  }

  //This is used for setting the url to state
  handleChange=e=>{
    this.setState({url:e.target.value})
  }

  //This funtion will call when click the submit button
  handleSubmit=event=> {
    event.preventDefault();
    if(this.state.url===''){
      alert("Please enter the valid github repository!!");
      this.setState({isSubmit:false})
    }
    else{
    this.setState({isSubmit:true})
    setTimeout(()=>{
      this.setState({isSubmit:false})
      },5000
      )
    this.apiCall(this.state.url);
    this.totalIssues(this.state.url);
    }
  }

  //This fuction is used to calling the github api 
  //and pass the data to last 24 hours issues funtion and last 7 days issues function
  apiCall=url=>{
    fetch(`https://api.github.com/repos/${url}/issues`)
    .then(response => response.json())
    .then(data =>{
      this.issues24(data);
      this.last7Days(data);
    }
    )
    setTimeout(()=>{
    this.moreThan7Days();
    },5000
    )
  }

  //Total number of open issues
  totalIssues=url=>{
    fetch(`https://api.github.com/repos/${url}`)
    .then(response => response.json())
    .then(data =>{
      this.setState({
        total_issues: data.open_issues_count
      })
    })
  }

  //Number of open issues that were opened in the last 24 hours 
  issues24=data=>{
    let yesterday = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
    let count=0;
    for(let i=0; i<=data.length; i++)
    {
      let date=new Date(data[i].created_at)
      if(yesterday.getTime()<=date.getTime()){
        count++;
      }
      else{
        break;
      }
    }
    this.setState({
      last24_issue:count
    })
  }

  //Number of open issues that were opened more than 24 hours ago but less than 7 days ago 
  last7Days=data=>{ 
    let yesterday = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
    let last7Days = new Date(new Date().getTime() - (7*24 * 60 * 60 * 1000));
    let count=0;
    for(let i=0; i<=data.length; i++)
    {
      let date=new Date(data[i].created_at)
      if(date.getTime()>yesterday.getTime())
      {
        count=0;
      }
      else if(date.getTime()>last7Days.getTime()){ 
        count++;
      }
      else{
        break;
      }
  }
    this.setState({
      last7Days_issue:count
    })
    
  }


  //Number of open issues that were opened more than 7 days ago
  moreThan7Days=()=>{
    let issue=this.state.total_issues -(this.state.last24_issue+this.state.last7Days_issue)
    this.setState({moreThan7Days_issues:issue})
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <label>
            Enter Github Repository:
            <input type="text" value={this.state.url} onChange={this.handleChange} />
          </label>
          <input className="submit-btn" type="submit" value="Submit" />
        </form>
        <Spinner issues={this.state.total_issues} last24={this.state.last24_issue} last7Days={this.state.last7Days_issue} moreThan7Days={this.state.moreThan7Days_issues} check={this.state.isSubmit} /> 
      </div>
    );
  }
}

export default App;
