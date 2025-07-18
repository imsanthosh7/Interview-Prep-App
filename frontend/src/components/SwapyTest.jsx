import React, { useEffect, useRef, useState } from 'react';
import { createSwapy } from 'swapy';

const SwapyTest = () => {
    const containerRef = useRef(null);
    const [items] = useState(['One', 'Two', 'Three']);

    useEffect(() => {
        if (containerRef.current) {
            const swapy = createSwapy(containerRef.current, {
                dragAxis: 'both'
            });

            swapy.onSwap((event) => {
                console.log('Swapped:', event);
            });

            return () => {
                swapy.destroy();
            };
        }
    }, []);

    return (
        <div className='grid grid-cols-3 gap-4' ref={containerRef}>
            <div data-swapy-slot="1">
                <div data-swapy-item="1">
                    <div className="p-4 bg-white rounded-lg shadow">Item 1</div>
                </div>
            </div>
            <div data-swapy-slot="2">
                <div data-swapy-item="2">
                    <div className="p-4 bg-white rounded-lg shadow">Item 2</div>
                </div>
            </div>
            <div data-swapy-slot="3">
                <div data-swapy-item="3">
                    <div className="p-4 bg-white rounded-lg shadow">Item 3</div>
                </div>
            </div>
             <div data-swapy-slot="4">
                <div data-swapy-item="4">
                    <div className="p-4 bg-white rounded-lg shadow">Item 3</div>
                </div>
            </div>
        </div>

    );
};

export default SwapyTest;
