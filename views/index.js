let signin=document.querySelector(".col-2");
let login=document.querySelector("#login");
signin.style.display="none";
let signup=document.querySelector(".col-3");
let btn=document.querySelector(".signup");
let LINK=document.querySelector(".col-4");
let btn1=document.querySelector("#createsession");
signup.style.display="none";


login.addEventListener("click",()=> {
    if (signin.style.display === "none") {
        signin.style.display = "block";
    }else {
        signin.style.display = "none";
    }
});



btn.addEventListener("click",()=> {
    signin.style.display="none";
    console.log("NOOI")
    if (signup.style.display === "none") {
        signup.style.display = "block";
    }else {
        signup.style.display = "none";
    }
});


LINK.style.display="none";
btn1.addEventListener("click",()=> {
    LINK.style.display="none";
    console.log("NOI")
    if (LINK.style.display === "none") {
        LINK.style.display = "block";
    }else {
        LINK.style.display = "none";
    }
});