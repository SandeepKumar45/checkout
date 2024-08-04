const data = document.getElementById("pincode")
const statusContainer = document.getElementById("status")
const statusContent = document.querySelector(".details")
const form = document.querySelector("#form")
const closeButton = document.querySelector(".close-icon")

form.addEventListener('submit', (e) => {
    e.preventDefault()
    statusContent.innerHTML = ''
    fetch(`https://api.postalpincode.in/pincode/${data.value}`)
        .then((data) => data.json())
        .then((data) => {
            if (data[0].Status === "Success") {
                console.log("succes");
                data[0].PostOffice.map((val) => (
                    statusContent.innerHTML += `<div>
            <span>${val.Name} -</span>
            <span> ${val.DeliveryStatus}</span>
            </div>`,
                    statusContainer.style.display = 'block'
                ))
            } else {
                statusContent.innerHTML = `<div class="norecord">${data[0].Message}</div>`
                statusContainer.style.display = 'block'
            }
        })
        .catch((error) => console.log(error))
})

closeButton.addEventListener('click', () => {
    statusContainer.style.display = 'none'
    form.reset()
})