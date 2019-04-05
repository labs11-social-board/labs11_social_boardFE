import React, {
    Component
} from 'react';

import {
    connect
} from 'react-redux';

import {
    getEmails
} from '../store/actions';

class ApprovedEmails extends Component {
    componentDidMount(){
        this.props.getEmails();
    }
    render() {
        return (
            <div>
                <ul>
                    {this.props.approvedEmails.map(e => {
                        return <li>{e.email}</li>
                    })}

                </ul>
            </div>
        )
    }
}

const mapStoreToProps = state => {
    return {
        approvedEmails: state.emails.approvedEmails
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getEmails: () => dispatch(getEmails())
    }
}

export default connect(
    mapStoreToProps,
    mapDispatchToProps
)(ApprovedEmails);