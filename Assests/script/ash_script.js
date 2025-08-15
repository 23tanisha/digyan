async function RegisterUser() {
    add_lead_to_mail("001");
}

async function RegisterWDCUser() {
    add_lead_to_mail("002");
}
async function RegisterDMUser() {
    add_lead_to_mail("003");
}

async function add_lead_to_mail(type) {
    
    var button = document.getElementById('frmButton');
    button.disabled = true;

    setTimeout(function() {
        button.disabled = false;
    }, 5000);
    

    var full_name = document.getElementById("full_name").value;
    var User_Email = document.getElementById("User_Email").value;
    var User_Phone = document.getElementById("User_Phone").value;

    var Shop_Size = '';
    var Shop_Location = '';

    if (document.getElementById("Shop_Size")) {
        Shop_Size = document.getElementById("Shop_Size").value;
    } else {
        Shop_Size = '';
    }

    if (full_name == "" || User_Email == "" || User_Phone == "") {
        alert("Please Fill The Form");
    } else {

        const formData = new FormData();
        formData.append("Type", type);
        formData.append("full_name", full_name);
        formData.append("User_Email", User_Email);
        formData.append("User_Phone", User_Phone);
        formData.append("Shop_Size", Shop_Size);
        formData.append("Shop_Location", Shop_Location);

        var location_url = '';
        var interested_in = '';

        if (type == "001") {
            interested_in = 'MY Galla';
            location_url = 'https://www.kalamacademy.org/thank-for-signup-for-free-demo-of-grocery-business/';
        }
        if (type == "002") {
            mailerLite(full_name, User_Email, 1);
            interested_in = 'WDC';
            // location_url = 'https://www.kalamacademy.org/thank-you-for-signup-for-php-course/';
            location_url = `https://kalamacademy.org/web-development-course-in-ranchi/Thankyou.html?name=${full_name}&mobile=${User_Phone}&email=${User_Email}`;
        }
        if (type == "003") {
            mailerLite(full_name, User_Email, 2);
            interested_in = 'DM Course';
            // location_url = 'https://www.kalamacademy.org/thank-you-for-signingup/';
            location_url = `https://kalamacademy.org/digital-marketing-course-in-ranchi/Thankyou.html?name=${full_name}&mobile=${User_Phone}&email=${User_Email}`;
        }

        let req = await fetch("https://kalamacademy.org/learn/leadcaptureapi.php", {
            method: "POST",
            body: formData,
        });

        let data = await req.json();
        console.log("data1:", data);

        data = await add_lead_to_db(full_name, User_Email, User_Phone, Shop_Size, interested_in);
        console.log("data2:", data);

        if (data > 0) {
            location.href = location_url;
        } else {
            alert(data);
        }

    }
}


async function mailerLite(full_name, User_Email, Type) {

    const formData1 = new FormData();
    formData1.append("type", Type);
    formData1.append("name", full_name);
    formData1.append("email", User_Email);

    let req = await fetch("https://teamka.in/crm1/APIs/mail/ash.php", {
        method: "POST",
        body: formData1,
    });
    let data = await req.json();
    console.log("MLdata4",data);
    return data;

}





async function add_lead_to_db(full_name, User_Email, User_Phone, Shop_Size, interested_in) {

    const formData1 = new FormData();
    formData1.append("Type", "003A");
    formData1.append("name", full_name);
    formData1.append("email", User_Email);
    formData1.append("mobile", User_Phone);
    formData1.append("alternate_mobile", 0);
    formData1.append("whatsapp", 0);

    formData1.append("interested_in", interested_in);
    formData1.append("source", "website");
    formData1.append("status", "Unassigned");
    formData1.append("caller", '');
    formData1.append("caller_id", '');
    formData1.append("state", '');
    formData1.append("city", '');

    formData1.append("Shop_Size", Shop_Size);

    let req = await fetch("https://teamka.in/crm1/APIs/ash.php", {
        method: "POST",
        body: formData1,
    });
    let data = await req.json();
    console.log("data3",data);
    return data;

}

