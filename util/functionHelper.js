import { useEffect, useState } from "react";
import { verify } from "jsonwebtoken";

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
  const toLower = city.toLowerCase();
  if (!city.includes(" ")) {
    return toLower.charAt(0).toUpperCase() + toLower.slice(1);
  }

  const arr = toLower.split(" ");
  for (let i = 0; i < arr.length; i++) {
    if (i === 0 || i === arr.length - 1) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
  }
  return arr.join(" ");
}

export async function getGeoCity(city) {
  const key = process.env.GEO_API_KEY;
  const res = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city},NL&limit=1&appid=${key}`
  );
  const json = await res.json();
  if (json[0] !== city || json.length === 0) return false;
  else return { lat: json[0].lat, lon: json[0].lon };
}

export async function isRedirect(headers, check) {
  const cookieHeaders = headers.cookie && headers.cookie;
  console.log("cookie header", cookieHeaders);
  if (!cookieHeaders) return true;
  const cookieToken = cookieHeaders.split("=")[1];
  const user = verify(
    cookieToken,
    process.env.ACCESS_TOKEN_SECRET,
    async function (error, result) {
      if (error) {
        return true;
      }
      if (check) {
        return result;
      }

      return true;
    }
  );

  return false;
}
