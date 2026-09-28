
window.onload = function() {

  console.log("hi27");
  if (window.location.href.includes("adminLogin.html")) {
    console.log("jfnbjke"+localStorage.getItem('admin'));
    if(localStorage.getItem('admin')!="true"){
      window.location.href = "login.html";
    }
}
};

export const showWindow = async function(){
  const form = document.getElementById('studentLoginForm');

  const currentDisplay = window.getComputedStyle(form).display;
  if (currentDisplay === 'none' || form.style.display === '') {
      form.style.display = 'block'; 
  } else {
      form.style.display = 'none';
  }
};

export const showWindow2 = async function(){
  const form = document.getElementById('adminLoginForm');

  const currentDisplay = window.getComputedStyle(form).display;
  if (currentDisplay === 'none' || form.style.display === '') {
      form.style.display = 'block'; 
  } else {
      form.style.display = 'none';
  }
};