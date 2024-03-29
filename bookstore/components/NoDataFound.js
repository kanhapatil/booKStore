import React from 'react';
import Image from 'next/image';

const NoDataFound = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
      <Image 
        width={200}
        height={200}
        src="/images/no-data-found.gif"
        alt="No Data Found"
        quality={100}
        priority
      />
    </div>
  )
}

export default NoDataFound;
