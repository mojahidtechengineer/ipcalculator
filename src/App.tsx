/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { 
  Network, 
  Layers, 
  Server, 
  Printer, 
  Phone, 
  Youtube, 
  Cpu, 
  HelpCircle,
  FileText,
  ChevronDown,
  ChevronUp,
  Globe,
  Radio
} from "lucide-react";
import SubnetCalculator from "./components/SubnetCalculator";
import PrintReportModal from "./components/PrintReportModal";
import { getSubnetDetails } from "./utils/ipUtils";

export default function App() {
  // App-wide unified project states
  const [subnetIp, setSubnetIp] = useState("192.168.1.1");
  const [cidr, setCidr] = useState(24);

  // Project Metadata States (used to customize the generated PDF report)
  const [projectName, setProjectName] = useState("ELV Network Sizing Scheme");
  const [customerName, setCustomerName] = useState("ELV Client Site");
  const [projectNo, setProjectNo] = useState("MTE-IP-2026");
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Calculate subnet details for live summary metrics
  const subnetDetails = useMemo(() => {
    try {
      return getSubnetDetails(subnetIp, cidr);
    } catch {
      return null;
    }
  }, [subnetIp, cidr]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans flex flex-col">
      {/* Brand Header */}
      <header className="bg-indigo-950 text-white py-5 px-6 border-b border-indigo-900 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-600/30">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-display tracking-tight flex items-center gap-2">
                ELV IP Calculator <span className="text-[10px] bg-indigo-800 text-indigo-200 px-2 py-0.5 rounded-full font-mono uppercase font-semibold">Mojahid Edition</span>
              </h1>
              <p className="text-xs text-indigo-200">
                Designed with <span className="font-semibold text-white">Mojahid Tech Engineer</span> — CCTV Storage & Bandwidth Engineering Tool
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-indigo-900/50 px-3 py-1.5 border border-indigo-800 rounded-lg text-xs flex items-center gap-2 text-indigo-200 font-mono">
              <Server className="w-3.5 h-3.5 text-indigo-400" />
              <span>Gateway: {subnetIp}</span>
            </div>

            <button
              onClick={() => setIsPrintModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/20 transition-all border border-indigo-500"
            >
              <Printer className="w-4 h-4" />
              Generate PDF Report
            </button>
          </div>
        </div>
      </header>

      {/* Engineering HUD Summary (Heads-Up Display) */}
      <div className="bg-white border-b border-slate-200 py-4 px-6 shadow-xs">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="flex items-center gap-3.5">
            <div className="bg-indigo-50 text-indigo-700 p-2 rounded-lg">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
                Subnet Scope
              </span>
              <span className="text-sm font-semibold font-mono text-slate-700">
                {subnetIp}/{cidr}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3.5 border-l border-slate-100 pl-4 md:pl-6">
            <div className="bg-emerald-50 text-emerald-700 p-2 rounded-lg">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
                Total Usable Host IPs
              </span>
              <span className="text-sm font-semibold font-mono text-slate-700">
                {subnetDetails?.totalUsableHosts || 0} hosts
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3.5 border-l border-slate-100 pl-4 md:pl-6">
            <div className="bg-amber-50 text-amber-700 p-2 rounded-lg">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
                Network Address
              </span>
              <span className="text-sm font-semibold font-mono text-slate-700">
                {subnetDetails?.networkAddress || "N/A"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3.5 border-l border-slate-100 pl-4 md:pl-6">
            <div className="bg-slate-50 text-slate-700 p-2 rounded-lg">
              <Radio className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
                Broadcast IP Address
              </span>
              <span className="text-sm font-semibold font-mono text-slate-700">
                {subnetDetails?.broadcastAddress || "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout Area */}
      <main className="max-w-7xl mx-auto p-4 md:p-6 flex-1 w-full space-y-6">
        
        {/* Report Branding & Client Settings Card */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="w-full px-5 py-3.5 flex items-center justify-between bg-slate-50 hover:bg-slate-100/80 transition-colors border-b border-slate-200 text-left"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4.5 h-4.5 text-indigo-600" />
              <div>
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">PDF Report Settings</span>
                <span className="block text-[11px] text-slate-400 font-medium">Customize client details and project scope for the PDF output</span>
              </div>
            </div>
            {showSettings ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>
          
          {showSettings && (
            <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4 bg-white">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g. Burj Al Salam CCTV & LAN Sizing"
                  className="w-full bg-slate-50 border border-slate-200 focus:bg-white rounded-lg p-2 text-xs text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-100 transition-all font-medium"
                />
              </div>
              
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Client / Customer Name
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Al Habtoor Group"
                  className="w-full bg-slate-50 border border-slate-200 focus:bg-white rounded-lg p-2 text-xs text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-100 transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Reference / Project Number
                </label>
                <input
                  type="text"
                  value={projectNo}
                  onChange={(e) => setProjectNo(e.target.value)}
                  placeholder="e.g. MTE-ELV-2026"
                  className="w-full bg-slate-50 border border-slate-200 focus:bg-white rounded-lg p-2 text-xs text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-100 transition-all font-mono"
                />
              </div>
            </div>
          )}
        </div>

        {/* IP Calculator Section */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden">
          <SubnetCalculator
            subnetIp={subnetIp}
            cidr={cidr}
            onSubnetIpChange={setSubnetIp}
            onCidrChange={setCidr}
          />
        </div>
      </main>

      {/* Footer (BRANDEE AS REQUESTED IN CUSTOMER INSTRUCTIONS) */}
      <footer className="bg-slate-100 border-t border-slate-200 py-8 px-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto space-y-3">
          <p className="font-bold text-slate-800 font-display text-sm">
            Generated by Mojahid Tech Engineer - CCTV Storage & Bandwidth Calculator
          </p>
          <div className="flex justify-center items-center gap-4 text-xs font-semibold text-slate-600">
            <span className="flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-indigo-600" /> +91 8825169485
            </span>
            <span className="text-slate-300">|</span>
            <a 
              href="https://www.youtube.com/results?search_query=Mojahid+Tech+Engineer" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-indigo-600 hover:underline hover:text-indigo-800"
            >
              <Youtube className="w-4 h-4 text-rose-600" /> YouTube Channel
            </a>
          </div>
          <p className="max-w-2xl mx-auto leading-relaxed text-[11px] text-slate-400 pt-3 border-t border-slate-200/60">
            ELV IP Calculator Suite &copy; 2026. Engineered specifically for Extra Low Voltage (ELV) professionals. Complete subnetwork address sizer and host configuration matrix.
          </p>
        </div>
      </footer>

      {/* Print PDF Report Modal Overlay */}
      <PrintReportModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        subnetIp={subnetIp}
        cidr={cidr}
        projectName={projectName}
        customerName={customerName}
        projectNo={projectNo}
      />
    </div>
  );
}