async function RegisterBusinessUser() {
   
   var button = document.getElementById('frmButton');
    button.disabled = true;

    setTimeout(function() {
        button.disabled = false;
    }, 5000);
    

    var full_name = document.getElementById("full_name").value;
    var User_Email = document.getElementById("User_Email").value;
    var User_Phone = document.getElementById("User_Phone").value;

    var budget = document.getElementById("budget").value;
    var service = document.getElementById("service").value;
    var team_size = document.getElementById("team_size").value;



    if (full_name == "" || User_Email == "" || User_Phone == "") {
        alert("Please Fill The Form");
    } else {

        const formData = new FormData();
        formData.append("Type", '005');
        formData.append("full_name", full_name);
        formData.append("User_Email", User_Email);
        formData.append("User_Phone", User_Phone);
        
        formData.append("budget", budget);
        formData.append("team_size", team_size);
        formData.append("service", service);

        

        let req = await fetch("https://kalamacademy.org/learn/leadcaptureapi.php", {
            method: "POST",
            body: formData,
        });

        let data = await req.json();
        console.log("data1:", data);

        if (data > 0) {
            location.href = 'https://www.kalamacademy.org/thank-you-project-inquiry/';
        } else {
            alert(data);
        }

    }
    
}





















// document.addEventListener("DOMContentLoaded", function () {
//     const inputs = document.querySelectorAll(".inp_wrap_num input");

//     inputs.forEach((input, index) => {
//         input.addEventListener("input", (e) => {
//             let currentInput = e.target;
//             let nextInput = inputs[index + 1];

//             // Allow only one digit & remove non-numeric characters
//             currentInput.value = currentInput.value.replace(/[^0-9]/g, '').slice(0, 1);

//             // Move to the next input if a number is entered
//             if (currentInput.value && nextInput) {
//                 nextInput.focus();
//             }
//         });

//         input.addEventListener("keydown", (e) => {
//             let prevInput = inputs[index - 1];

//             // Move to the previous input when Backspace is pressed on empty field
//             if (e.key === "Backspace" && !input.value && prevInput) {
//                 prevInput.focus();
//             }
//         });

//         input.addEventListener("paste", (e) => {
//             e.preventDefault(); 
//         });
//     });
// });

// function otpChecker(e) {
//     var otp = 1234;
//     const inp = document.querySelectorAll(".inp_wrap_num input");
    
//     var input_otp = Array.from(inp).map(input => input.value).join(""); 

//   if(input_otp == otp){
//       alert("OTP Matched. You are registered successfully.");
//       add_lead_to_mail("003" , "verified");
//       location.href="Thankyou.html";
       
//   }
//   else if(input_otp.length < 4){
//     //  alert("Please enter a valid OTP.");
//     document.getElementById("err").innerHTML = "Please enter a valid OTP.";
//     setTimeout(() => {
//       document.getElementById("err").innerHTML = "";
//     }, 1500);
//   }
//   else{
//     document.getElementById("err").innerHTML = "Wrong OTP try again ";
//     setTimeout(() => {
//       document.getElementById("err").innerHTML = "";
//     }, 1500);
    
//   }


// }


// function RegisterDMUser() {
//   const openModalBtn = document.querySelector('.open-modal-btn');
//   const closeModalBtn = document.querySelector('.close-btn');
//   const modalOverlay = document.querySelector('.modal-overlay'); 
//   const timerDiv = document.querySelector('#timer'); 
//   const resendOtp = document.querySelector('#resendOtp'); 
//   const timeSend = document.querySelector('#timeSend'); 
//   let countdown; 

//   function startTimer(duration) {
//     let timeLeft = duration;
//     timerDiv.textContent = `0: ${timeLeft}`;

//     countdown = setInterval(() => {
//       timeLeft--;
//       timerDiv.textContent = `0: ${timeLeft}`;

//       if (timeLeft <= 0) {
//         clearInterval(countdown);
//         resendOtp.textContent = "Resend OTP";
//         timeSend.textContent = "";
//       }
//     }, 1000);
//   }

//   // Open Modal
//   openModalBtn.addEventListener('click', () => {
//     modalOverlay.classList.add('active');
//     startTimer(60); 
    
//   });

//   // Close Modal
//   closeModalBtn.addEventListener('click', () => {
//     add_lead_to_mail("003" , "not verified");
//     modalOverlay.classList.remove('active');
//     clearInterval(countdown); 
//     timerDiv.textContent = ""; 
   
   
//   });
// }









