let apikey = "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"

document.getElementById("input-icon").addEventListener("click", () => {
    if (document.getElementById("input").value != "") {
        document.getElementsByClassName("search")[0].style.boxShadow = " 0px 0px 20px rgba(255, 255, 255, 0.761)";
        document.getElementsByClassName("loading")[0].style.display = "flex"
        document.getElementById("input-icon").style.cursor="not-allowed"
        runMessege(document.getElementById("input").value);
    } else {
        document.getElementsByClassName("search")[0].style.boxShadow = " 0px 0px 20px rgba(243, 3, 3, 0.912)";
    }
})

let offButton = () => {
    Array.from(document.getElementsByClassName("button")).forEach((el) => {
        el.classList.remove("lang")
    })
}

Array.from(document.getElementsByClassName("button")).forEach((el) => {
    el.addEventListener("click", () => {
        offButton()
        el.classList.add("lang")
    })
})


let runMessege = (messege) => {
    let lang = document.getElementsByClassName("lang")[0].innerText;

    fetch(" https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${apikey}`
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: messege + "in" + lang,
            "temperature": 0.7,
            max_tokens: 3000
        })
    }).then((Response)=>Response.json())
    .then((result)=>{
    messegebox(messege,result.choices[0]["text"])
    document.getElementsByClassName("loading")[0].style.display = "none"
    }).catch((error)=>{
        document.getElementsByClassName("loading")[0].innerHTML="Not Found"
    }).finally((done)=>{
        document.getElementById("input").value = ""
        document.getElementById("input-icon").style.cursor="pointer"
    })
}

let count=0

let messegebox= (msg,res)=>{
let mymessegebox=document.createElement("pre")
mymessegebox.classList.add("que-box")
let createp=document.createElement("p")
createp.innerText=msg
mymessegebox.append(createp)
document.getElementById("histroy").append(mymessegebox)

let ansmessege=document.createElement("pre")
ansmessege.classList.add("ans-box")
let createp2=document.createElement("p")
createp2.innerText=res
ansmessege.append(createp2)
ansmessege.id = "ans"+count;
let icon=document.createElement("i")
icon.className="bi bi-clipboard-fill"
icon.id="copy" + count
ansmessege.append(icon)
ansmessege.append(createp2)
document.getElementById("histroy").append(ansmessege)

icon.onclick=()=>{
copymessege(ansmessege.id);
icon.classList.remove("bi-clipboard-fill")
icon.classList.add("bi-clipboard-check-fill")
setTimeout(()=>{
    icon.classList.add("bi-clipboard-fill")
    icon.classList.remove("bi-clipboard-check-fill")
},5000)
}
count++
}

let copymessege=(id)=>{
    let messege=document.getElementById(id).innerText
    navigator.clipboard.writeText(messege)
}