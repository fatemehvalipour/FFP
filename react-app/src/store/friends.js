
const READ_FRIENDS = 'friends/READ_FRIENDS';
const CREATE_FRIEND = 'friends/CREATE_FRIEND';
const DELETE_FRIEND = 'friends/DELETE_FRIEND';

const readFriends = (friends) => {
    return {
        type: READ_FRIENDS,
        friends
    }
}

const createFriend = (friend) => {
    return {
        type: CREATE_FRIEND,
        friend
    }
}

export const getUsersFriends = () => async (dispatch) => {
    const response = await fetch('/api/friends/');
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }

        dispatch(readFriends(data["friends"]))
    }
}

export const addFriend = (username) => async (dispatch) => {
    const response = await fetch('/api/friends/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(createFriend(data["friend"]));
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data;
        }
    } else {
        return ['An error occurred. Please try again.'];
    }
}

const initialState = { byId: {}, allIds: [] }

export default function reducer(state = initialState, action){
    let newState;
    switch (action.type) {
        case READ_FRIENDS:
            newState = { ...state, allIds: action.friends };
            newState.byId = action.friends.reduce((byId, friend) => {
                byId[friend.id] = friend;
                return byId
            }, {});

            return newState;

        case CREATE_FRIEND:
            newState = { ...state };

            newState.byId = {...newState.byId, [action.friend.id]: action.friend}
            newState.allIds = [...newState.allIds, action.friend]

            return newState;

        case DELETE_FRIEND:
            newState = { ...state };
            delete newState.byId[action.id];
            newState.byId = { ...newState.byId };
            return newState;
        default:
            return state;
    }
}
