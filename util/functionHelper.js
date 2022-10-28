import { useEffect, useState } from "react";

export function classNameBuilderHelper(param, styles) {
  let classNameResult;
  if (typeof param == "object") {
    classNameResult = param
      .map((el) => {
        el = styles[el];

        return el;
      })
      .join(" ");
  }
  return classNameResult;
}

export function useWindowDimension() {
  const hasWindow = typeof window !== "undefined";

  function getWindowDimension() {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return { width, height };
  }

  const [windowDiemsions, setWindowDimensions] = useState(getWindowDimension());

  useEffect(() => {
    if (hasWindow) {
      function handleResize() {
        setWindowDimensions((current) => (current = getWindowDimension()));
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [hasWindow]);

  return windowDiemsions;
}

export function formatCity(city) {
  if (!city.includes(" ")) {
    const toLower = city.toLowerCase();
    console.log(toLower.toString().charAt(0).toUpperCase());
    return toLower.charAt(0).toUpperCase() + toLower.slice(1);
  }

  const toLower = city.toLowerCase();
  const arr = toLower.split(" ");
  for (let i = 0; i < arr.length; i++) {
    if (i === 0 || i === arr.length - 1) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
  }
  return arr.join(" ");
}

export async function getGeoCity(city) {
  const key = process.env.NEXT_PUBLIC_GEO_API_KEY;
  const res = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city},NL&limit=1&appid=${key}`
  );
  const json = await res.json();
  console.log(json);
  if (json[0] !== city || json.length === 0) return false;
  else return { lat: json[0].lat, lon: json[0].lon };
}
