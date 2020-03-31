import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components'
import Input from '@material-ui/core/Input';
import Item from '../../components/Item';
import { getRecipes, getRecipeByIDs } from '../../redux/API/search';
import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const ClickWrapper = styled.div``;

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

const Search = ({

}) => {
    const classes = useStyles()
    const [listState, setListState] = useState([]);
    const [valueState, setValueState] = useState('');
    const [countInTimeout, setCountInTimeout] = useState(0);
    const [selectedListState, setSelectedListState] = useState([]);
    const [ingredients, setIngredients] = useState([]);

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

    const compileIngredientsCallback = useCallback(() => {
        const ids = selectedListState.map((item) => {
            return item.recipeId;
        })
        getRecipeByIDs(ids, 2)
        .then((ingredients) => {
            setIngredients(ingredients);
        })
    }, [selectedListState]);

    const deleteAllSelectionsCallback = useCallback(() => {
        setIngredients([]);
        setSelectedListState([]);
    }, [selectedListState, ingredients]);

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
        <Button
            variant="contained"
            onClick={compileIngredientsCallback}
        >
            Compile Ingredients
        </Button>
        <Button
            variant="contained"
            onClick={deleteAllSelectionsCallback}
        >
            Clear All
        </Button>
        {
            ingredients.length > 0 ? (
                <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Ingredient</TableCell>
                        <TableCell align="right">Amount</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {ingredients.map((ingredient) => (
                        <TableRow key={ingredient.name}>
                        <TableCell component="th" scope="row">
                            {ingredient.name}
                        </TableCell>
                        <TableCell align="right">{ingredient.amount} {ingredient.unit}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
                    ) : (<></>)
        }
        </>
    );
}

export default Search;