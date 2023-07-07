(() => {
    let currentEmail ;

    const correctionGmail = async() => {
        console.log("Correction button clicked 😎")
        textbox = document.getElementsByClassName("editable")[0]
        if (textbox.innerText.length > 1) {
            getCorrection(textbox.innerText,textbox);
        }
    }


    const getCorrection = async(inputs,element) => {
        let url = 'http://127.0.0.1:8000/generate/correction';
        let data = {
            inputs : inputs
        };
        const result =await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
        result.json().then(json => {
          console.log(json.data);
          element.innerText = json.data;
        })
    }
    const getWrtten = async(subject,element) => {
        let url = "http://127.0.0.1:8000/generate/write";
        let data = {
            subject : subject,
        }
        const result = await fetch(url , {
            method: "POST",
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(data)
        })
        result.json().then(json => {
            console.log(json.data);
            element.innerText = json.data
        })
    }
    const writeGmail = async() => {
        subject_textbox = document.getElementById(":qe")
        textbox = document.getElementsByClassName("editable")[0]
        console.log(
            subject_textbox.value 
        )

        if(subject_textbox.value.length > 1){
            console.log("It's here")
            getWrtten(subject_textbox.value,textbox);
        }
        
    }
    const newEmailLoaded = async() => {
        const corBtnExists = document.getElementsByClassName("correction-btn")[0]
        const writeBtnExists = document.getElementsByClassName("write-btn")[0]
        if(!corBtnExists){
            const corbtn = document.createElement("img");
            corbtn.src = chrome.runtime.getURL("assets/correction.png");
            corbtn.title = "Click it for grammer corrections 😃";
            corbtn.className = "gmail-btn " + "correction-btn";
            corbtn.style.height = "30px";
            corbtn.style.width = "30px"
            gmailRightControl = document.getElementsByClassName("btC")[0]
            gmailRightControl.appendChild(corbtn);
            corbtn.addEventListener("click",correctionGmail)
        }
        if(!writeBtnExists){
            const wribtn = document.createElement("img");
            wribtn.src = chrome.runtime.getURL("assets/write.png");
            wribtn.title = "Click it for email generation 😎";
            wribtn.className = "gmail-btn " + "write-btn";
            wribtn.style.height = "30px";
            wribtn.style.width = "30px";
            wribtn.style.marginLeft = "10px";
            gmailRightControl = document.getElementsByClassName("btC")[0]
            gmailRightControl.appendChild(wribtn);
            wribtn.addEventListener("click",writeGmail)
        }
    };
    chrome.runtime.onMessage.addListener((obj, sender, response) =>{
        const {type} = obj;
        if(type === "NEW"){
            currentEmail = "";
            console.log("New Email Loaded 🤯")
            newEmailLoaded();
        }
    });
    newEmailLoaded();
})();