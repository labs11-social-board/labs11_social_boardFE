import React from 'react';
import styled from 'styled-components';

const LinkResource = styled.a`
border-left: ${props => props.islinkselected === 'true' ? `5px solid ${props.theme.defaultColorOnHover}` : '5px solid transparent'};
//border-left: 5px solid ${props => props.theme.defaultColorOnHover};
  text-decoration: none;
  // color: ${props => props.islinkselected === 'true' ? 'blue' : 'black'};
  color: ${props => props.islinkselected === 'true' ? `${props.theme.defaultColorOnHover}` : `${props.theme.defaultColor}`};
  font-weight: 400;
  display: flex;
  align-items: center;
  span {
    width: 46px;
    display: inline-block;
    text-align: center;
    margin: 25px;
    i {
      cursor: pointer;
      padding: 10px 10px 10px 0;
      color: inherit;
      margin-left: 15px;
    }
  }
  &:hover {
    color: ${props => props.theme.defaultColorOnHover};
  }
`;

const ResourceLinks = props => {

  return (
    <>
      {props.resources.map((resource, id) => {
        return <LinkResource key={id} href={`${resource.resource}`} >{resource.title}</LinkResource>
      })}
    </>
  )
}


export default ResourceLinks;