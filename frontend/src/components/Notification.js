import React from 'react';
// import moment from 'moment';
import styled from 'styled-components';

// globals
import { maxLengthInNotifications } from '../globals/globals.js';

const NotificationWrapper = styled.div`
	margin: 5px;
	border-radius: 5px;
	border: 1px solid #ccc;
	padding: 10px;
	position: relative;
  z-index: 9999;
  color: #aaa;
  
  &:hover {
    background-color: #418DCF;
    cursor: pointer;
    color: white;
  }
	* {
		margin: 0;
	}

	.remove-btn {
		position: absolute;
		top: 5px;
		right: 5px;

		&:hover {
			color: red;
			cursor: pointer;
		}
	}

	.links {
    font-weight: bold;

		&:hover {
			cursor: pointer;
		}
	}
`;

const Notification = ({ notification, goTo, removeNotification }) => {
  const {
    id,
    category_id,
    category_name,
    discussion_id,
    post_id,
    reply_id,
    team_id,
    team_name
    // created_at
  } = notification;
  let {
    discussion_body,
    post_body,
    reply_body
  } = notification;
  const handleRemove = () => removeNotification(id);
  if (discussion_body && discussion_body.length > maxLengthInNotifications) {
    discussion_body = discussion_body.slice(0, maxLengthInNotifications) + '...';
  }
  if (post_body && post_body.length > maxLengthInNotifications) {
    post_body = post_body.slice(0, maxLengthInNotifications) + '...';
  }
  if (reply_body && reply_body.length > maxLengthInNotifications) {
    reply_body = reply_body.slice(0, maxLengthInNotifications) + '...';
  }
  const handleClick = (ev) => {
    if(team_id){
      console.log('running')
      return goTo(ev, `/team/posts/${discussion_id}`)
    } else {
      if (category_id) {
        return goTo(ev, `/discussion/${discussion_id}`)
       } else {
         return goTo(ev, `/discussion/${discussion_id}#${post_id}`)
       }
    }
  }
  return (
    <NotificationWrapper onClick = {handleClick}> 
      <i onClick={handleRemove} className='far fa-times-circle remove-btn' />
      {/* <p>New {category_id ? 'post' : reply_id ? 'reply' : 'comment'} added {moment(new Date(Number(created_at))).fromNow()} in</p> */}
      <p>{team_id ? `/t/${team_name}` : category_id ? `/d/${category_name}` : reply_id ? `${post_body}` : `${discussion_body}`}:</p>
      {
        team_id ? 
        <p className='links' >{discussion_body}</p> :
        category_id ?
          <p className='links' >{discussion_body}</p> :
          reply_id ?
            <p className='links' >{reply_body}</p> :
            <p className='links' >{post_body}</p>
      }
    </NotificationWrapper>
  );
};

export default Notification;
