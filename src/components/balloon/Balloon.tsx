import React from 'react';

export interface BalloonProps {
    width : number,
    fill : string,
    className? : string,
    style? : React.CSSProperties
}

const Balloon : React.FC<BalloonProps> = (props : BalloonProps) => {
    let { width, className, fill } = props;
    let newWidth = width ? width : 75;
    let newFill = fill ? fill : "#000";
    return (
        <svg version="1.1" className={className} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            width={`${newWidth}px`} height={`${newWidth * 2}px`} viewBox="0 0 500 1000" enable-background="new 0 0 500 1000" xmlSpace="preserve">
            <g>
                <path fill="none" stroke="#FFFFFF" stroke-width="4.5499" stroke-miterlimit="10">
                    <animate attributeName="d" dur="3000ms" values="
                    M236.89,526.398
                    c0,0-59.131,139.902,42.098,241.133c101.232,101.23-27.537,154.688-59.263,200.185;
                    
                    M236.767,526.398
	                c-6.199,26.519-38.432,94.624,42.099,241.133c64.248,134.313-8.358,174.15-40.084,219.647;
                    
                    M236.89,526.398
	                c0,0-59.131,139.902,42.098,241.133c101.232,101.23-27.537,154.688-59.263,200.185;" repeatCount="indefinite"/>
                </path>
                <path opacity={0.75} className="mainBalloon" fill={newFill} d="M415.312,289.892c0-98.839-66.474-221.428-165.312-221.428S84.688,191.053,84.688,289.892
                    c0,91.833,57.392,205.458,144.803,221.107c-3.924,9.452-12.856,14.86-12.856,14.86s29.267,1.148,42.466,2.583
                    c-6.268-2.35-7.141-9.576-6.646-15.653C349.935,510.751,415.312,387.909,415.312,289.892z"/>
                <path fill="none" stroke="#FFFFFF" stroke-width="12.133" stroke-linecap="round" stroke-miterlimit="10" d="M127.714,202.484
                    c0,0,19.267-71.947,90.018-94.031"/>
            </g>
        </svg>
    );
}
export default Balloon;