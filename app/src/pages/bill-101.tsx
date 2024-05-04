// pages/bills.tsx
import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import VoteYes from '../components/VoteYes'; 
import VoteNo from '../components/VoteNo'; 
import Abstain from '../components/VoteAbstain'; 


const Bills = () => {
  return (
    <Layout>
      <div style={{ padding: '20px' }}>
        <div class="bill">
          <Link href="/bill-101">
            <h4 class="bill-title">Digital ID Bill</h4>
          </Link>
          <p>Introduced with the Digital ID (Transitional and Consequential Provisions) Bill 2023, the bill: establishes an accreditation scheme for entities providing digital ID services; expands the Australian Government Digital ID System; and provides for privacy safeguards and a range of governance arrangements, including establishing the Australian Competition and Consumer Commission as the Digital ID Regulator and expanding the role of the Information Commissioner to regulate privacy protections for digital IDs.</p>
            <VoteYes /><VoteNo /><Abstain />
        </div>
        
      </div>
    </Layout>
  );
};

export default Bills;
