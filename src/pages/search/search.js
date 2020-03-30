import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components'
import Input from '@material-ui/core/Input';
import Item from '../../components/Item';
import { getRecipes } from '../../redux/API/search';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';

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

    function deleteItem(outerIndex) {
        let oldArray = selectedListState;
        let newArray = oldArray.map((element, index) => {
            if (index != outerIndex) {
                return element;
            }
            return 0;
        });
        newArray.splice(outerIndex, 1);
        setSelectedListState(newArray);
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
        <List dense={false}>
        {
            selectedListState.length > 0 ?
                selectedListState.map((item, index)=> (
                      <ListItem>
                        <ListItemText
                          primary={item.title}
                        />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" aria-label="delete">
                            <DeleteIcon onClick={() => deleteItem(index)}/>
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                ))
            :
            <></>
        }
        </List>
        </>
    );
}

export default Search;