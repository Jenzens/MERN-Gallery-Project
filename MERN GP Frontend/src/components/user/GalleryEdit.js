import React, { Component } from 'react';
import axios from 'axios';

export class GalleryEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            galleryItemImage = ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/gallery'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    title: response.data.title,
                    description: response.data.description,
                    galleryItemImage: response.data.galleryItemImage
                })
            })
            .catch(function(error) {
                console.log(error)
            })
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}

export default GalleryEdit
