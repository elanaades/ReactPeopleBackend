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
        idToUpdate: '',
        selectAll: false
    }

    componentDidMount = () => {
        this.getAllPeople();
    }

    getAllPeople = () => {
        axios.get('/api/people/getall').then(res => {
            this.setState({ people: res.data, isLoading: false });
        });
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
        this.setState({ selectAll: false })
    }


    onCheckBoxSelect = (id) => {
        const { selectedPeopleById, people } = this.state;

        if (selectedPeopleById.includes(id)) {
            this.setState({ selectedPeopleById: selectedPeopleById.filter(s => s !== id) })
            this.setState({ selectAll: false });
        }
        else {
            this.setState({ selectedPeopleById: [...selectedPeopleById, id] })
            if (selectedPeopleById.length === people.length - 1) {
                this.setState({ selectAll: true })
            }
        } 
    }

    onCheckBoxAllClick = () => {
        this.setState({ selectAll: !this.state.selectAll }, () => {
            if (this.state.selectAll) {
                const ids = this.state.people.map(p => p.id);
                this.setState({ selectedPeopleById: ids });
            }
            else {
                this.setState({ selectedPeopleById: [] });
            }
        });

    }

    generateTable = () => {
        const { isLoading, people, selectedPeopleById, selectAll } = this.state;

        //if (isLoading) {
        //    return <h1> Loading...</h1>
        //}

        return people.map(p => <PersonRow
            key={p.id}
            person={p}
            onDeleteClick={() => this.onDeleteClick(p)}
            onCheckBoxSelect={() => this.onCheckBoxSelect(p.id)}
            isSelected={selectedPeopleById.includes(p.id)}
            onEditClick={() => this.onEditClick(p)}
            selectAll={selectAll}
        />)
    }

    render() {

        const { isAdding, isEditing, selectAll } = this.state;
        const { firstName, lastName, age, id } = this.state.person;
        const onDeleteAllClick = this.onDeleteAllClick;
        const onCheckBoxAllClick = this.onCheckBoxAllClick;
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
                        <thead style={{ textAlign: "Center" }}>
                            <tr>
                                <th style={{ width: "15%" }}>
                                    <button className="btn btn-danger w-100" style={{ marginBottom: "15px" }} onClick={onDeleteAllClick}>Delete All</button>
                                    <input className="form-check-input"
                                        style={{ transform: "scale(1.5)" }}
                                        type="checkbox"
                                        onChange={onCheckBoxAllClick}
                                        checked={selectAll}
                                    />
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