import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <header style={{ padding: '10px', background: '#f0f0f0',  textAlign: 'center' }}>
    <Image
        src="/images/logo.png"
        alt="0xPoll - On-chain Democracy"
        width={80} 
        height={80} 
        priority  
      />
      <Link href="/"><h1>0xPoll - On-chain Democracy</h1>
      </Link>
    </header>
  );
}

export default Header;