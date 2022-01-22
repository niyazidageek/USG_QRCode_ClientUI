import React, { Suspense } from 'react';

import Loader from './Loader';


const Loadable = (Component:any) => (props:any) =>
    (
        <Suspense fallback={<Loader />}>
            <Component {...props} />
        </Suspense>
    );

export default Loadable;
