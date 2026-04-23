import { Link, useParams } from "react-router-dom";
import { SEO } from "@/components/SEO";
import { Icon } from "@/components/Icon";
import { useState } from "react";

export default function LabEnvironment() {
  const { id } = useParams();
  const [code, setCode] = useState(`# Welcome to GyaanSetu Lab\n# Lab id: ${id}\n\nimport pandas as pd\n\ndata = pd.DataFrame({"name": ["Aanya", "Karan"], "score": [92, 88]})\nprint(data.head())\n`);
  const [output, setOutput] = useState("Click Run to execute your code.");
  return (
    <div className="min-h-screen bg-inverse-surface text-inverse-on-surface flex flex-col">
      <SEO title="Lab Environment" />
      <header className="px-5 py-3 flex items-center gap-4 bg-surface-container-lowest text-on-surface">
        <Link to="/labs" className="w-10 h-10 grid place-items-center rounded-xl hover:bg-surface-container-low text-on-surface-variant">
          <Icon name="arrow_back" />
        </Link>
        <div className="flex-1">
          <p className="text-xs uppercase font-bold tracking-widest text-primary">Live Lab</p>
          <h1 className="font-black">Pandas Data Cleaning Sprint</h1>
        </div>
        <button onClick={() => setOutput("name  score\n0  Aanya     92\n1  Karan     88")} className="px-5 py-2.5 primary-gradient text-on-primary font-bold rounded-xl flex items-center gap-2">
          <Icon name="play_arrow" filled className="text-base" /> Run
        </button>
      </header>
      <div className="flex-1 grid lg:grid-cols-2 gap-px bg-surface-container">
        <div className="bg-[#1a1a1a] p-5 font-mono text-sm">
          <div className="flex items-center gap-2 text-xs uppercase font-bold text-on-surface-variant mb-3">
            <Icon name="code" className="text-base" /> editor.py
          </div>
          <textarea value={code} onChange={(e) => setCode(e.target.value)} spellCheck={false} className="w-full h-full bg-transparent outline-none text-green-300 resize-none min-h-[400px]" />
        </div>
        <div className="bg-[#0a0a0a] p-5 font-mono text-sm">
          <div className="flex items-center gap-2 text-xs uppercase font-bold text-on-surface-variant mb-3">
            <Icon name="terminal" className="text-base" /> output
          </div>
          <pre className="text-emerald-300 whitespace-pre-wrap">{output}</pre>
        </div>
      </div>
    </div>
  );
}
