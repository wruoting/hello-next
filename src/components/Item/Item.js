import React from 'react';
import styled from 'styled-components'
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';

const CardContentWrapper = styled(CardContent)`
    text-align: center;
`;

const Item = ({ option }) => {
    return (
        <>
        <CardActionArea>
            <CardContentWrapper>
                {option.title}
            </CardContentWrapper>
        </CardActionArea>
        </>
    );
}

export default Item;