const users = {};

const getUsersData = (request, response) => {
  const responseData = {
    users,
  };

  const responseMessage = JSON.stringify(responseData);

  response.writeHead(200, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(responseMessage, "utf-8"),
  });
  if (request.method !== "HEAD") {
    response.write(responseMessage);
  }
  response.end();
};

const getNotRealData = (request, response) => {
  const responseData = {
    id: "notFound",
    message: "The page you are looking for was not found.",
  };

  const responseMessage = JSON.stringify(responseData);

  response.writeHead(404, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(responseMessage, "utf-8"),
  });
  if (request.method !== "HEAD") {
    response.write(responseMessage);
  }
  response.end();
};

// body parsing code found from https://betterstack.com/community/questions/post-data-node-js/
const handleUserInfo = (request, response) => {
  let bodyData = "";

  request.on("data", (chunk) => {
    bodyData += chunk;
  });

  request.on("end", () => {
    console.log(bodyData);
    const newUserData = JSON.parse(bodyData);
    // assisted by chatGPT to figure out how to dynamically access the key
    const key = Object.keys(newUserData)[0];
    const newName = newUserData[key].name;
    const newAge = newUserData[key].age;

    let responseData;
    let status;

    if (newName === "" || newAge === "") {
      responseData = {
        id: "addUserMissingParams",
        message: "Name and age are both required.",
      };
      status = 400;
    } else {
      if (users[newName]) {
        const user = users[newName];
        user.age = newAge;
        status = 204;
      } else {
        users[newName] = newUserData[key];
        responseData = {
          message: "Created Successfully",
        };
        status = 201;
      }
      console.log(users);
    }

    const responseMessage = JSON.stringify(responseData);
    response.writeHead(status, {
      "Content-Type": "application/json",
    });
    if (status !== 204) {
      response.write(responseMessage);
    }
    response.end();
  });
};

module.exports = {
  getUsersData,
  getNotRealData,
  handleUserInfo,
};
