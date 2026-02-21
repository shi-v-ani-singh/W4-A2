"use server";

const registerUser= async(formData)=> {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  if (!name || !email || !password) {
    throw new Error("Required fields missing");
  }

  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }

  
  await new Promise((res) => setTimeout(res, 1000));

  console.log({
    name,
    email,
  });

  return { success: true };
}
export default registerUser