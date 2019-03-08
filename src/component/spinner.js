import React from 'react';
import Loader from 'react-loader-spinner'
import DisplayTable from './table';
class Spinner extends React.Component {
   render() {
       if(this.props.check)
       {
        return(
            <div className="spinner">
                <span>Please wait for few second!!!</span>
                <div className="loader">
                    <Loader 
                        type="Grid"
                        color="#00BFFF"
                        height="100"	
                        width="100"
                    /> 
                </div>
            </div>  
        )
       }
       else{
       return(
        <DisplayTable issues={this.props.issues} last24={this.props.last24} last7Days={this.props.last7Days} moreThan7Days={this.props.moreThan7Days} />
       )
       }
    }
}
export default Spinner;