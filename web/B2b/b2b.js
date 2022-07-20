searchIcon = document.querySelector(".search-icon");
searchInput = document.querySelector(".search-input");
searchClose = document.querySelector(".search-close");
mainContent = document.querySelector(".main-body");
searchResult = document.querySelector(".search-result");

searchInput.addEventListener("click", function () {
    searchClose.classList.remove("hidden");
    searchIcon.classList.add("hidden");
    mainContent.classList.add("hidden");
    searchResult.classList.add("show");

});

searchClose.addEventListener("click", function () {
    searchClose.classList.add("hidden");
    searchIcon.classList.remove("hidden");
    mainContent.classList.remove("hidden");
    searchResult.classList.remove("show");
    searchInput.value = "";
});

const searchBar = document.getElementById('searchBar');
const accountsList = document.getElementById('accountsList');
let accountAttributes = [];

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();

    const filteredAccounts = accountAttributes.filter((account) => {
        return (
            account.company.toLowerCase().includes(searchString)
        );
    });
    displayCharacters(filteredAccounts);
});


const loadAccounts = async () => {
    try {
        const res = await fetch('https://tva.staging.b2brain.com/search/autocomplete_org_all/');
        accountAttributes = await res.json();
        displayCharacters(accountAttributes);

    } catch (err) {
        console.error(err);
    }
};

const displayCharacters = (accounts) => {
    const htmlString = accounts
        .map((account) => {
            const fullName = account.company;
            const initials = fullName.toUpperCase().slice(0, 1);
            const logo = account.logo ? `<img src="${account.logo}">` : initials;
            return `
            <li class="account">
            <div class="accountLogo" style="background-color:${account.color};"> ${logo}  </div>
            <div class="accountDetails">
            <div>
            <p class="name">${account.company}</p>
            <p class="website">${account.website}</p>
            </div>
            </div>
            <button type="button" class="accountBtn" id="trackbtn"><img class="track-icon hidden" src="resources/spinner.png">Track</button>
            </li>`;

        })
        .join('');
    accountsList.innerHTML = htmlString;
    const searchbar = document.getElementById('searchBar');

    const Accountbtn = document.querySelectorAll(".accountBtn");
    const trackIcon = document.querySelectorAll(".track-icon");
    for (let i = 0; i < Accountbtn.length; i++) {
        Accountbtn[i].addEventListener('click', () => {
            Accountbtn[i].innerText = "Tracking";
            Accountbtn[i].style.color = '#1AAB2B';
            Accountbtn[i].style.borderColor = '#1AAB2B';
            console.log(accounts[i].company);
            console.log(accounts[i].slug);
            var timestamp = new Date().getTime();
            console.log(timestamp);
        });
    }
    for (let i = 0; i < Accountbtn.length; i++) {
        Accountbtn[i].addEventListener('mouseup', () => {
            Accountbtn[i].innerHTML = `<img class="track-icon " src="resources/spinner.png">Track`;
            Accountbtn[i].style.color = '#FF6059';
            Accountbtn[i].style.borderColor = '#FF6059';
        });
    }
    for (let i = 0; i < Accountbtn.length; i++) {
        Accountbtn[i].addEventListener('mouseover', () => {
            Accountbtn[i].innerHTML = `<img class="track-icon " src="resources/spinner.png">Track`;
            Accountbtn[i].style.color = '#FF6059';
            Accountbtn[i].style.borderColor = '#FF6059';
        });
    }


};

loadAccounts();
