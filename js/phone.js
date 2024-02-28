const loadPhone = async (searchText="13", isShowAll) =>{
    const res =await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones= data.data;
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) =>{
    //1. call phone container
    const phoneContainer = document.getElementById('phone-container');

    //clear phone container cards before adding new cards
    phoneContainer.textContent='';

    //display show all button if there is more than 12 phones
    const showAllContainer = document.getElementById("show-all-container");
    if(phones.length >12 && !isShowAll){
        showAllContainer.classList.remove("hidden");
    }
    else{
        showAllContainer.classList.add("hidden");
    }



    //display first 12 phones if isShowAll not clicked
    if(!isShowAll){
        phones = phones.slice(0,12);
    }
    

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
                        <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
                      </div>
                    </div>`;
        //4.append child to the container
        phoneContainer.appendChild(phoneCard);
    });
    //hide loading spinner
    toogleLoadingSpinner(false);
}

//load single phone data
const handleShowDetail =async (id) =>{
    //load individual phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data =await res.json();
    const phone = data.data;
    showPhoneDetails(phone);

}

//
const showPhoneDetails = (phone) =>{
    console.log(phone);
    
    const showDetailContainer = document.getElementById("show-detail-container");
    showDetailContainer.innerHTML=`
    <figure class="px-10 pt-10 bg-[#0D6EFD0D] text-center">
    <img src="${phone.image}" alt="phone" class="rounded-xl mx-auto pb-[50px]" />
    </figure> 
    <h2 class="font-bold text-lg">${phone.name}</h2>
    <p class="text-base">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
    <p class="font-bold text-base">Storage :<span class="font-medium text-base">${phone.mainFeatures.storage}</span></p>
    <p class="font-bold text-base">Display Size : <span class="font-medium text-base">${phone.mainFeatures.displaySize}</span></p>
    <p class="font-bold text-base">Chipset : <span class="font-medium text-base">${phone.mainFeatures.chipSet}</span></p>
    <p class="font-bold text-base">Memory :<span class="font-medium text-base">${phone.mainFeatures.memory}</span></p>
    <p class="font-bold text-base">Slug :<span class="font-medium text-base">${phone.slug}</span></p>
    <p class="font-bold text-base">Release data :<span class="font-medium text-base">${phone?.releaseDate}</span></p>
    <p class="font-bold text-base">Brand :<span class="font-medium text-base">${phone.brand}</span></p>
    <p class="font-bold text-base">GPS :<span class="font-medium text-base">${phone?.others?.GPS}</span></p>`
    show_details_modal.showModal();
}



//button handler

const handleSearch = (isShowAll) =>{
    toogleLoadingSpinner(true);
   // console.log("button added");
   const searchText = document.getElementById("search-field").value;
   loadPhone(searchText, isShowAll);
}

const toogleLoadingSpinner= (isLoading) =>{
    const loadingSpinner = document.getElementById("spinner");
    if(isLoading){
        loadingSpinner.classList.remove("hidden");
    }
    else{
        loadingSpinner.classList.add("hidden");
    }
}

//handle show all

const handleShowAll = () =>{
    handleSearch(true);
}

loadPhone();