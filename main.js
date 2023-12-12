//DOM Elements for personal information
const firstname = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const idNum = document.getElementById('idNum');
const emailId = document.getElementById('emailId');
const phoneNumber = document.getElementById('phoneNumber');
const promoCode = document.getElementById('promoCode');

// DOM Elements for room bookings
const inDate = Date(document.getElementById('inDate'));
const outDate = Date(document.getElementById('outDate'));
const kidsAbove = document.getElementById('noKidAb');
const kidsBelow = document.getElementById('noKidBe');
const noAdults = document.getElementById('noAdults');
const noofSingelrooms = document.getElementById('noSingel');
const noofDoublerooms = document.getElementById('noDouble');
const noofThriplerooms = document.getElementById('noThriple');
const extraBeds = document.getElementById('extraBeds');
const pool = document.getElementById('pool');
const garden = document.getElementById('garden');

// DOM Elements for adventures booking
const noofKids = document.getElementById('noKid');
const noKidfor = document.getElementById('noKidfor');
const noofAdult = document.getElementById('noAdult');
const noAdultfor = document.getElementById('noAdultfor');
const surfing = document.getElementById('surfing');
const scubadiving = document.getElementById('scubadiving');
const turtel = document.getElementById('turtel');
const noGuide = document.getElementById('noGuide');
const kids = document.getElementById('kids');
const adult = document.getElementById('adult');
const both = document.getElementById('both');
const advType = document.getElementById("advType");
const guide = document.getElementById("guide");
const hour = document.getElementById("hour");

//btns
const bookAdventuresbtn = document.getElementById('bookAdventures');
const addFavouritesroombtn = document.getElementById('addFavouritesroom');
const addFavouritesadvbtn = document.getElementById('addFavouritesadv');
const bookNowbtn = document.getElementById('bookRooms');
const checkloyalbtn = document.getElementById('checkloyal');
const totalBillbtn = document.getElementById('totalBill');

//outputs
const currentBookings = document.getElementById('outputRoomcurrent');
const loyaltyPoints = document.getElementById('outputRoomloyal');
const overallBookings = document.getElementById('outputRoomover');
const outputAdvbooking = document.getElementById('outputAdvbooking');
const overallAdv = document.getElementById("overallAdv");
const outputTotalbooking = document.getElementById('outputTotalbooking');


//Event listeners
bookNowbtn.addEventListener("click",roomBooking);
checkloyalbtn.addEventListener("click",checkLoyaltypoints);
bookAdventuresbtn.addEventListener("click",adventureBooking);
totalBillbtn.addEventListener("click",totalBillinfo);
addFavouritesroombtn.addEventListener("click",addtoFavouritesroom);
addFavouritesadvbtn.addEventListener("click",addtoFavouritesadv);


//Functions
// Room Booking function
totalroom = 0;
function roomBooking(){
    let kids = parseInt(noKidAb.value);
    let exbed = parseInt(extraBeds.value);
    let singel = parseInt(noSingel.value);
    let double = parseInt(noDouble.value);
    let thriple = parseInt(noThriple.value);

    //date
    var inDate = new Date(document.getElementById('inDate').value);
    var outDate = new Date(document.getElementById('outDate').value);

     if (outDate<=inDate) {

         alert("Check out date must be greater than the check in date.");
         return;
     }
    const timeDiff = outDate - inDate;
    const duration = timeDiff / (1000*60*60*24);

    totalroom = (singel*25000+double*35000+thriple*40000+kids*5000+exbed*8000)*duration;

    
    //Current bookings display
    currentBookings.innerText = `Your total cost is LKR ${totalroom}.00 \n
    You Booked ${singel} Singel Rooms ${double} Double Rooms and ${thriple} Thriple Rooms \n 
    Your duraion is ${duration} days`;

    overallBook(totalroom,singel,double,thriple,duration);
    totalBillinfo(totalroom);

}

// Checking loyalty points function
function checkLoyaltypoints(){
    let singel = parseInt(noSingel.value);
    let double = parseInt(noDouble.value);
    let thriple = parseInt(noThriple.value);
    loyalPoints =0;

    totalrooms = singel+double+thriple;

    if (totalrooms>3){
        loyalPoints = totalrooms*20
    }
    // Loyalty poinys display
    loyaltyPoints.innerText = `You have ${loyalPoints} loyalty points`;

    noKidAb.value = "";
    noKidBe.value = "";
    noAdults.value = "";
    extraBeds.value = "";
    noSingel.value = "";
    noDouble.value = "";
    noThriple.value = "";


    let favObj ={
        "1. Loyal Points" : (loyalPoints),
        
    };

    let favObj_serialized = JSON.stringify(favObj);

    localStorage.setItem("favObj", favObj_serialized);

    let favObj_deserialized = JSON.parse(localStorage.getItem("favObj"));

    console.log(favObj_deserialized);

}

// Overall Room booking output
function overallBook(totalroom,singel,double,thriple,duration){

    // Display
    overallBookings.innerText += `Your total cost is LKR ${totalroom}.00 \n
    You Booked ${singel} Singel Rooms ${double} Double Rooms and ${thriple} Thriple Rooms \n 
    Your duraion is ${duration} days \n \n `;
}



