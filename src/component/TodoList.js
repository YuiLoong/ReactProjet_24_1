import TodoItem from './TodoItem';
import './TodoList.css';
import React from 'react';
import {useContext,useMemo,useState} from 'react';
import {TodoStateContext} from "../App";

const TodoList = () => {
    const [search, setSearch] = useState("");
    const todo = useContext(TodoStateContext);
    const onChangeSearch = (e) => {
        setSearch(e.target.value);

    };
    // const getSearchResult = () => {
    //     return search === ""
    //     ?  todo
    //     :  todo.filter((it) => it.content.toLowerCase().includes(search.toLowerCase()));

        
    // };
    // const getVisibleResult = () => {
    //     return Done === true
    //     ? todo
    //     : todo.filter((it) => !it.isDone);
    // };



    const [Done,setDone] = useState(false);
    const onChangeVisible = (e) => {
        setDone(e.target.checked);
    };
    
    const getSearchResult = () => {
        const searchResult = search === ""
            ? todo
            : todo.filter((it) => it.content.toLowerCase().includes(search.toLowerCase()));

        return Done
            ? searchResult.filter((it) => !it.isDone)
            : searchResult;  // 완료된 항목 필터링
    };


    const analyzeTodo = useMemo(() => {
        console.log("analyzeTodo 함수 호출");
        const totalCount = todo.length;
        const doneCount = todo.filter((it) => it.isDone).length;
        const notDoneCount = totalCount - doneCount;
        return {
            totalCount,
            doneCount,
            notDoneCount,
        };
    },[todo]);
    const {totalCount, doneCount, notDoneCount} = analyzeTodo              ;

    return (
        <div className='TodoList'>
            <h4>📌Todo List📌</h4>
            <div>
                <div>총개수: {totalCount}</div>
                <div>완료된 할 일: {doneCount}</div>
                <div>아직 완료하지 못한 할 일: {notDoneCount}</div>
            </div>
            <input
                value={search}
                onChange={onChangeSearch}
                className="searchbar"
                placeholder='검색어를 입력하세요'/>

            <input className='Checked' 
            type='Checkbox'
            checkede={Done}
            onChange={onChangeVisible}

            /> 완료된 할 일 숨기기

            <div className='list_wrapper'>
                {getSearchResult().map((it)=> (
                    <TodoItem key = {it.id}{...it} />
                ))}
            </div>
        </div>
    );
};


TodoList.defaultProps = {
    todo: [],
};


export default TodoList;