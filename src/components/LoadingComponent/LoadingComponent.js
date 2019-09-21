import React,{ Component } from 'react'
import Spinner from 'react-bootstrap/Spinner'

class LoadingComponent extends Component{
    render(){
        return(
            <div style={{display: "flex",flexDirection: "column",marginTop: "20%",justifyContent: "center",alignItems: "center"}}>
                <Spinner animation="border" role="status">
  <span className="sr-only">Loading...</span>
</Spinner>
<p>Loading..</p>
            </div>
        )
    }
}

export default LoadingComponent