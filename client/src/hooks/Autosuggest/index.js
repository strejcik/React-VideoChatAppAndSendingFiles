import React, { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';
import useDataFetching from '../Fetch';
import './hint.css';






function UseAutoSuggest({user}) {
    const ENDPOINT = `http://localhost:5000/api/v1/users`;
    const { loading, results, error } = useDataFetching(ENDPOINT);
    
    const key = 'username';
    
    const [suggestions, setSuggestions] = useState([]);
    const [value, setValue] = useState('');
    const [data, setData] = useState([]);



    const renderSuggestion = suggestion => (
        <div className={'hint'}>
            <p className={'item'}>{suggestion[`${key}`]}</p>
        </div>
    );
    
    
    const getSuggestions = v => {

        const inputValue = v.trim().toLowerCase();
        const inputLength = inputValue.length;
        return inputLength === 0 ? [] : data.filter(e =>
            e[`${key}`].toLowerCase().slice(0, inputLength) === inputValue    
        );
    };
    
    const getSuggestionValue = suggestion => suggestion[`${key}`];



    useEffect(() => {
        setData(results.users);
    });

    const onSuggestionSelected = (event, { suggestion }) =>{
        let selectedUser = data.filter(e => e.username === suggestion.username && e.username !== user.username && user.username !== suggestion.username);

        if(selectedUser.length === 0) return ;



        let newConversation = {
            senderId: user._id,
            receiverId: selectedUser[0].id
        };

        fetch('http://localhost:5000/api/v1/users/friends/add', {
            method: 'post',
            headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(newConversation)
        }).then(res => res.json())
        .then(res => window.location.reload())
        .catch(err => console.log(err));

    }

    const inputProps = {
        placeholder: 'Type username...',
        value,
        onChange: (e, {newValue}) => { setValue(newValue)} 
    };

    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value));
    }

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    }


    return (
    <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={onSuggestionSelected}
    />)


}

export default UseAutoSuggest;