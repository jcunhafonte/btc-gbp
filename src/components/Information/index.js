import React from 'react';
import PropTypes from 'prop-types';

import Arrow from '../Arrow';
import './index.css';

const Information = ({prices}) => {
    const formatPrice = price => Number(price).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    const actualPrice = prices[prices.length - 1] && prices[prices.length - 1].value;
    const oldPrice = prices[prices.length - 2] && prices[prices.length - 2].value;
    const priceDifference = actualPrice && oldPrice ? actualPrice - oldPrice : null;
    const arrow = !priceDifference || priceDifference === 0 ? "" : priceDifference > 0 ? "up" : "down";

    const price = () => {
        const label = "Bitcoin price";
        let price = `£0.00`;

        if (actualPrice) price = `£${formatPrice(actualPrice)}`;

        return (
            <div className="Information__Item">
                <h2 className="Information__Item-heading">{price}</h2>
                <p className="Information__Item-description">{label}</p>
            </div>
        )
    };
    const priceBalance = () => {
        const label = "Some seconds ago (£)";
        let priceBalance = `£0.00`;

        if (priceDifference && priceDifference !== 0) {
            priceBalance = formatPrice(priceDifference);
            priceBalance = Math.sign(Number(priceDifference)) === -1 ? `£${priceBalance}` : `£+${priceBalance}`;
        }

        return (
            <div className="Information__Item">
                <div className="Information__Item-heading">
                    <span>{priceBalance}</span>
                    {arrow && <Arrow direction={arrow}/>}
                </div>
                <p className="Information__Item-description">{label}</p>
            </div>
        )
    };
    const pricePercentage = () => {
        const label = "Some seconds ago (%)";
        let percentage = "0,00%";

        if (actualPrice && oldPrice && priceDifference !== 0) percentage = `${((priceDifference / oldPrice) * 100).toFixed(2)}%`;

        return (
            <div className="Information__Item">
                <div className="Information__Item-heading">
                    <span>{percentage}</span>
                    {arrow && <Arrow direction={arrow}/>}
                </div>
                <p className="Information__Item-description">{label}</p>
            </div>
        )
    };

    return (
        <div className="Information">
            {price()}
            {priceBalance()}
            {pricePercentage()}
        </div>
    )
};

Information.propTypes = {
    prices: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string.isRequired,
        date: PropTypes.date
    })).isRequired
};

export default Information;