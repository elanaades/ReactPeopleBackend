import React from 'react';
import PersonForm from './PersonForm';
import PersonRow from './PersonRow';
import axios from 'axios';


class PeopleTable extends React.Component {

    state = {
        person: {
            firstName: '',
            lastName: '',
            age: ''
        },
        people: [],
        selectedPeopleById: [],
        isLoading: true,
        isAdding: false,
        isEditing: false,
        idToUpdate: ''
    }

    componentDidMount = () => {
        this.getAllPeople();
    }

    getAllPeople = () => {
        axios.get('/api/people/getall').then(res => {
            this.setState({ people: res.data, isLoading: false });
        });
    }

   
    onCheckBoxSelect = (id) => {
        const { selectedPeopleById } = this.state;

        if (selectedPeopleById.includes(id)) {
            this.setState({ selectedPeopleById: selectedPeopleById.filter(s => s !== id) })
        }
        else {
            this.setState({ selectedPeopleById: [...selectedPeopleById, id] })
        }   
    }

    onTextChange = e => {
        const copy = { ...this.state.person };
        copy[e.target.name] = e.target.value;
        this.setState({ person: copy });
    }

    onAddClick = () => {
        this.setState({ isLoading: true, isAdding: true });

        axios.post('/api/people/add', this.state.person).then(() => {
            this.getAllPeople();
            this.setState({
                isAdding: false,
                person: {
                    firstName: '',
                    lastName: '',
                    age: ''
                }
            });
        });
    }

    onEditClick = (person) => {
        
        this.setState({
            isEditing: true,
            idToUpdate: person.id,
            person: {
                firstName: person.firstName,
                lastName: person.lastName,
                age: person.age 
            }
        })
    }

    onCancelClick = () => {
        this.setState({
            isEditing: false,
            person: {
                firstName: '',
                lastName: '',
                age: ''
            }
        });
    }

    onUpdateClick = () => {
        console.log();
        const { firstName, lastName, age } = this.state.person;
        const personToUpdate = {
            firstName: firstName,
            lastName: lastName,
            age: age,
            id: this.state.idToUpdate
        }
        this.setState({ isLoading: true })

        axios.post('/api/people/update', personToUpdate).then(() => {
            this.getAllPeople();
            this.setState({
                isEditing: false,
                person: {
                    firstName: '',
                    lastName: '',
                    age: ''
                }
            });
        });
    }

    onDeleteClick = (person) => {
        this.setState({ isLoading: true });
        axios.post('/api/people/delete', person).then(() => {
            this.getAllPeople();
        });

    }

    onDeleteAllClick = () => {
        this.setState({ isLoading: true });
        const { selectedPeopleById } = this.state;
        axios.post('/api/people/deleteall', { ids: [...selectedPeopleById] }).then(() => {
            this.getAllPeople();
        });
    }

    onCheckAllClick = () => {
        const ids = this.state.people.map(p => p.id);
        this.setState({ selectedPeopleById: ids });
    }

    onUncheckAllClick = () => {
        this.setState({ selectedPeopleById: [] });
    }

    generateTable = () => {
        const { isLoading, people, selectedPeopleById } = this.state;

        //if (isLoading) {
        //    return <h1>Loading...</h1>
        //}

        return people.map(p => <PersonRow
            key={p.id}
            person={p}
            onDeleteClick={() => this.onDeleteClick(p)}
            onCheckBoxSelect={() => this.onCheckBoxSelect(p.id)}
            isSelected={selectedPeopleById.includes(p.id)}
            onEditClick={() => this.onEditClick(p)}
        />)
    }

    render() {

        const { isAdding, isEditing } = this.state;
        const onDeleteAllClick = this.onDeleteAllClick;
        const onCheckAllClick = this.onCheckAllClick;
        const onUncheckAllClick = this.onUncheckAllClick;
        const { firstName, lastName, age, id } = this.state.person;
        const onCancelClick = this.onCancelClick;
        const onUpdateClick = this.onUpdateClick;

        return (

            <div className='container mt-5'>

                <PersonForm
                    firstName={firstName}
                    lastName={lastName}
                    age={age}
                    id={id}
                    onTextChange={this.onTextChange}
                    onAddClick={this.onAddClick}
                    isAdding={isAdding}
                    isEditing={isEditing}
                    onUpdateClick={onUpdateClick}
                    onCancelClick={onCancelClick}
                    
                />

                <div className="container mt-5">
                    <table className="table table-hover table-striped table-bordered">
                        <thead>
                            <tr>
                                <th style={{ width: "15%" }}>
                                    <button className="btn btn-danger w-100" onClick={onDeleteAllClick}>Delete All</button>
                                    <button className="btn btn-outline-danger w-100 mt-2" onClick={onCheckAllClick}>Check All</button>
                                    <button className="btn btn-outline-danger w-100 mt-2" onClick={onUncheckAllClick}>Uncheck All</button>
                                </th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Age</th>
                                <th>Edit/Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.generateTable()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default PeopleTable;