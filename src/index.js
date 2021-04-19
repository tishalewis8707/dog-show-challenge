document.addEventListener('DOMContentLoaded', () => {
    showDogsList();
})


const getDogs = () => {
    const url = "http://localhost:3000/dogs";
    // Fetch for all dogs list.
    return fetch(url , {
                method: "GET"
            }) 
            .then(res => res.json())
}

const getDog = (id) => {
    const url = `http://localhost:3000/dogs/${id}`;
    // Fetch a dog for id.
    return fetch(url , {
                method: "GET"
            }) 
            .then(res => res.json())
}

const editDog = (data) => {
    const url = `http://localhost:3000/dogs/${data.id}`;
    delete data.id;
    const options = {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
            "accept": "application/json"
        },
        body: JSON.stringify(data)
    }
    return fetch(url, options)
        .then(res => res.json())
}

function clearTable() {
    const table = document.getElementById('table-body');
    table.innerHTML = '';
}

function showDogsList() {
    clearTable();
    getDogs().then(showDogs);
}

function showDogs(dogssArray) {
    const dogsTable = document.getElementById("table-body");
    dogssArray.forEach(dogObj => {
        const dogTr = createDogsTable(dogObj);
        dogsTable.appendChild(dogTr);
    });
}

function createDogsTable(dogsObj) {
    dogTr = document.createElement("tr"),
    dogName  = document.createElement("td"),
    dogBreed  = document.createElement("td"),
    dogSex  = document.createElement("td"),
    edit =  document.createElement("td"),
    dogBttn = document.createElement("button");
        dogBttn.innerText = 'Edit Dog';
        dogBttn.dataset.id = dogsObj.id;
        dogBttn.addEventListener('click', handleClick);
        edit.append(dogBttn);

    dogTr.id = dogsObj.id;
    dogName.textContent = dogsObj.name;
    dogBreed.textContent = dogsObj.breed;
    dogSex.textContent = dogsObj.sex;

    dogTr.append(dogName,dogBreed,dogSex,edit);

    return dogTr;
}

function handleClick(e) {
    const id = e.target.dataset.id;
    getDog(id).then(populateForm);
}

function populateForm(dog) {
    const form = document.querySelector('#dog-form');
    form.dataset.id = dog.id;
    form.name.value = dog.name;
    form.breed.value = dog.breed;
    form.sex.value = dog.sex;
}

const myForm = document.getElementById("dog-form");
myForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = {
        id: e.target.dataset.id,
        name: e.target.name.value,
        breed: e.target.breed.value,
        sex: e.target.sex.value
    }
    editDog(data).then(showDogsList);
    e.target.reset();
    e.target.dataset.id = "";
});