import React, { useState } from 'react';
import TopStoreFetcher from './TopStoreFetcher';
import TopStoreRenderer from './TopStoreRenderer';


const TopStore = ({filterCity}) => {
    const [stores, setStores] = useState(null);
  return (
    <>
      <TopStoreFetcher setStores={setStores} filterCity={filterCity} />
      <TopStoreRenderer stores={stores} />
    </>
  )
}

export default TopStore
