import useApi from '../hooks/useApi';
import useToast from '../hooks/useToast';
import { triggerPlanner } from '../services/PlannerService';

const PlannerScreen = () => {
  const { callApi, loading, error } = useApi();
  const toast = useToast();

  const handlePlanner = async () => {
    const result = await callApi(() => triggerPlanner(1)); // Replace 1 with real family_id
    if (result) toast("Planner updated!");
  };

  return (
    <>
      <Button title={loading ? "Planning..." : "Trigger Planner"} onPress={handlePlanner} />
      {error && toast(error)}
    </>
  );
};
