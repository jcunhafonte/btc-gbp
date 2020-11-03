import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchPrices} from '../../actions';
import Header from '../../components/Header';
import Information from '../../components/Information';
import Chart from '../../components/Chart';
import './index.css'

const INTERVAL = 30000;

class App extends Component {
    constructor(props) {
        super(props);

        this.requestPrices();
        setInterval(() => this.requestPrices(), INTERVAL);
    }

    requestPrices() {
        this.props.dispatch(fetchPrices());
    }

    render() {
        const {prices, fetching, error} = this.props;
        const title = 'BTC to GBP';
        const data = prices.map(price => {
            return {
                label: price.date,
                value: Number(price.value)
            }
        });

        return (
            <div className="App">
                <Header title={title}/>
                <div className="App__Status">
                    {fetching && <h2>Loading...</h2>}
                    {error && <h2>Something went wrong...</h2>}
                </div>
                {prices.length >= 1 &&
                <React.Fragment>
                    <Information prices={prices}/>
                    <Chart data={data} width={520} height={400} margin={{top: 0, left: 0, right: 0, bottom: 0}}/>
                </React.Fragment>
                }
            </div>
        )
    }
}

export default connect((state) => state)(App)