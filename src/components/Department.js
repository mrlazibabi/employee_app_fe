import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddDepModal } from './AddDepModal';
import { EditDepModal } from './EditDepModal';

export class Department extends Component {

    constructor(props) {
        super(props);
        this.state = { deps: [], addModalShow: false, editModalShow: false };
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList() {
        fetch('https://localhost:44303/api/department')
            .then(Response => Response.json())
            .then(data => {
                this.setState({ deps: data });
            }
            );
    }

    componentDidUpdate() {
        this.refreshList();
    }

    deleteDep(depID){
        if(window.confirm('Are you sure you want to delete')){
            fetch('https://localhost:44303/api/department/' + depID,{
                method:'DELETE',
                headers:{'Accept':'application/json', 'Content-Type':'application/json'}
            })
        }
    }

    render() {
        const { deps, depID, depNAME } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });


        return (
            <div>
                <Table className='mt-4' striped bordered hover size="small">
                    <thead>
                        <tr>
                            <th>DepartmentID</th>
                            <th>DepartmentName</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map(dep =>
                            <tr key={dep.DepartmentID}>
                                <td>{dep.DepartmentID}</td>
                                <td>{dep.DepartmentName}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button
                                            className='mr-2' variant='info'
                                            onClick={() => this.setState({ editModalShow:true, depID : dep.DepartmentID, depNAME : dep.DepartmentName })}
                                        >
                                            Edit
                                        </Button>

                                        <Button
                                        className='mr-2'
                                        onClick={()=> this.deleteDep(dep.DepartmentID)}
                                        variant='danger'
                                        >
                                        Delete
                                        </Button>
                                        <EditDepModal
                                            show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            depID={depID}
                                            depNAME={depNAME}
                                        />
                                    </ButtonToolbar>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button
                        variant='primary'
                        onClick={() => this.setState({ addModalShow: true })}> Add Department</Button>

                    <AddDepModal
                        show={this.state.addModalShow}
                        onHide={addModalClose}
                    />
                </ButtonToolbar>
            </div>
        )
    }
}