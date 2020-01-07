import React from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import './style.css'
import 'styles/fontStyles.css'
import MaterialTable, { MTableToolbar } from 'material-table';
// import { defaultCipherList } from 'constants';
// import { resolve } from 'path';
// import { reject } from 'q';
// import { width } from '@material-ui/system';

import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Save from '@material-ui/icons/Save';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
// import UserPage from './UserPage';
// import { Chip, Modal, Dialog } from '@material-ui/core';
import Modal from 'components/Modal';



const tableIcons = {
Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
Save: forwardRef((props, ref) => <Save {...props} ref={ref} />),
ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const url = "http://localhost:5000/"


class GalleryList extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      galleryItems: [],
      isOpen: false
    }
    this.myRef = React.createRef();
}

openModal = () => {
  this.setState({
      isOpen: true
  });
  document.body.style.overflow = 'hidden';
}

closeModal = () => {
  this.setState({
      isOpen: false
  });
  document.body.style.overflow = 'unset';
}

editItem = (data) => {
  console.log(data)
  
}

componentDidMount() {
  axios.get(`${url}gallery/`)
      .then(res => {  
          // console.log(res);
          const galleryItems = res.data.galleryItems;
          this.setState({ galleryItems });
  });
}
  render() {
    return (
      <React.Fragment>

      <Modal show={this.state.isOpen} onClose={this.closeModal} />
      
      <MaterialTable 
        style={{ width: '100%'}} 
        icons={tableIcons}
        title="Gallery"
        editable={{

        //   onRowAdd: newData => 
        //     {
        //       const formData = new FormData();
        //       formData.append('title', newData.title);
        //       formData.append('description', newData.description);
        //       formData.append('galleryItemImage', this.myRef.current.files[0]);

        //       formData.append('tags', newData.tags);

        //       const config = {
        //           headers: {
        //               'content-type':'multipart/form-data'
        //       }
        //     };  
        //       return new Promise((resolve, reject) => {
        //         setTimeout(() => {
        //           axios.post(`${url}gallery/`, formData, config)
        //             .then(res => {
        //               console.log(res);
        //               if(res.status === 201){
        //                 alert(res.data.message)
        //                 const data = this.state.galleryItems;
        //                 data.push(res.data.createdGalleryItem);
        //                 this.setState({ data }, () => resolve());
                      
        //               } else {
        //                 alert('Could not add object to list')
        //               }
                  
        //             });
        //           resolve();
        //         }, 1000);
        //       });
        //     },

          // onRowUpdate: (newData, oldData) => 
          //   {
          //     return new Promise((resolve, reject) => {
          //       setTimeout(() => {
          //           axios.patch(`${url}gallery/${newData._id}`, newData)
          //             .then(res => {
          //               if(res.status === 200){
          //                 alert(res.data.message);
          //                 const data = this.state.galleryItems;
          //                 const oldDataRow = data.find((currentDataRow) => {
          //                   return currentDataRow._id === newData._id;
          //                 });
          //                 const updatedRowIndex = data.indexOf(oldDataRow);
          //                 data[updatedRowIndex] = newData;    
          //                 this.setState({ data }, () => resolve()); 
          //                 } else {
          //                   alert('Could not update')
          //                 }
          //             });
          //         resolve();
          //       }, 1000);
          //     });
          //   },

          onRowDelete: oldData => 
            new Promise((resolve, reject) => {
              setTimeout(() => {
                axios.delete(`${url}gallery/${oldData._id}`)
                  .then(res => {
                    if(res.status === 200){
                      alert(res.data.message);
                      let data = this.state.galleryItems;
                      const index = data.indexOf(oldData);
                      data.splice(index, 1);
                      this.setState({ data }, () => resolve());                    
                    } else {
                      alert(`Could not delete item`)
                    }
                  })
                resolve();
              }, 1000);
            })
          
          }}
          
        columns={[
          { title: 'Image', 
            field: 'galleryItemImage',
            cellStyle: {
                width: '10%'
            }, 
            render: galleryItems => (
              <img 
                style={{ height:80 }} 
                src={url + galleryItems.galleryItemImage} 
                alt=' '
              />
            ),
            editable: "onAdd",
            editComponent: () => (
              <input type="file" ref={this.myRef}/>
            )
          },
          { title: 'Title', 
            field: 'title',
            cellStyle:{
              width: '20%'
            }
          },
          { title: 'Description', 
            field: 'description',
          },
        ]}

        data={this.state.galleryItems}  

        actions={[
          {
            icon: Edit,
            tooltip: 'Edit Item',
            onClick: (event, rowData) => this.editItem(rowData)
          }
        ]}
        components={{
          Toolbar: props => (
            <div>
              <MTableToolbar {...props} />
                <div style={{border: '1px solid white', display:'inline'}}>
                {/* this.toggleModal */}
                  <button onClick={this.openModal} style={{
                      display:'inline', 
                      float: 'right',
                      margin: '0 10px 0 0'
                  }}>
                   Add
                  </button>
                    {/* <AddBox onClick={this.openModal}/> */}
                </div>
            </div>
          )

        }}

        options={{
          actionsColumnIndex: 6,
          addRowPosition: 'first'
        }}/>
        </React.Fragment>
    )
  }
}

export default GalleryList;
