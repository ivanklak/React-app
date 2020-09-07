import React from "react";
import s from "./ProfileInfo.module.css";

class ProfileStatus extends React.Component {
  //statusInputRef = React.createRef();

  state = {
    editMode: false,
    status: this.props.status
  };

  activateEditMode = () => {
    this.setState({
      editMode: true
    });
    //this.forceUpdate(); - говорим реакту что стэйт изменился (лучше не использовать)
  };

  deactivateEditMode = () => {
    this.setState({
      editMode: false
    });
    this.props.updateStatus(this.state.status);
  };
  onStatusChange = e => {
    this.setState({
      status: e.currentTarget.value
    });
  };

  componentDidUpdate(prevProps, prevState) { 
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status
      });
    }

    console.log("ComponentDidUpdate");
  }

  render() {
    return (
      <div>
        {!this.state.editMode && (
          <div>
            <span onDoubleClick={this.activateEditMode}>
              {this.props.status || "No status"}
            </span>
          </div>
        )}
        {this.state.editMode && (
          <div>
            <input
              // ref={this.statusInputRef}
              onChange={this.onStatusChange}
              autoFocus={true}
              onBlur={this.deactivateEditMode}
              value={this.state.status}
            />
          </div>
        )}
      </div>
    );
  }
}
export default ProfileStatus;

// https://images.unsplash.com/photo-1499084732479-de2c02d45fcc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80
