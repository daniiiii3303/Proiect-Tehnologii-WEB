import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Error from "./error";
import ExperienceCard from "./experience-card";

const Homepage = (props) => {
  const [loading, setLoading] = useState(true);
  const [errorFetch, setErrorFetch] = useState(false);
  const [experiences, setExperiences] = useState({});
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  const getExperiences = async () => {
    await fetch(`http://localhost:8080/api/experiences`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((json) => {
            throw new Error(json.message);
          });
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setExperiences(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setErrorFetch(true);
      });
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    getExperiences();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="min-h-full grid justify-items-center font-mono bg-gray-100>">
          Loading...
        </div>
      ) : (
        <div>
          {errorFetch ? (
            <Error />
          ) : (
            <div className="min-h-full grid justify-items-center font-mono bg-gray-100">
              <div className="w-4/5 mt-10">
                <div className="flex justify-end">
                  <a
                    role="button"
                    className="bg-purple-600 flex justify-center items-center text-center hover:bg-purple-700 text-white text-sm px-4 py-2 border rounded-full"
                    href="./add-experience"
                  >
                    <svg
                      className="h-4 w-4 text-white mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Add an experience
                  </a>
                </div>
                <div className=" mt-5">Search bar</div>
                <div className="grid  grid-cols-1 py-10 psm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {experiences.map((experience) => (
                    <ExperienceCard experience={experience} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Homepage;
