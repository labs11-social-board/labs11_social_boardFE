import React from 'react';
import styled from 'styled-components';

const LinkResource = styled.a`
border-left: ${props => props.islinkselected === 'true' ? `5px solid ${props.theme.defaultColorOnHover}` : '5px solid transparent'};
//border-left: 25px solid ${props => props.theme.defaultColorOnHover};
  text-decoration: none;
  // color: ${props => props.islinkselected === 'true' ? 'blue' : 'black'};
  color: ${props => props.islinkselected === 'true' ? `${props.theme.defaultColorOnHover}` : `${props.theme.defaultColor}`};
  font-weight: bold;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  span {
    width: 46px;
    display: inline-block;
    text-align: center;
    margin-left: 27px;
    i {
      cursor: pointer;
      padding: 10px 10px 10px 0;
      color: inherit;
      margin-left: 35px;
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
        return <LinkResource target='_blank' key={id} href={`${resource.resource}`} >
        <i style={{ marginTop: 10 + 'px', marginRight: 9 + 'px', marginBottom: 9 + 'px' }} className="fas fa fa-key" />{resource.title}
        </LinkResource>
      })}
    </>
  )
}


export default ResourceLinks;