import { createBreakpoint } from 'react-use';

export default function useBreakpoint() {
    return createBreakpoint({
        'big-desktop-up' : 1800,
        'desktop-up' : 1200,
        'tablet-landscape-up' : 900,
        'tablet-portrait-up' : 600,
        'phone-only' : 350,
    })();
}