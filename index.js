/////////////////////////////// WORKING CODE ////////////////////////////////////////////////////////

///////////////////////encryption and storage//////////////////
document.querySelector(".encrypt-btn").addEventListener("click",()=>
{
   var input=document.querySelector(".input-text").value;
   //console.log(input);
   var password=document.querySelector(".set-password").value;
   //console.log(password);

   var buffer=inputToUnicode(input);

   displayResult(".enc-result",buffer);

   var objToStore={message:input,pass:password,emoji:buffer};

   saveDataToLocalStorage(objToStore);
   
})

//////////////////////////decryption//////////////////////////
document.querySelector(".decrypt-btn").addEventListener("click",()=>
{
   
   var decEmoji=document.querySelector(".emoji-text").value;
   var decEmojiCode=emojiToCode(decEmoji);
   var decPass=document.querySelector(".get-password").value;

   var storedArray=JSON.parse(localStorage.getItem('data'));

   var a=validateEmojiAndPassword(storedArray,decEmojiCode,decPass);

   if(a==0) //if input emoji not stored
   displayResult(".dec-result","Input emoji not stored!");
})

/////////////// encrypt-decrypt button&content change////////////////
document.querySelector(".dec-text").addEventListener("click",()=>
{
    ButtonBackgroundChange(".dec-text",".enc-text")
    ChangeInputForm(".encryption",".decryption");
    document.querySelector(".arrow").style.transform="rotate(270deg)";
})

document.querySelector(".enc-text").addEventListener("click",()=>
{
    ButtonBackgroundChange(".enc-text",".dec-text")
    ChangeInputForm(".decryption",".encryption");
    document.querySelector(".arrow").style.transform="rotate(90deg)";
})

//////////////////for clearing local storage//////////////////////
document.querySelector(".clear").addEventListener("click",()=>
{
    localStorage.clear();
    displayResult(".enc-result","");
    displayResult(".dec-result","");
})




////////////////////////////////// FUNCTIONS ///////////////////////////////////////////////////////

//function to convert input string to be encrypted to unicode of emoji
function inputToUnicode(input)
{
     //we can also use "array.from" here
    var str=input.split("");
    // console.log(str);

   var buffer='';
   str.forEach(element => {
       buffer+='&#128'+(element.charCodeAt());
   });

   return buffer;
}

// function to display result on pressing enc/dec button
function displayResult(className,resultValue)
{
    var result=document.querySelector(className);
    result.style.display='block';
    result.innerHTML=resultValue;
 
}

//saving input string,password and Emoji(in unicode) to localStorage
var dataArr;
function saveDataToLocalStorage(objToStore)
{
    if(localStorage.getItem('data'))
    {
        dataArr=JSON.parse(localStorage.getItem('data'));
        dataArr.push(objToStore);
    }
    
    else
    {
        dataArr=[objToStore];
    }
 
    localStorage.setItem('data',JSON.stringify(dataArr));
}

//Converting emoji entered for decryption to Unicode form for comparision with storedArray emoji Unicodes
function emojiToCode(decEmoji)
{
   var decEmojiCode="";

   decEmoji=Array.from(decEmoji);
  
   decEmoji.forEach((e)=>
   {
     decEmojiCode+="&#"+(e.codePointAt());
   })
   
   console.log(decEmojiCode);

    return decEmojiCode;
}

// function for validation of input emoji and password for encryption
function validateEmojiAndPassword(storedArray,decEmojiCode,decPass)
{
   var flag=0;

   storedArray.forEach((e)=>
   {
    if(e.emoji==decEmojiCode)
    {
        if(e.pass==decPass)
        {
            displayResult(".dec-result",e.message)
        }
        else  //for checking password correct or not
        {
            displayResult(".dec-result","incorrect password!")
        }

        flag=1;  //for checking input emoji correct(stored) or not
    }
    });

     return flag; //for checking input emoji correct(stored) or not
}

////////////////////////// encrypt-decrypt button&content change functions//////////////////////////

// function for change of encrypt/decrypt toggle buttons background
function ButtonBackgroundChange(clickedButtonClass,ActiveButtonClass)
{
    document.querySelector(clickedButtonClass).style.backgroundColor='#4B5563';
    document.querySelector(ActiveButtonClass).style.backgroundColor='#374151';
}

//function for change of encrypt/decrypt forms on clicking toggle buttons
function ChangeInputForm(currrentFormClass,ChangedFormClass)
{
    document.querySelector(currrentFormClass).style.display="none";
    document.querySelector(ChangedFormClass).style.display="block";
}

/////////////////////////////////////////////////////CODE ENDS HERE/////////////////////////////////

//////////////////////////////check parse and stringify working ///////////////////////
// var arr=[1,2,3,4,'b'];
// console.log(JSON.stringify(arr));
// console.log(arr);
// localStorage.setItem("array",JSON.stringify(arr));
// console.log((localStorage.getItem("array")));
// console.log((JSON.parse(localStorage.getItem("array"))));