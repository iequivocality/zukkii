import { createBreakpoint } from 'react-use';

export default function useBreakpoint() {
    return createBreakpoint({
        'desktop' : 1024,
        'tablet' : 720,
        'mobile' : 320,
    })();
}