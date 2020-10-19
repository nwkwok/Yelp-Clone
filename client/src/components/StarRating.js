import React, { Fragment } from 'react';

function StarRating(props) {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= props.rating) {
            stars.push(<i key={i} className="fas fa-star text-warning"></i>);
        } else if (i === Math.ceil(props.rating) && !Number.isInteger(props.rating)) {
            stars.push(<i key={i} className="fas fa-star-half-alt text-warning"></i>)
        } else {
            stars.push(<i key={i} className="far fa-star text-warning"></i>)
        }
    }

    return <Fragment>{stars}</Fragment>
}

export default StarRating;
