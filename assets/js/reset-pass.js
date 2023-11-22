const showPassCheckboxes = document.querySelectorAll(`.show-pass-checkbox`);
const passInputs = document.querySelectorAll(`.pass-input`);

showPassCheckboxes.forEach(btn => {
  let show = btn.getAttribute(`show-pass-of`)
  let inputsOfSameType =  document.querySelectorAll(`.${show}`)
  btn.addEventListener(`change`, _ => {
    inputsOfSameType.forEach(i => {
      i.type = btn.checked ? 'text' : 'password'
    })
  })
})