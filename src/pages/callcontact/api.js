async function fetchCountriesCode() {
  const response = await fetch("https://api-paises.pages.dev/paises.json");
  const data = await response.json();
  return data;
}

export { fetchCountriesCode };
