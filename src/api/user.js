import axios from "axios";

export async function Login(username, password) {
  try {
    const resp = await axios.post('https://mallapi.duyiedu.com/passport/login', {
      email: username,
      password
    });
    if (resp.status === 200) {
      if (resp.data.data) {
        localStorage.setItem('user', JSON.stringify(resp.data.data))
      }
      return resp.data.data;
    }
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