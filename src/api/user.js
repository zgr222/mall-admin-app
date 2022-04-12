
import axios from "./axios";

export async function Login(username, password) {
  try {
    const resp = await axios.post('/passport/login', {
      email: username,
      password
    });
    console.log(resp);
    localStorage.setItem('user', JSON.stringify(resp))
    return resp;
  } catch (error) {
    console.log(error);
  }

}

export function loginOut() {
  localStorage.removeItem("user");
}

export function whoAmI() {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return null;
}