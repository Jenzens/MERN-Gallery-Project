import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import FileUploader from 'components/FileUploader';
import CategoryManager from 'components/CategoryManager';
import TagManager from 'components/TagManager'; 

import 'styles/fontStyles.css'
import './style.css'

class Modal extends React.Component {
    state = {
        title: '',
        description: '',
        galleryItemImage: null,
        galleryItemImagePreview: null,
        isChecked: false,
        tags: [],
        category: '',
}

fileSelectHandler = event => {
    this.setState({
        galleryItemImage: event.target.files[0]
    });
    
    // FIX: error när fil valts och sedan tagits bort
    let reader = new FileReader();
    reader.onload = (e) => {
        this.setState({galleryItemImagePreview: e.target.result});
    }
    
    reader.readAsDataURL(event.target.files[0]);
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

addTag = (tag) => {
    this.setState({ tags: [...this.state.tags, tag]});
}

removeTag = (i) => {
    const newTags = [...this.state.tags];
    newTags.splice(i, 1);
    this.setState({ tags: newTags });
}

handleCategoryChange = (event) => {
    this.setState({
        category: event.target.value
    });
}

uploadHandler = async event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('title', this.state.title);
    formData.append('description', this.state.description);
    formData.append('galleryItemImage', this.state.galleryItemImage);
    formData.append('tags', this.state.tags);
    formData.append('category', this.state.category);
    const config = {
        headers: {
            'content-type':'multipart/form-data'
        }
    };
    await axios.post('http://localhost:5000/gallery', formData, config)
        .then(response => {
           if (response.status === 201) {
                // alert('Item Created')
                this.props.onClose();
                //clear form on close?    
           } else {
               console.log('error creating item')
           }
        })
        .catch(error => {
            console.log(error.response)
        })
};

  render() {
    if(!this.props.show) {
      return null;
    }

    return (
      <div className="backdrop">
        <div className="modal-wrapper">
            <div className="modal-header"></div>
        
            <div id="modal-body" className="modal-body">   
          
                <div className="form-field-imagearea">
                    <div className="form-imagearea">
                        <div className="form-imagebox">
                            <img id="target" src={this.state.galleryItemImagePreview} alt=' ' />
                        </div>
                    </div>
                </div>

                 <div className="form-field-col">
                 <label className="form-label">Choose a file:</label> 
                    <FileUploader fileSelectHandler={this.fileSelectHandler}/>
                </div> 

                <div className="form-field-row">
                    <input className="form-input" 
                            type="text" 
                            placeholder="Title..." 
                            value={this.state.title}
                            onChange={this.onChangeTitle}/>
                </div>
        
                <div className="form-field-textarea">
                    <textarea className="form-textarea" 
                            type="textarea"
                            placeholder="Description"
                            value={this.state.description}
                            onChange={this.onChangeDescription} />
                </div>

                <div className="form-field-col">
                    <CategoryManager handleCategoryChange={this.handleCategoryChange} category={this.state.category} />
                </div>

                <div className="form-field-tags">
                 <label className="form-label">Tags:</label>
                    <TagManager tags={this.state.tags} addTag={this.addTag} removeTag={this.removeTag}/>
                </div>
            
                <div className="form-field-bottom">
                    <button className="form-button" onClick={(e) => {
                        e.preventDefault()
                        this.props.onClose()
                    }}>
                        Close
                    </button>   
                    <button className="form-button" onClick={this.uploadHandler}>
                        Confirm
                    </button> 
                </div>

            </div>
            <div className="modal-header"></div>
            <div className="modal-bottom"></div>


        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;