const convertButton = document.querySelector(".convert-button")

function convertValues(){
   const inputCurrencyValue = document.querySelector(".input-currency").value
    
   const dolarToday = 5.50

   const convertedValue = inputCurrencyValue / dolarToday

    console.log(convertedValue)
}
convertButton.addEventListener("click", convertValues)

