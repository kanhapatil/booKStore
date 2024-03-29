import React, { useState } from 'react';
import TopStoreFetcher from './TopStoreFetcher';
import TopStoreRenderer from './TopStoreRenderer';


const TopStore = () => {
    const [stores, setStores] = useState(null);

  return (
    <>
      <TopStoreFetcher setStores={setStores} />
      <TopStoreRenderer stores={stores} />
    </>
  )
}

export default TopStore
