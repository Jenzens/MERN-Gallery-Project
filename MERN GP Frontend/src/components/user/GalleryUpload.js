import React, { Component } from 'react';
import axios from 'axios';

export default class GalleryUpload extends Component {
    state = {
            title: '',
            description: '',
            galleryItemImage: null
    }

    fileSelectHandler = event => {
        debugger
        this.setState({
            galleryItemImage: event.target.files[0]
        });
    }

    onChangeTitle = event => {
        this.setState({
            title: event.target.value
        });
    }

    onChangeDescription = event => {
        this.setState({
            description: event.target.value
        });
    }

    uploadHandler = async event => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', this.state.title);
        formData.append('description', this.state.description);
        formData.append('galleryItemImage', this.state.galleryItemImage)
        
        const config = {
            headers: {
                'content-type':'multipart/form-data'
            }
        };

        await axios.post('http://localhost:5000/gallery', formData, config)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error.response)
            })

    };

    render() {
        return (
            <div className="uForm-container">
              <p>Uploadform</p>
                    <div className="">
                        <form action="/" method="post" encType='multipart/form-data' >

                            <div>
                                <input type="file" onChange={this.fileSelectHandler} />
                            </div>

                            <div>
                                <label>Name:</label>
                                <input type="text"
                                        value={this.state.title}
                                        onChange={this.onChangeTitle}>
                                </input>
                            </div>

                            <div>
                                <label>Desc: </label>
                                <input type="text"
                                        value={this.state.description}
                                        onChange={this.onChangeDescription}>
                                </input>
                            </div>

                            <div>
                                <button onClick={this.uploadHandler}>Upload</button>
                            </div> 

                        </form>
                    </div>
                </div>
        )
    }
}


