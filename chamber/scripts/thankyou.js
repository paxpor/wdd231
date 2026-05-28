const params = new URLSearchParams(window.location.search);

const results = document.querySelector("#results");

results.innerHTML = `
  <p><strong>First Name:</strong> ${params.get("fname")}</p>

  <p><strong>Last Name:</strong> ${params.get("lname")}</p>

  <p><strong>Email:</strong> ${params.get("email")}</p>

  <p><strong>Phone:</strong> ${params.get("phone")}</p>

  <p><strong>Organization:</strong> ${params.get("orgname")}</p>

  <p><strong>Application Submitted:</strong> ${params.get("timestamp")}</p>
`;