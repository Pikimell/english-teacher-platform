import{i as t}from"./custom-lesson-presets-B4NuEc3i.js";const n=async s=>(await t.post("/homework/list",s)).data,c=async s=>(await t.post("/homework",s)).data,m=async s=>{const o={page:1,limit:100,userEmail:s},a=await t.post("/homework/lessons",o),{data:e}=a;return e.items};export{c as a,n as b,m as g};
//# sourceMappingURL=homework-CexZFWns.js.map
