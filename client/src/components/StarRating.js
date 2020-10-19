import React, { Fragment } from 'react';

function StarRating(props) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= props.rating) {
            stars.push(<i class="fas fa-star"></i>);
        } else if (i === Math.ceil(props.rating) && !Number.isInteger(props.rating)) {
            stars.push(<i class="fas fa-star-half-alt"></i>)
        } else {
            stars.push(<i class="far fa-star"></i>)
        }
    }

    return <Fragment>{stars}</Fragment>
}

export default StarRating;
