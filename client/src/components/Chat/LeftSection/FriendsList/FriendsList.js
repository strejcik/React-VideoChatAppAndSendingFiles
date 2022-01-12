import React from 'react';

const FriendsList = ({ friends }) => {
    return (
        <React.Fragment>
            <ul>
                {
                    friends.map((e, i) => <Friend friend={e} key={i}/>)
                }
            </ul>
        </React.Fragment>
    );
}

export default FriendsList;