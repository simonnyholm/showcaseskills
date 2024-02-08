import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { TokenContext } from "../contexts/TokenProvider";
import { useNavigate } from "react-router-dom";

import Slider from "react-slick";
import FormikForm from "../components/package/FormikForm";

export default function Home() {
  const [classes, setClasses] = useState();
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();

  const { token } = useContext(TokenContext);

  useEffect(function () {
    (async function () {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/classes"
        );
        console.log(response);
        if (response.status === 200) {
          setClasses(response.data);
        }
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  console.log("klasser", classes);
  console.log(token);

  var settings = {
    lazyLoad: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  console.log("NEWREUTENSNACH");

  return (
    <>
      <h1>Home</h1>
      <section>
        {isLoading && (
          <article>
            <h2>...loading</h2>
          </article>
        )}
        {classes && (
          <Slider {...settings}>
            {classes?.map((item, index) => (
              <article className="h-10 w-12 p-4 m-10" key={index}>
                <div>
                  <img src={item.asset.url} alt="" />
                </div>
                <h2 onClick={() => navigate("/classdetails/" + item.id)}>
                  {item.className}
                </h2>
              </article>
            ))}
          </Slider>
        )}
        {error && (
          <article>
            <h2>Fejl</h2>
            <p>{error}</p>
          </article>
        )}
      </section>
      <section>
        <FormikForm />
      </section>
    </>
  );
}
