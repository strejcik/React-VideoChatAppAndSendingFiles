import React from 'react';

const Suggestion = (props) => {

return <div className={'hint'}>
    <p>{props.suggestion[`${props.k}`]}</p>
</div>
}

export default Suggestion;

