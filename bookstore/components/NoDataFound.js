import React from 'react';
import Image from 'next/image';

const NoDataFound = () => {
  return (
    <div className='noDataFound'>
      <Image 
        src="/images/notFound.svg"
        alt="No Data Found"
        width={300}
        height={300} 
        layout="responsive"
      />
    </div>
  )
}



export default NoDataFound;
