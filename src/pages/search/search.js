import React, { useCallback } from 'react';
import styled from 'styled-components'
import Input from '@material-ui/core/Input';

const Search = ({

}) => {
    const inputCallback = useCallback((e) => {
        console.log(e.target.value);
    }, []);
    return (
        <Input
            onChange={inputCallback}
        >
        </Input>
    );
}

export default Search;