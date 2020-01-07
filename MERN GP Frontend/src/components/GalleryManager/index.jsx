import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import './style.css';

//routes 
import GalleryList from 'components/GalleryList/index'

const routes =[
    {
        path: '/sameaslink',
        exact: true,
        sidebar: () => <Route component={GalleryList} />
    },
]

export class UserPage extends Component {
    render() {
        return (
            <Router>
            <div className="up-wrapper">
                <div className="up-side-menu">
                    <div className="up-menu-container">
                        <div className="up-menu"> Menu </div>    
                        <div className="up-menu-item">
                            <div className="menu-item-bg"></div>
                                <button className="menu-btn">
                                    <Link to='/sameaslink' className="menu-link"> 
                                        Gallery Edit
                                    </Link>
                                </button>
                        </div>
                    </div>  
                </div>
                <div className="up-content-wrapper">
                    {/* <div className="up-content-container"><p>Page Title</p></div> */}
      
                    <div className="up-content-container">
                        <Switch>
                            {routes.map((route, index) => (
                                <Route
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    children={<route.sidebar /> }
                                />
                            ))}
                        </Switch>
                    </div>
                </div> 
            </div>
            </Router>
        )
    }
}

export default UserPage
