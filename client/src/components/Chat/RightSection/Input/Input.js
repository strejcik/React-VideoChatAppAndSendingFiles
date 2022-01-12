import React, {useState} from 'react';
import './Input.css';

const Input = ({
    setNewMessage,
	newMessage,
    handleSubmit
}) => {

    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");
    const [loaded, setLoaded] = useState(0);


    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0]?.name);
    };

    const handlePress = (e) => {
        if(e.key === 'Enter'){
            handleSubmit(e, file, fileName, setLoaded);
            e.target.value = "";
        }
    }
    return (
        <React.Fragment>
        <form onSubmit={e => {e.preventDefault();}}>
            <div className="upload-btn">
                <button className="btn"><i className="fa fa-photo"/></button>
                <input type="file" name="myfile" onChange={saveFile}/>
            </div>
            <input 
                type="text" name="" 
                placeholder="type here..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter"?handlePress(e):null}
            />
            <button className="btn-send" onClick={(e) => handlePress(e, file, fileName, setLoaded)}><i className="fa fa-send"/></button>
		</form>
        </React.Fragment>
    );
}

export default Input;