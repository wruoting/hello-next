import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components'
import Input from '@material-ui/core/Input';
import Item from '../../components/Item';
import { getRecipes } from '../../redux/API/search';


const ClickWrapper = styled.div``;

const Search = ({

}) => {
    const [listState, setListState] = useState([]);
    const [valueState, setValueState] = useState('');
    const [countInTimeout, setCountInTimeout] = useState(0);
    const [selectedListState, setSelectedListState] = useState([]);

    useEffect(() => {
        if (countInTimeout === 1) {
            getRecipes(valueState)
            .then((recipes) => {
                setListState(recipes);
            })
        }
    }, [countInTimeout])

    const inputCallback = useCallback((e) => {
        setCountInTimeout(0);
        setTimeout(() => {
            setCountInTimeout(1);
            }, 1000);
        setValueState(e.target.value);
    }, []);

    function clickItem(item) {
        const oldArray = selectedListState;
        oldArray.push(item)
        setSelectedListState(oldArray);
        setValueState('');
        setListState([]);
    }

    return (
        <>
        <Input
            value={valueState}
            fullWidth={true}
            onChange={inputCallback}
        />
        {
            listState.length > 0 ?
                listState.map((item)=> (
                    <ClickWrapper
                        onClick={() => {clickItem(item)}}
                    >
                        <Item
                            option={item}
                        />
                    </ClickWrapper>
                ))
            :
            <></>
        }
        </>
    );
}

export default Search;