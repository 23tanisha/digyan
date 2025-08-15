// var otp = 1234;
var otp = Math.floor(1000 + Math.random() * 9000);

const resendOtp = document.querySelector('#resendOtp');
const timeSend = document.querySelector('#timeSend');
const timerDiv = document.querySelector('#timer');
const openModalBtn = document.querySelector('.open-modal-btn'); // No need for manual click
const closeModalBtn = document.querySelector('.close-btn');
const modalOverlay = document.querySelector('.modal-overlay');

let countdown;

function startTimer(duration) {
    let timeLeft = duration;
    timerDiv.textContent = `Resend in 0:${timeLeft}`;

    resendOtp.style.display = "none";

    countdown = setInterval(() => {
        timeLeft--;
        timerDiv.textContent = `Resend in 0:${timeLeft}`;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            resendOtp.textContent = "Resend OTP";
            resendOtp.style.display = "block";
            timerDiv.textContent = "";
        }
    }, 1000);
}

closeModalBtn.addEventListener('click', () => {
    // console.log("OTP not verified");
    modalOverlay.classList.remove('active');
    clearInterval(countdown);
    timerDiv.textContent = "";
});

async function RegisterDMUser() {

    var button = document.getElementById('frmButton');
    button.disabled = true;

    setTimeout(() => {
        button.disabled = false;
    }, 5000);

    var full_name = document.getElementById("full_name").value.trim();
    var User_Email = document.getElementById("User_Email").value.trim();
    var User_Phone = document.getElementById("User_Phone").value.trim();

    if (full_name === "" || User_Email === "" || User_Phone === "") {
        alert("Please fill out the form.");
        return;
    }
    
    add_lead_to_mail( '' ) ;

    try {
        let response = await fetch("https://services.mygalla.com/sms/index.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                "mno": User_Phone,
                "otp": otp
            })
        });

        let result = await response.json();
        console.log(result);

        // Open modal only if data is filled and API call is successful
        modalOverlay.classList.add('active');
        startTimer(60);
    } catch (error) {
        console.error("Error sending OTP:", error);
    }
}



async function add_lead_to_mail( otp_status ) {
    
    console.log("mail added , lead added") ;

    var type = "003" ;

    var full_name = document.getElementById("full_name").value.trim();
    var User_Email = document.getElementById("User_Email").value.trim();
    var User_Phone = document.getElementById("User_Phone").value.trim();

    const formData = new FormData();
    formData.append("Type", type);
    formData.append("full_name", full_name);
    formData.append("User_Email", User_Email);
    formData.append("User_Phone", User_Phone);

    interested_in = 'DM Course';
    // location_url = `https://kalamacademy.org/digital-marketing-course-in-ranchi/Thankyou.html?name=${full_name}&mobile=${User_Phone}&email=${User_Email}`;

    mailerLite(full_name, User_Email, 2);

    let req = await fetch("https://kalamacademy.org/learn/leadcaptureapi.php", {
        method: "POST",
        body: formData,
    });

    let data = await req.json();


    data = await add_lead_to_db(full_name, User_Email, User_Phone, interested_in, otp_status);

    // if (data > 0) {

    //     console.log(data);
    //     location.href = location_url;
    // } else {
    //     alert(data);
    // }

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
    console.log("MLdata4", data);
    return data;

}





async function add_lead_to_db(full_name, User_Email, User_Phone, interested_in, otp_status) {

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

    formData1.append("Shop_Size", "");

    formData1.append("otp_status", otp_status);

    let req = await fetch("https://teamka.in/crm1/APIs/ash.php", {
        method: "POST",
        body: formData1,
    });
    let data = await req.json();

    return data;

}

async function RegisterBusinessUser() {

    var button = document.getElementById('frmButton');
    button.disabled = true;

    setTimeout(function () {
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





document.addEventListener("DOMContentLoaded", function () {
    const inputs = document.querySelectorAll(".inp_wrap_num input");

    inputs.forEach((input, index) => {
        input.addEventListener("input", (e) => {
            let currentInput = e.target;
            let nextInput = inputs[index + 1];

            // Allow only one digit & remove non-numeric characters
            currentInput.value = currentInput.value.replace(/[^0-9]/g, '').slice(0, 1);

            // Move to the next input if a number is entered
            if (currentInput.value && nextInput) {
                nextInput.focus();
            }
        });

        input.addEventListener("keydown", (e) => {
            let prevInput = inputs[index - 1];

            // Move to the previous input when Backspace is pressed on empty field
            if (e.key === "Backspace" && !input.value && prevInput) {
                prevInput.focus();
            }
        });

        input.addEventListener("paste", (e) => {
            e.preventDefault();
        });
    });
});


function otpChecker(e) {

    const inp = document.querySelectorAll(".inp_wrap_num input");

    var input_otp = Array.from(inp).map(input => input.value).join("");

    if (input_otp == otp) {
        update_otp_status();
        // alert("OTP Matched. You are registered successfully.");

    }
    else if (input_otp.length < 4) {
        //  alert("Please enter a valid OTP.");
        document.getElementById("err").innerHTML = "Please enter a valid OTP.";
        setTimeout(() => {
            document.getElementById("err").innerHTML = "";
        }, 1500);
    }
    else {
        document.getElementById("err").innerHTML = "Wrong OTP try again ";
        setTimeout(() => {
            document.getElementById("err").innerHTML = "";
        }, 1500);

    }


}


async function resendOtpFun() {
    
    
    startTimer(60);

    var User_Phone = document.getElementById("User_Phone").value.trim();

    let response = await fetch("https://services.mygalla.com/sms/index.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            "mno": User_Phone,
            "otp": otp
        })
    });

    let result = await response.json();
    console.log(result);

}

async function update_otp_status() {
    
    var User_Phone = document.getElementById("User_Phone").value;
    var full_name = document.getElementById("full_name").value.trim();
    var User_Email = document.getElementById("User_Email").value.trim();
    var otp_status = "OTP verified" ;
    
    const formData1 = new FormData();
    formData1.append("Type", "003E" );
    formData1.append("otp_status", otp_status);
    formData1.append("User_Phone", User_Phone);
    formData1.append("full_name", full_name);
    formData1.append("User_Email", User_Email);

    let req = await fetch("https://teamka.in/crm1/APIs/ash.php" , {
        method: "POST",
        body: formData1,
    });
    let data = await req.json();
    console.log("otp veri", data);
    
    location_url = `https://kalamacademy.org/digital-marketing-course-in-ranchi/Thankyou.html?name=${full_name}&mobile=${User_Phone}&email=${User_Email}`;
    
    if (data > 0) {
        location.href = location_url;
    } else {
        alert(data);
    }
    
    
}



