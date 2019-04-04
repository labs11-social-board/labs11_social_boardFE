import React from 'react';
import styled from 'styled-components';

const Toggle = styled.div `

  margin-bottom: 5%;
  
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  label{
    cursor: pointer;
    text-indent: -65px;
    width: 65px;
    height: 30px;
    background: grey;
    display: flex;
    border-radius: 100px;
    position: relative;
    align-items: center;
    margin-left: 18%;
  }

  label:after {
    content: '';
    position: absolute;
    top: 3px;
    left: 5px;
    width: 25px;
    height: 24px;
    background: #fff;
    border-radius: 90px;
    transition: 0.3s;
  }
  
  input:checked + label {
    background: green;
  }
  
  input:checked + label:after {
    left: calc(100% - 5px);
    transform: translateX(-100%);
  }
  
  label:active:after {
    width: 30px;
  }
`;
const ToggleSwitch = ({ isPrivate, handleToggle }) => {
  return (
    <Toggle>
      <input id='isPrivate' type='checkbox' name='isPrivate' checked={isPrivate} onChange={handleToggle} />
      <label htmlFor='isPrivate'>Private? </label>
    </Toggle>
  );
};

export default ToggleSwitch;