import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddExperienceButton from "./add-experience-button";
import Error from "../error";
import ExperienceCard from "./experience-card";
import Loading from "../loading";
import SearchBar from "./search-bar";

const Experiences = (props) => {
  const { isMyExperiencePage } = props;
  const [loading, setLoading] = useState(true);
  const [errorFetch, setErrorFetch] = useState(false);
  const [experiences, setExperiences] = useState([]);
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  const getMyExperiences = async () => {
    await fetch(
      `http://localhost:8080/api/users/${JSON.parse(user).id}/experiences`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
      }
    )
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
        setLoading(false);
        setErrorFetch(true);
      });
  };

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
        setLoading(false);
        setErrorFetch(true);
      });
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    if (isMyExperiencePage) {
      getMyExperiences();
    } else {
      getExperiences();
    }
  }, []);

  return (
    <div>
      {loading ? (
        <div className="min-h-full loading grid justify-items-center font-mono">
          <Loading />
        </div>
      ) : (
        <div>
          {errorFetch ? (
            <Error />
          ) : (
            <div className="min-h-full grid justify-items-center font-mono bg-gray-100">
              <div className="w-4/5 mt-10">
                <div className={isMyExperiencePage ? "mb-5 invisible" : "mb-5"}>
                  <SearchBar experiences={experiences} />
                </div>
                <AddExperienceButton isMyExperiencePage={isMyExperiencePage} />
                {experiences.length > 0 ? (
                  <div className="grid grid-cols-1 py-10 psm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {experiences.map((experience) => (
                      <ExperienceCard
                        experience={experience}
                        setErrorFetch={setErrorFetch}
                        isMyExperiencePage={isMyExperiencePage}
                        getMyExperiences={getMyExperiences}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="no-content grid mt-10 font-mono bg-gray-100">
                    No experiences
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Experiences;
