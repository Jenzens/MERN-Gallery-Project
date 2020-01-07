import React, { Component } from 'react';
import './style.css';

export class TagManager extends Component {
    inputKeyDown = (e) => {
        const val = e.target.value;
        if (e.key === 'Enter' && val) {
            // Check if tag already exists
            e.preventDefault();
            if (this.props.tags.find(tag => tag.toLowerCase() === 
            val.toLowerCase())) {
                return;
            } 
            
            // Add function passed down from parent component Modal
            this.props.addTag(val);

            this.tagInput.value = null;
        } else if (e.key === 'Backspace' && !val) {
            this.props.removeTag(this.state.length -1);
        }
    }



    render() {
        return (

                <div className="input-tag">
                    <ul className="input-tag__tags">
                        {this.props.tags.map((tag, i) => (
                            <li key={tag}>
                            {tag}
                            <button type="button" onClick={() => { this.props.removeTag(i); }}> X </button>
                            </li>
                        ))}

                        <li className="input-tag__tags__input">
                            <input type="text"  
                                onKeyDown={this.inputKeyDown} ref={c => {this.tagInput = c;}} 
                                placeholder="Enter a tag..."/>
                        </li>
                    </ul> 
                </div>
        )
    }
}

export default TagManager
