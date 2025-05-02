import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [searchFilter, setSearchFilter] = useState({
    title: '',
    location: ''
  });

  const [isSearched, setIsSearched] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);

  // Fonction pour charger les jobs (ex: simuler appel API)
  const fetchJobs = async () => {
    setJobs(jobsData); // ici tu charges les données locales
  };

  useEffect(() => {
    fetchJobs(); // Charger les jobs au démarrage
  }, []);

  const value = {
    searchFilter,
    setSearchFilter,
    isSearched,
    setIsSearched,
    jobs,
    setJobs,
    showRecruiterLogin,
    setShowRecruiterLogin,


  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};
