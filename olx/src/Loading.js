import React from "react";
import Spinner from "react-bootstrap/Spinner"
import 'bootstrap/dist/css/bootstrap.min.css';

export function Loading(props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "50vh",
        alignItems: "center"
      }}
    >
        <Spinner animation="border" />
    </div>
  );
}

export function LoadingWrapper(props){
    const { pending, children } = props;
    return <React.Fragment>
        {
            pending ? <Loading /> : children
        }
    </React.Fragment>
}

export default Loading;
