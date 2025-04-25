document.addEventListener("DOMContentLoaded", () => {
  
    const detailContainer = document.getElementById("detailContainer");
    const personData = JSON.parse(localStorage.getItem("selectedPerson"));

    if (!personData) {
      detailContainer.innerHTML = "<p>Məlumat tapılmadı.</p>";
      return;
    }

    const { fullName, age, img, city, description, gender, nickname } = personData;

    detailContainer.innerHTML = `
      <img src="${img}" alt="${fullName}">
      <h2>${fullName} (${nickname})</h2>
      <p><strong>Yaş:</strong> ${age}</p>
      <p><strong>Şəhər:</strong> ${city}</p>
      <p><strong>Cinsiyyət:</strong> ${gender}</p>
      <p><strong>Haqqında:</strong> ${description}</p>
    `;
  });