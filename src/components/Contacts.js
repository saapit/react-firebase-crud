import React, { Fragment, useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import firebaseDB from '../firebase';

const Contacts = () => {

    const [contactObjects, setContactObjects] = useState({})
    const [currentId, setCurrentId] = useState('')

    //similar to component did mount
    useEffect(() => {
        firebaseDB.child('contacts').on('value', snapshot => {
            if(snapshot.val()!=null){
                setContactObjects({
                    ...snapshot.val()
                })
            }else {
                setContactObjects({})
            }
        })
    }, [])

    const addOrEdit = (obj) => {
        if(currentId==''){
            firebaseDB.child('contacts').push(
                obj,
                err => {
                    if(err){
                        console.log(err);
                    }else{
                        setCurrentId('')
                    }
                }
                )
            }else {
                firebaseDB.child(`contacts/${currentId}`).set(
                    obj,
                    err => {
                        if(err){
                            console.log(err);
                        }else{
                            setCurrentId('')
                        }
                    }
                    )
            }
    }

    const onDelete = (id) => {
        if(window.confirm('Are you sure to delete this?')){
            firebaseDB.child(`contacts/${id}`).remove(
                err => {
                    if(err){
                        console.log(err);
                    }else{
                        setCurrentId('')
                    }
                }
                )
        }
    }
    return (
        <Fragment>
        <div className="jumbotron jumbotron-fluid">
            <div className="container">
                <h1 className="display-4 text-center">Contact Register</h1>
            </div>
        </div>
        <div className="row">
            <div className="col-md-5">
                <ContactForm {...({addOrEdit, currentId, contactObjects})}/>
            </div>
            <div className="col-md-7">
                <table className="table table-borderless table-striped">
                    <thead className="thead-dark">
                    <tr>
                        <th>Full Name</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            //return the key of values from the collections
                            Object.keys(contactObjects).map(id => {
                                return <tr key={id}>
                                    <td>{contactObjects[id].fullName}</td>
                                    <td>{contactObjects[id].mobile}</td>
                                    <td>{contactObjects[id].email}</td>
                                    <td>{contactObjects[id].address}</td>
                                    <td>
                                        <a className="btn text-primary">
                                            <i className="fas fa-pencil-alt" onClick={() => {setCurrentId(id)}}></i>
                                        </a>
                                        <a className="btn text-danger">
                                            <i className="fas fa-trash-alt" onClick={() => {onDelete(id)}}></i>
                                        </a>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
        </Fragment>
    )
}

export default Contacts;
