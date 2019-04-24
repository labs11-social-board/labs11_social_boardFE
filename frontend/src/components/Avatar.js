import React from 'react';
import styled from 'styled-components';

const AvatarWrapper = styled.div`
	// display: inline-block;
	height: ${({ height }) => height};
	width: ${({ width }) => width};
	background-image: ${({ src }) => `url('${src}')`};
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	border-radius: 50%;
	margin: 0 5px 0 0;
`;

const Avatar = ({ height, width, src }) => {
	return <AvatarWrapper className="avatar" height={height} width={width} src={src} />;
};

export default Avatar;
