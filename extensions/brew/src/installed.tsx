import { showToast, ToastStyle } from "@raycast/api";
import { useEffect, useState } from "react";
import { InstallableResults, brewFetchInstalled } from "./brew";
import { FormulaList } from "./components/list";

interface State {
  results?: InstallableResults;
  isLoading: boolean;
}

export default function Main() {
  const [state, setState] = useState<State>({isLoading: true});

  useEffect(() => {
    if (!state.isLoading) { return; }

    brewFetchInstalled(true)
      .then(results => {
        setState({results: results, isLoading: false});
      })
      .catch(err => {
        console.log("brewFetchInstalled error:", err);
        showToast(ToastStyle.Failure, "Brew list failed");
        setState({isLoading: false});
      });
  }, [state]);

  const formulae = state.results?.formulae ?? [];
  const casks = state.results?.casks ?? [];

  return (
    <FormulaList formulae={formulae}
                 casks={casks}
                 searchBarPlaceholder="Filter results by name"
                 isLoading={state.isLoading}
                 onAction={() => {
                   setState((oldState) => ({ ...oldState, isLoading: true}));
                 }}
    />
  );
}
