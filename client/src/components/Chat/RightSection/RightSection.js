import React, {useEffect, useRef} from 'react';
import './RightSection.css';
import Messages from './Messages/Messages';
import Input from './Input/Input';

const RightSection = ({
	messages,
	user,
	setNewMessage,
	newMessage,
	handleSubmit,
	currentChat
}) => {
    return (
        <React.Fragment>
        <div className="right-section">
		{
			messages.map((m, k) => 
				<Messages message={m} own={m.sender === user._id} user={user} key={k} sender={m.sender}/> 
			)
		}
	
			<div className="right-section-bottom">
				{
					currentChat === null ? <><h1 className={`conversationInfo`}>Select conversation to start</h1></> : <Input
					setNewMessage={setNewMessage}
					value={newMessage}
					handleSubmit={handleSubmit}
				/>
				}
			</div>
		</div>

        </React.Fragment>
    )
}

export default RightSection
