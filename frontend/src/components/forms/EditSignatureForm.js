import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// action creators
import { editSignature } from '../../store/actions/index.js';

const EditSignatureFormWrapper = styled.form`
	border: 1px solid red;
	padding: 10px;
`;

class EditSignatureForm extends Component {
	state = { signature: this.props.signature };
	handleInputChange = e => this.setState({ [e.target.name]: e.target.value });
	handleSubmit = e => {
		e.preventDefault();
		const { signature } = this.state;
		const { editSignature, toggleForm } = this.props;
		return editSignature(signature).then(() => toggleForm());
	};
	render() {
		const { toggleForm } = this.props;
		const { signature } = this.state;
		return(
			<EditSignatureFormWrapper onSubmit = { this.handleSubmit }>
				<h1>Edit Signature</h1>

				<input
					placeholder = 'Enter new signature...'
					name = 'signature'
					value = { signature || '' }
					onChange = { this.handleInputChange }
				/>

				<button type = 'submit'>Submit</button>

				<button type = 'button' onClick = { toggleForm }>Cancel</button>
			</EditSignatureFormWrapper>
		);
	}
};

export default connect(null, { editSignature })(EditSignatureForm);
