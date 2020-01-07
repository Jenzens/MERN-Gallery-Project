import React, { Component } from 'react';
import axios from 'axios';

// temp url
const url = "http://localhost:5000/";
export default class Gallery extends Component {
   state = {
     galleryItems: []
   };

    componentDidMount() {
        axios.get( url + 'gallery')
            .then(res => {  
                const galleryItems = res.data.galleryItems;
                this.setState({ galleryItems });
        });
    }

    render() {
        return (
            <div className="galleryContainer">
                {this.state.galleryItems.map((galleryItem, i) => { 
                    return (
                        <div className="" key={i}>

                            <div className="imgC">
                            <img src={ url + galleryItem.galleryItemImage} alt="p" />
                            </div>

                            <div className="titleC">
                             {'Title: ' + galleryItem.title }
                            </div>
                            
                            <div className="descC">
                            {'Desc: ' + galleryItem.description}
                            </div>

                        </div> 
                    )
                })}
            </div>
        )
    }
}


