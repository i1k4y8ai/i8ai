import React,{useState} from "react";
import {createRoot} from "react-dom/client";
import {Server, ShieldCheck, Play, Square, RotateCcw, Trash2, Copy, Check, Terminal, Settings, Activity, AlertTriangle} from "lucide-react";
import "./style.css";

const initialLog=["i8ai prêt.","Mode simulation actif.","Aucune action OCI réelle ne sera exécutée."];

function App(){
 const [demo,setDemo]=useState(true);
 const [status,setStatus]=useState("Prête");
 const [ip,setIp]=useState("");
 const [logs,setLogs]=useState(initialLog);
 const [copied,setCopied]=useState(false);
 const [ram,setRam]=useState(12);
 const [cpu,setCpu]=useState(2);

 const log=(x)=>setLogs(l=>[...l,`${new Date().toLocaleTimeString()} — ${x}`]);
 const create=async()=>{
   setStatus("Création…"); setIp(""); log("Vérification IAM…"); await wait(350);
   log("IAM : OK (simulation)"); log("Réseau : OK (simulation)"); await wait(350);
   log(`Shape : VM.Standard.A1.Flex — ${cpu} OCPU / ${ram} Go`);
   await wait(600); log("Instance créée.");
   setIp("203.0.113.42"); setStatus("En ligne"); log("VM RUNNING.");
 };
 const action=(name)=>{setStatus(name+"…");log(`${name} demandé.`);setTimeout(()=>{setStatus(name==="Suppression"?"Supprimée":"En ligne");log(`${name} terminé (simulation).`)},500)};
 const copy=()=>{navigator.clipboard?.writeText(`ssh -i ~/.ssh/i8ai opc@${ip}`);setCopied(true);setTimeout(()=>setCopied(false),1200)};
 return <div className="app">
   <header><div className="brand"><div className="logo">i8</div><div><b>i8ai</b><small>OCI control panel</small></div></div>
   <label className="switch"><input type="checkbox" checked={demo} onChange={e=>setDemo(e.target.checked)}/><span></span> Simulation</label></header>
   <main>
    <section className="hero"><div><span className="eyebrow">ORACLE CLOUD</span><h1>Ta VM, sans terminal.</h1><p>Un panneau mobile pour préparer, créer et administrer une instance OCI.</p></div><div className={"state "+(status==="En ligne"?"ok":"")}><span></span>{status}</div></section>
    <section className="grid">
      <div className="card maincard"><div className="cardhead"><div><h2>Instance</h2><p>Configuration de déploiement</p></div><Server size={22}/></div>
       <div className="fields">
        <label>Région<select defaultValue="eu-zurich-1"><option>eu-zurich-1 — Zurich</option><option>eu-frankfurt-1 — Frankfurt</option></select></label>
        <label>Image<select defaultValue="Oracle Linux 9"><option>Oracle Linux 9</option></select></label>
        <label>Shape<select defaultValue="VM.Standard.A1.Flex"><option>VM.Standard.A1.Flex</option></select></label>
        <label>OCPU<input type="number" min="1" max="4" value={cpu} onChange={e=>setCpu(+e.target.value)}/></label>
        <label>RAM (Go)<input type="number" min="1" max="24" value={ram} onChange={e=>setRam(+e.target.value)}/></label>
       </div>
       <button className="primary" onClick={create}><Play size={18}/> Créer la VM</button>
       <div className="notice"><ShieldCheck size={18}/><span><b>Sécurité :</b> les identifiants OCI ne doivent jamais être placés dans le navigateur.</span></div>
      </div>
      <div className="card"><div className="cardhead"><div><h2>Connexion</h2><p>Après le déploiement</p></div><Terminal size={22}/></div>
       <div className="ipbox">{ip||"Aucune IP attribuée"} {ip&&<button onClick={copy}>{copied?<Check size={16}/>:<Copy size={16}/>}</button>}</div>
       <div className="actions">
        <button disabled={!ip} onClick={()=>action("Redémarrage")}><RotateCcw size={17}/> Redémarrer</button>
        <button disabled={!ip} onClick={()=>action("Arrêt")}><Square size={17}/> Arrêter</button>
        <button disabled={!ip} className="danger" onClick={()=>action("Suppression")}><Trash2 size={17}/> Supprimer</button>
       </div>
      </div>
      <div className="card logcard"><div className="cardhead"><div><h2>Journal</h2><p>Événements de la session</p></div><Activity size={22}/></div>
       <div className="logs">{logs.map((l,i)=><div key={i}><span>›</span>{l}</div>)}</div>
      </div>
      <div className="card"><div className="cardhead"><div><h2>Backend</h2><p>Connexion OCI sécurisée</p></div><Settings size={22}/></div>
       <div className="backend"><div><span className="dot"></span> {demo?"Simulation":"Backend requis"}</div><p>Le mode réel passera par un backend serveur. Les clés OCI restent côté serveur.</p></div>
       <div className="notice warn"><AlertTriangle size={18}/><span>Ne colle jamais une clé privée OCI dans cette page.</span></div>
      </div>
    </section>
   </main>
   <footer>i8ai · interface mobile-first · aucun appel OCI en mode simulation</footer>
 </div>
}
const wait=ms=>new Promise(r=>setTimeout(r,ms));
createRoot(document.getElementById("root")).render(<App/>);