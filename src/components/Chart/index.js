import React, {Component} from 'react';
import {AreaClosed, Line, Bar, LinePath} from '@vx/shape';
import {curveMonotoneX} from '@vx/curve';
import {scaleTime, scaleLinear} from '@vx/scale';
import {withTooltip, Tooltip} from '@vx/tooltip';
import {localPoint} from '@vx/event';
import {AxisLeft, AxisBottom} from '@vx/axis';
import {extent, max, bisector} from 'd3-array';
import {timeFormat} from 'd3-time-format';
import {formatLocale} from 'd3-format';

const formatDate = timeFormat("%I:%M:%S %p");
const xSelector = d => new Date(d.label);
const ySelector = d => d.value;
const bisectDate = bisector(xSelector).left;
const formatPrice = price => Number(price).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");

class Chart extends Component {
    constructor(props) {
        super(props);

        this.handleTooltip = this.handleTooltip.bind(this);
    }

    handleTooltip({event, data, xSelector, xScale, yScale}) {
        const {showTooltip} = this.props;
        const {x} = localPoint(event);
        const x0 = xScale.invert(x);
        const index = bisectDate(data, x0, 1);
        const d0 = data[index - 1];
        const d1 = data[index];
        let d = d0;

        if (d1 && d1.date) d = x0 - xSelector(d0.date) > xSelector(d1.date) - x0 ? d1 : d0;

        showTooltip({
            tooltipData: d,
            tooltipLeft: x,
            tooltipTop: yScale(d.value)
        });
    }

    render() {
        let {width, height, margin, hideTooltip, tooltipData, tooltipTop, tooltipLeft, data} = this.props;

        const xMax = width - margin.left - margin.right;
        const yMax = height - margin.top - margin.bottom;
        const xScale = scaleTime({
            range: [0, xMax],
            domain: extent(data, xSelector),
        });
        const yScale = scaleLinear({
            range: [yMax, yMax / 3],
            domain: [0, max(data, ySelector) + yMax / 3]
        });
        const newLocale = formatLocale({
            "decimal": ".",
            "thousands": ",",
            "grouping": [3],
            "currency": ["£", ""],
            "dateTime": "%a %b %e %X %Y",
            "date": "%m/%d/%Y",
            "time": "%H:%M:%S",
            "periods": ["AM", "PM"],
            "days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "shortDays": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            "months": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            "shortMonths": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        });
        const tickFormatLeft = newLocale.format("($,.2f");
        const tickFormatBottom = timeFormat("%I:%M:%S %p");

        return (
            <div className="Chart">
                <svg width={width} height={height} style={{overflow: 'inherit', width: '100%'}} viewBox={`0 0 ${width} ${height}`}>
                    <AxisLeft scale={yScale} top={0} left={0} hideAxisLine={true} hideTicks={true} hideZero={true}
                              numTicks={2} tickFormat={tickFormatLeft}
                              tickLabelProps={() => ({
                                  dx: '-0.30em',
                                  dy: '0.25em',
                                  textAnchor: 'end',
                                  fontFamily: 'Nunito',
                                  fontSize: 12,
                                  fill: '#7D95B6'
                              })}
                    />
                    <AxisBottom scale={xScale} top={yMax} hideAxisLine={true} hideTicks={true}
                                numTicks={4} tickFormat={tickFormatBottom}
                                tickLabelProps={() => ({
                                    dx: '-0.30em',
                                    dy: '0.25em',
                                    textAnchor: 'end',
                                    fontFamily: 'Nunito',
                                    fontSize: 12    ,
                                    fill: '#7D95B6'
                                })}
                    />
                    <AreaClosed data={data} xScale={xScale} yScale={yScale} x={xSelector} y={ySelector} strokeWidth={1}
                                stroke={'transparent'} fill={'#32f4c0'} curve={curveMonotoneX}/>
                    <LinePath data={data} xScale={xScale} yScale={yScale} x={xSelector} y={ySelector}
                              strokeWidth={3} stroke="#32deaa" fill="transparent"
                    />
                    <Bar x={0} y={0} width={width} height={height} fill="#7d95b62b" data={data} style={{cursor: 'crosshair'}}
                         onMouseMove={data => event => this.handleTooltip({event, data, xSelector, xScale, yScale})}
                         onMouseLeave={data => event => hideTooltip()}
                         onTouchMove={data => event => this.handleTooltip({event, data, xSelector, xScale, yScale})}
                         onTouchEnd={data => event => hideTooltip()}
                    />
                    {tooltipData && (
                        <g>
                            <Line from={{x: tooltipLeft, y: 0}} to={{x: tooltipLeft, y: yMax}}
                                  stroke="#7D95B6" strokeWidth={1} style={{pointerEvents: 'none'}}/>
                            <circle cx={tooltipLeft} cy={tooltipTop + 1} r={5} fillOpacity={0.1} strokeOpacity={0.1}
                                    strokeWidth={1} style={{pointerEvents: 'none'}}/>
                            <circle cx={tooltipLeft} cy={tooltipTop} r={5} fill="#ffffff" stroke="#5776F6"
                                    strokeWidth={2} style={{pointerEvents: 'none'}}/>
                        </g>
                    )}
                </svg>
                {tooltipData && (
                    <div>
                        <Tooltip top={tooltipTop - 12} left={tooltipLeft + 12} style={{
                            backgroundColor: '#5776F6',
                            color: '#ffffff',
                            boxShadow: 'none'
                        }}>{`£${formatPrice(tooltipData.value)}`}</Tooltip>
                        <Tooltip top={yMax - 14} left={tooltipLeft} style={{
                            transform: 'translateX(-50%)',
                            boxShadow: 'none',
                            border: '1px solid #7D95B6'
                        }}>{formatDate(xSelector(tooltipData))}</Tooltip>
                    </div>
                )}
            </div>
        );
    }
}

export default withTooltip(Chart);