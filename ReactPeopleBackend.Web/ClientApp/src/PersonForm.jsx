import React from 'react';

export default function AddPersonForm({ firstName, lastName, age, id, onTextChange, onAddClick, isAdding, isEditing, onCancelClick, onUpdateClick }) {

    return (
        <div className='row'>
            <div className='col-md-3'>
                <input value={firstName} onChange={onTextChange} type='text' name="firstName" placeholder='First Name' className='form-control' />
            </div>

            <div className='col-md-3'>
                <input value={lastName} onChange={onTextChange} type='text' name="lastName" placeholder='Last Name' className='form-control' />
            </div>

            <div className='col-md-3'>
                <input value={age} onChange={onTextChange} type='text' name="age" placeholder='Age' className='form-control' />
            </div>


            {!isEditing ?
                <div className='col-md-3'>
                    <button disabled={isAdding} onClick={onAddClick} className='btn btn-primary w-100'>Add</button>
                </div> :
                <div className='col-md-3'>
                    <button type="button" className="btn btn-success mr-2" style={{ marginRight: "10px" }} value={id} onClick={onUpdateClick}>Update</button>
                    <button type="button" className="btn btn-secondary" onClick={onCancelClick}>Cancel</button>
                </div>
            }


        </div>
    );
}