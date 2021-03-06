// [x]- On page load, render a list of already registered dogs in the table. You can fetch these dogs from http://localhost:3000/dogs.
// [x]- The dog should be put on the table as a table row. The HTML might look something like this `<tr><td>Dog *Name*</td> <td>*Dog Breed*</td> <td>*Dog Sex*</td> <td><button>Edit</button></td></tr>`
// [x]- Make a dog editable. Clicking on the edit button next to a dog should populate the top form with that dog's current information.
// -[x] On submit of the form, a PATCH request should be made to http://localhost:3000/dogs/:id to update the dog information (including name, breed and sex attributes).
// - Once the form is submitted, the table should reflect the updated dog information. There are many ways to do this. You could search for the table fields you need to edit and update each of them in turn, but we suggest making a new get request for all dogs and rerendering all of them in the table. Make sure this GET happens after the PATCH so you can get the most up-to-date dog information.

document.addEventListener('DOMContentLoaded', () => {
    const dogUrl = "http://localhost:3000/dogs"
    const dogBody = document.getElementById("table-body")
    const dogForm = document.querySelector("#dog-form")

    fetch(dogUrl)
    .then(response => response.json())
    .then((data) => {renderDogs(data)})

    function renderDogs(dogData) {
        dogBody.innerHTML = ""
        dogData.forEach(dog => {
            let dogRow = document.createElement('tr')
            let dogName = document.createElement('td')
            dogName.textContent = `${dog.name}`
            let dogSex = document.createElement('td')
            dogSex.textContent = `${dog.sex}`
            let dogBreed = document.createElement('td')
            dogBreed.textContent = `${dog.breed}`
            let dogEdit = document.createElement('td')
            dogEdit.textContent = `Edit`
            dogEdit.id = 'edit-'+`${dog.id}`

            dogBody.appendChild(dogRow)
            dogRow.appendChild(dogName)
            dogRow.appendChild(dogSex)
            dogRow.appendChild(dogBreed)
            dogRow.appendChild(dogEdit)
        })
        document.addEventListener('click', function(event){
            dogData.forEach((dog)=>{
                if (event.target.id === `edit-${dog.id}`){
                    dogForm.name.value = dog.name 
                    dogForm.sex.value = dog.sex 
                    dogForm.breed.value = dog.breed


                    dogForm.addEventListener('submit', function(event){

                        // debugger;
                        event.preventDefault()
                        
                        updateDogData = {
                            id: dog.id,
                            name: dogForm.name.value,
                            sex: dog.sex, 
                            breed: dog.breed
                        }

                        fetch(dogUrl+`/${dog.id}`,{
                            method: "PATCH",
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            },
                            body: JSON.stringify(updateDogData)
                        })

                        fetch(dogUrl)
                        .then(response => response.json())
                        .then(data => {renderDogs(data)})

                    })
                }
            })

        })
        // console.dir(dogBody)
    }
})