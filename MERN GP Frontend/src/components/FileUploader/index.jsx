import React, { Component } from 'react'
import './style.css'

//trim name if > 20?

export class UploadFileBtn extends Component {
    constructor(props){
        super(props);
        this.state = {
            message: 'Filename',
            // value: ''
        }
    }

    getUploadedFileName = (e) => {
        let files = e.target.files,
            value = e.target.value,
            message;
        // console.log(e.target.value, e.target.files)
        // this.setState({...this.state, value: e.target.value })

        if( files && files.length > 1 ) message = `${files.length} file selected`;
        else                            message = value.split( '\\' ).pop();
        if(message) this.setState({...this.state,message}); 

        this.props.fileSelectHandler(e)
    }

    render() {
        return (
            <div className="upload-btn-wrapper">
                <input id="file" 
                        type="file" 
                        className="upload-btn-file"
                        onChange={this.getUploadedFileName}
                        ></input>
                <label className="upload-btn-label" 
                        htmlFor="file">
                        {this.state.message}
                </label>
            </div>
        )
    }
}

export default UploadFileBtn