// Book adventures function
function adventureBooking(){
    let lKids = parseInt(noKid.value);
    let fKids = parseInt(noKidfor.value);
    let lAdults = parseInt(noAdult.value);
    let fAdults = parseInt(noAdultfor.value);

    let advtype = (advType.value);

    let guides = (guide.value);

    let hours = parseInt(hour.value);

    let guideBill = 0;

    // Guides
    if (guides=="No Guide") {
        guideBill = 0;
    }

    if (guides=="For-Kids") {
        guideBill = 500;
    }

    if (guides=="For-Adults") {
        guideBill = 1000;
    }

    if (guides=="For-Adults & Kids") {
        guideBill = 1500;
    }

    totalAdven = 0;

    totalAdven = (lKids*2000 + fKids*5000 + lAdults*5000 + fAdults*1000 + guideBill)*hours;
    
    outputAdvbooking.innerText = `Adventure Type : ${advtype} \n
     Your total cost is LKR ${totalAdven} (${hours}hrs) \n 
     Guide : ${guides} \n `;
    
    alert(`Thank you for selecting Hotel Oasis \n 
    ${lKids} Local Kids, ${fKids} Foreign Kids, ${lAdults} Local Adults, ${fAdults} Foreign Adults \n
    Type of Adventure : ${advtype} \n
    Guides : ${guides} \n
    Total Adventure cost (LKR) : ${totalAdven}`);
    


    overallAdven (guides, totalAdven,hours,advtype);
    totalBillinfo(totalAdven);

    
}

function overallAdven (guides, totalAdven,hours,advtype) {

    overallAdv.innerText += `Adventure Type : ${advtype} \n
    Your total cost is LKR ${totalAdven} (${hours}hrs) \n 
    Guide : ${guides} \n\n\n `;

}


// Calculate the total bill
function totalBillinfo(){
    let first = (firstname.value);
    let last = (lastName.value);
    let pnum = parseInt(phoneNumber.value);
    let promo = (promoCode.value);

    //Display
    // outputTotalbooking.innerText = 
    // `Mr/Mrs : ${first} ${last} 
    // phone number : ${pnum} \n
    // Your total cost on Rooms (LKR) ${totalroom}.00 
    // Your total cost on Adventures (LKR) ${totalAdven}.00 \n
    // Your total Cost (LKR) ${totalBill}.00 `;

    totalBill = 0;
    discount = 0;
    
    totalBill = totalroom + totalAdven;
    //Promo code discount
    if (promo === 'Promo123'){
        discount = totalBill-(totalBill*0.05);
        outputTotalbooking.innerText = `Mr/Mrs : ${first} ${last} 
        phone number : ${pnum} \n
        Your total cost on Rooms (LKR) ${totalroom}.00 
        Your total cost on Adventures (LKR) ${totalAdven}.00 
        Your total Cost (LKR) ${totalBill}.00
        Your total cost with Discount LKR ${discount}.00`;
    }
    else{
        outputTotalbooking.innerText =`Mr/Mrs : ${first} ${last} 
        phone number : ${pnum} \n
        Your total cost on Rooms (LKR) ${totalroom}.00 
        Your total cost on Adventures (LKR) ${totalAdven}.00 
        Your total Cost (LKR) ${totalBill}.00
        You will not get a Discount`
    }

    

}

//Rooms Local Storage
function addtoFavouritesroom(){
    let favObj ={
        "1. First Name" : (firstname.value),
        "2. Last Name" : (lastName.value),
        "3. Id Number" : (idNum.value),
        "4. E-mail" : (emailId.value),
        "5. Phone Number" : (phoneNumber.value),
        "6. Check-In Date" : new Date(inDate.value),
        "7. Check-Out Date" : new Date(outDate.value),
        "8. Infants" : parseInt(kidsBelow.value),
        "9. Children" : parseInt(kidsAbove.value),
        "10. Adults" : parseInt(noAdults.value),
        "11. Singel Rooms" : parseInt(noofSingelrooms.value),
        "12. Double Rooms" : parseInt(noofDoublerooms.value),
        "13. Thriple Rooms" : parseInt(noofThriplerooms.value),
        "14. Exctra Bedrooms" : parseInt(extraBeds.value),
        "15. Total Cost" : (totalroom)

    };

    let favObj_serialized = JSON.stringify(favObj);

    localStorage.setItem("favObj", favObj_serialized);

    let favObj_deserialized = JSON.parse(localStorage.getItem("favObj"));

    console.log(favObj_deserialized);

}
// Adventures Local Storage
function addtoFavouritesadv(){
    let favObj ={
        "1. First Name" : (firstname.value),
        "2. Local Children" : (noofKids.value),
        "3. Foreign Children" : (noKidfor.value),
        "4. Adventure Type" : (advType.value),
        "5. Hours" : (hour.value),
        "6. Guides" : (guide.value),
        "7. Adventures Cost" : (totalAdven)
        

    };

    let favObj_serialized = JSON.stringify(favObj);

    localStorage.setItem("favObj", favObj_serialized);

    let favObj_deserialized = JSON.parse(localStorage.getItem("favObj"));

    console.log(favObj_deserialized);
}


