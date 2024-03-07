import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { showStats } from "../../../features/allJobs/allJobsSlice";
import StatsContainer from "../../../components/StatsContainer/StatsContainer";
import ChartsContainer from "../../../components/ChartsContainer/ChartsContainer";

const Stats = () => {
  const { monthlyApplications } = useSelector((store) => store.allJobs);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showStats());
  }, []);
  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};
export default Stats;
