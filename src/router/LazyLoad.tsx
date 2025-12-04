import React, { Suspense, type LazyExoticComponent, type ComponentType } from 'react';
import { Spin } from 'antd';

interface ComponentProps {
    [key: string]: unknown;
}

export const lazyLoad = (Component: LazyExoticComponent<ComponentType<ComponentProps>>): React.ReactNode => {
    return (
        <Suspense
            fallback={
                <Spin
                    size="small"
                    fullscreen
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}
                />
            }
        >
            <Component />
        </Suspense>
    );
};
