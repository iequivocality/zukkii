import React from 'react';

export interface LogoProps {
    width: number;
    height: number;
    className? : string;
}

export default function Logo(props : LogoProps) {
    let { width, height, className } = props;

    return (
        // <img src={logo} width={width} height={height}></img>
        <svg version="1.1" className={className} id="Layer_1" xmlBase="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            width={width} height={height} viewBox={`0 0 1000 1000`} enableBackground={`new 0 0 1000 1000`} xmlSpace="preserve">
            <path fill="#51B14A" d="M187.201,235.659c33.443,12.721,66.659,28.409,99.162,47.175C520.75,418.157,636.027,664.911,562.92,855.313
                c75.31-29.271,141.533-83.412,185.077-158.828c101.574-175.93,41.295-400.889-134.636-502.46
                C473.399,113.217,302.41,134.855,187.201,235.659z"/>
            <path fill="#7C32A2" d="M500,150.795c22.604,27.738,43.525,57.932,62.29,90.436c135.324,234.387,111.779,505.72-46.734,634.06
                c79.854,12.305,164.277-1.469,239.694-45.012c175.93-101.572,236.206-326.531,134.634-502.46
                C809.076,187.856,650.177,121.1,500,150.795z"/>
            <path fill="#5BBEE4" d="M737.661,190.082c5.706,35.324,8.728,71.933,8.728,109.465c0,270.647-156.057,493.856-357.504,525.745
                c63.004,50.584,143.003,80.866,230.087,80.866c203.146,0,367.827-164.683,367.827-367.827
                C986.799,376.716,882.566,239.454,737.661,190.082z" />
        </svg>
    );
}