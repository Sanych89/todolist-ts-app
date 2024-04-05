import React, { ChangeEvent, KeyboardEvent, useState } from "react";

type addItemFormPropsType = {
    addItem: (title: string) => void;
   
};

export function AddItemForm(props: addItemFormPropsType) {
    let [title, setTitle] = useState("");
    let [error, setError] = useState<string | null>(null);


    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
            props.addItem(title);
            setTitle("");
        }

    };


    const addTask = () => {
        if (title.trim() === "") { //trim - функция обрезающая пробелы слева/справа/везде //
            setError('Field is required!');
            return;
        }
        props.addItem(title);
        setTitle("");
    };

    return <div>
        <input value={title}
            onChange={onNewTitleChangeHandler}
            onKeyDown={onKeyPressHandler}
            className={error ? 'error' : ''} />
        <button onClick={addTask}>+</button>
        {error && <div className="error-message"> {error} </div>}


    </div>;

}
