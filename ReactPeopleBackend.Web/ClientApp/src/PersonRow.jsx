import React from 'react';

export default function PersonRow({ person, onDeleteClick, onCheckBoxSelect, isSelected, onEditClick }) {

    const { firstName, lastName, age } = person;

    return (

        <tr>
            <td>
                <input className="form-check-input" style={{ transform: "scale(1.5)" }} type="checkbox" checked={isSelected}                    onChange={onCheckBoxSelect} />
            </td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{age}</td>
            <td>
                <button className="btn btn-warning" onClick={onEditClick}>Edit</button>
                <button className="btn btn-danger" style={{ marginLeft: "10px" }} onClick={onDeleteClick}>Delete</button>
            </td>
        </tr>
    )
}