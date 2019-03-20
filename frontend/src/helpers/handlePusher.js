import Pusher from 'pusher-js';

// action creators
import { getNotifications } from '../store/actions/index.js';

// globals
import { pusherKey, pusherCluster } from '../globals/globals.js';

const pusher = new Pusher(
	pusherKey,
	{
		cluster: pusherCluster,
		forceTLS: true,
	}
);

const subscribeToPusher = uuid => dispatch => {
	if (process.env.NODE_ENV === 'development') Pusher.logToConsole = true;
	const channel = pusher.subscribe(`user-${ uuid }`);
	channel.bind('notification', function() {
		return getNotifications()(dispatch);
	});
};

const unsubscribeToPusher = uuid => pusher.unsubscribe(`user-${ uuid }`);

const handlePusher = { subscribeToPusher, unsubscribeToPusher };

export default handlePusher;
