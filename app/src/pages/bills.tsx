// pages/bills.tsx
import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

const Bills = () => {
  return (
    <Layout>
      <div style={{ padding: '20px' }}>
        <h1>Bills</h1>
        <p>These are the Bills currently up for vote in the Australian Federal Parliament, tap on a bill title below to find out more information and lodge your vote!</p>
        <div className="bill">
          <Link href="/bill-101">
            <h4 className="bill-title">Digital ID Bill</h4>
          </Link>
          <p>Introduced with the Digital ID (Transitional and Consequential Provisions) Bill 2023, the bill: establishes an accreditation scheme for entities providing digital ID services; expands the Australian Government Digital ID System; and provides for privacy safeguards and a range of governance arrangements, including establishing the Australian Competition and Consumer Commission as the Digital ID Regulator and expanding the role of the Information Commissioner to regulate privacy protections for digital IDs.</p>
          <Link href="/bill-101" className="bill-link">More Information ⌐◨-◨</Link>
        </div>
        <div className="bill">
          <h4 class="bill-title">Accountability of Grants, Investment Mandates and Use of Public Resources Amendment (End Pork Barrelling) Bill 2024</h4>
          <p>Amends: the Public Governance, Performance and Accountability Act 2013 to provide a resource management framework for the use and management of public resources, including for grants administration; the Public Service Act 1999 to provide the Public Service Commissioner with certain powers in relation to breaches of the code of conduct relating to the resource management framework; and 9 Acts in relation to oversight of investment mandates.</p>
          <a href="https://www.aph.gov.au/Parliamentary_Business/Bills_Legislation/Bills_Search_Results/Result?bId=r7153" className="bill-link">More Information ⌐◨-◨</a>
        </div>
        <div className="bill">
          <h4 className="bill-title">Australian Naval Nuclear Power Safety Bill 2023</h4>
          <p>Introduced with the Australian Naval Nuclear Power Safety (Transitional Provisions) Bill 2023, the bill establishes a framework to regulate the nuclear safety aspects of Australia’s nuclear-powered submarine enterprise.</p>
          <a href="#" class="bill-link">More Information ⌐◨-◨</a>
        </div>
        <div className="bill">
          <h4 className="bill-title">Lobbying (Improving Government Honesty and Trust) Bill 2023</h4>
          <p>Establishes a scheme in relation to dealings between lobbyists and Government representatives.</p>
          <a href="https://www.aph.gov.au/Parliamentary_Business/Bills_Legislation/Bills_Search_Results/Result?bId=r7100" className="bill-link">More Information ⌐◨-◨</a>
        </div>
        <div className="bill">
          <h4 className="bill-title">Migration Amendment (Limits on Immigration Detention) Bill 2023</h4>
          <p>Amends the Migration Act 1958 to: prohibit the detention of minors; and introduce a 90-day limit on immigration detention which can only be extended in certain circumstances.</p>
          <a href="https://parlinfo.aph.gov.au/parlInfo/search/display/display.w3p;query=Id%3A%22legislation%2Fbillhome%2Fr7112%22" className="bill-link">More Information ⌐◨-◨</a>
        </div>
      </div>
    </Layout>
  );
};

export default Bills;
