import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// action creators
import { updateTeam } from '../../store/actions/index.js';

class TeamSettings extends React.Component{

  render() {
    return(
      <div id='settings' className='team-settings tab-content'>
        <h1>Settings</h1>
      </div>
    );
  };
};

const mapStateToProps = state => ({ });

export default connect(mapStateToProps, { updateTeam })(TeamSettings);