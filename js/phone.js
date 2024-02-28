const loadPhone = async (searchText) =>{
    const res =await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones= data.data;
    console.log(phones);
    displayPhones(phones);
}

const displayPhones = phones =>{
    //1. call phone container
    const phoneContainer = document.getElementById('phone-container');

    //clear phone container cards before adding new cards
    phoneContainer.textContent='';

    //display show all button if there is more than 12 phones
    const showAllContainer = document.getElementById("show-all-container");
    if(phones.length >12){
        showAllContainer.classList.remove("hidden");
    }
    else{
        showAllContainer.classList.add("hidden");
    }

    //display first 12 phones
    phones = phones.slice(0,12);

    phones.forEach(phone => {
        //2.create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList=`card bg-base-100 shadow-xl`;
        //3. set innerHTML to the div
        phoneCard.innerHTML=`
        <figure class="px-10 pt-10">
                      <img src="${phone.image}" alt="phone" class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                      <h2 class="card-title">${phone.phone_name}</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                      <div class="card-actions">
                        <button class="btn btn-primary">Buy Now</button>
                      </div>
                    </div>`;
        //4.append child to the container
        phoneContainer.appendChild(phoneCard);
    });
}

//button handler

const handleSearch = () =>{
   // console.log("button added");
   const searchText = document.getElementById("search-field").value;
   loadPhone(searchText);
}

//loadPhone();