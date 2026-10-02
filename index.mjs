import http from "node:http";
const port=process.env.PORT||8787;
const server=http.createServer((req,res)=>{
 res.setHeader("Content-Type","application/json");
 if(req.method==="GET" && req.url==="/api/health") return res.end(JSON.stringify({ok:true,mode:process.env.OCI_TENANCY_OCID?"oci-configured":"demo"}));
 if(req.method==="GET" && req.url==="/api/vm") return res.end(JSON.stringify({status:"stopped",ip:null}));
 res.statusCode=404; res.end(JSON.stringify({error:"Not found"}));
});
server.listen(port,()=>console.log(`i8ai backend listening on ${port}`));