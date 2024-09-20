try {
  const url = `${process.env.API_BASE_URL}/auth/register`;
  const body = {
    email: "testUser@test.com",
    password: "test",
  };
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(`${JSON.stringify(result)}`);
  }
  process.env.USER = result.user;
  process.env.TC_AUTH_TOKEN = result.token;
  console.log(result);
  console.log(result.message);
} catch (error) {
  console.log(error.message);
  console.log(error);
  process.exit();
}
