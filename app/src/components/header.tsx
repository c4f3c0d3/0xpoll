import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header style={{ padding: '10px', background: '#f0f0f0',  textAlign: 'center' }}>
      <Link href="/"><h1>0xPoll - On-chain Democracy</h1></Link>
    </header>
  );
}

export default Header;
;