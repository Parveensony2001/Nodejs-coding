console.log('js is appliee in tha function');

// function displaySelectedOption() {
//     let categoryprint = document.getElementById("category-manu").value;
//     document.getElementById("Description-category").value = categoryprint;
// }
function displaySelectedOption() {
    var selectedOption = document.getElementById("mySelect").value;
    if(selectedOption=="Option"){
        selectedOption="";
    }
    document.getElementById("displayBar").value = selectedOption; 
  }
function checkedOrNot(){
    const deleteButton = document.getElementById('delete');

deleteButton.addEventListener('click', () => {
  const itemList = document.getElementById('itemList');
  const checkboxes = itemList.querySelectorAll('input[type="checkbox"]');

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const listItem = checkbox.parentNode;
      itemList.removeChild(listItem);
    }
  });
});
}