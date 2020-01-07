import React, { Component } from 'react'
import './style.css';
import '../../styles/fontStyles.css';

export class CategoryHandler extends Component {
//    constructor(){
//        super();

 
//        this.handleCategoryChange = this.handleCategoryChange.bind(this);
//    }
        
    render() {
        return (
            <div>
                    <label className="form-label">Category:</label>
                        <div className="form-cat-wrap">

                            <div className="form-category-item">
                                <label className="form-category-label"> 
                                <input 
                                    type="radio" 
                                    value="Image"
                                    className="form-category-radio"
                                    onChange={this.props.handleCategoryChange}
                                    checked={this.props.category === "Image"}
                                />
                                Image
                                </label>
                            </div>

                            <div className="form-category-item">
                                <label className="form-category-label">
                                <input 
                                    type="radio" 
                                    value="Photo"
                                    className="form-category-radio"
                                    onChange={this.props.handleCategoryChange}
                                    checked={this.props.category === "Photo"}
                                />
                                Photo
                                </label>
                            </div>

                            <div className="form-category-item">
                                <label className="form-category-label">
                                <input 
                                    type="radio" 
                                    value="Icon"
                                    className="form-category-radio"
                                    onChange={this.props.handleCategoryChange}
                                    checked={this.props.category === "Icon"}
                                />
                                Icon
                                </label>
                            </div>

                        </div>
                </div>
        )
    }
}

export default CategoryHandler
