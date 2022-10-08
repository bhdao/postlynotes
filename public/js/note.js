console.log('HELP ME');
document.querySelector(".cke_editable.cke_editable_themed>p").addEventListener('onChange', (e) => {
  e.console.log(e.innerText)
})
