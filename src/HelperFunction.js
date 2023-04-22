export function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  export function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + 1 * 60 * 60 * 1000); // ustaw czas na godzinę do przodu 
    const expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }