export function getCookie(name: string) {
  // This check ensures the code inside only runs in the browser
  if (typeof window !== "undefined" && document) {
    const value = ` ; ${document.cookie}`;
    console.log(value,'val');
    const parts = value.split(`; ${name}=`);
  
    if (parts.length===2) {
      return parts.pop()?.split(";").shift();
    }
  }
  return null;
}
