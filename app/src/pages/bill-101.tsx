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
          <ul>
            <li><strong>Type:</strong> Government</li>
            <li><strong>Portfolio:</strong> Finance</li>
            <li><strong>Originating house:</strong> Senate</li>
            <li><strong>Status:</strong> Before Senate</li>
          </ul>
          <p>Introduced with the Digital ID (Transitional and Consequential Provisions) Bill 2023, the bill: establishes an accreditation scheme for entities providing digital ID services; expands the Australian Government Digital ID System; and provides for privacy safeguards and a range of governance arrangements, including establishing the Australian Competition and Consumer Commission as the Digital ID Regulator and expanding the role of the Information Commissioner to regulate privacy protections for digital IDs.</p>
          <p><a href="https://www.aph.gov.au/Parliamentary_Business/Bills_Legislation/Bills_Search_Results/Result?bId=s1404" class="read-more">Read Full Bill ⌐◨-◨</a></p>
          <hr/>
          <div class="vote-options">
            <VoteYes /><VoteNo /><Abstain />
          </div>
        </div>
        
      </div>
    </Layout>
  );
};

export default Bills;
