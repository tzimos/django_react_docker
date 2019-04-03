import React, {Component} from 'react';
import PropTypes from 'prop-types';

import '../styles/task_edit.scss'

class TaskEdit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            task_id: this.props.task_id,
            title: this.props.title,
            is_public: this.props.is_public,
            due_date: this.props.due_date,
            details: this.props.details,
            details_limit: 255
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e) => {
        const name = e.target.name;
        let new_val = name === 'is_public' ? !e.target.checked : e.target.value;

        if (name === 'is_public') {
            new_val = !e.target.checked;
            this.setState({is_public: !this.state.is_public})
        }
        if (name === 'details' && new_val.length > this.state.details_limit) {
            return;
        }

        this.setState(
            {[name]: new_val},
            () => this.props.handleChange(this.state)
        );
    };

    render = () => {
        return (
            <div className="col-12">
                <div className="col-12 container-fluid">

                    <div className="card  task-card">
                        <div className="card-header">
                            <b>Task</b>
                            {!this.props.is_public
                                ? <small className="pull-right card-is-private">private</small>
                                : ''}
                        </div>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col"><b>Title:</b></div>
                                    <input name="title" onChange={this.handleChange} type='text'
                                           value={this.state.title} className="col"/>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col"><b>Due date:</b></div>
                                    <input name="due_date" onChange={this.handleChange} type='text'
                                           value={this.state.due_date} className="col"/>
                                </div>
                            </li>

                            <li className="list-group-item">
                                <div className="row">
                                    <div className="col"><b>Is private:</b></div>
                                    <div className="col">
                                        <input name='is_public' checked={!this.state.is_public} type="checkbox"
                                               onChange={this.handleChange}/>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div className="list-group-item">
                            <textarea
                                className='textarea-taskedit'
                                name="details"
                                value={this.state.details}
                                onChange={this.handleChange}
                                rows={3}
                            />
                            <div className="float-right">
                                {this.state.details.length}/{this.state.details_limit}
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
    }
}

TaskEdit.propTypes = {
    task_id: PropTypes.number,
    title: PropTypes.string,
    is_public: PropTypes.bool,
    due_date: PropTypes.string,
    details: PropTypes.string,
    handleChange: PropTypes.func
};

export default TaskEdit;
