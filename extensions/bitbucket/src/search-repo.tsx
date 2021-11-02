import { ActionPanel, CopyToClipboardAction, List, OpenInBrowserAction, showToast, ToastStyle } from "@raycast/api";
import { IRepository } from "./interfaces/Repositories";
import { useEffect, useState } from "react";
import { BitbucketClient } from "./bitbucketClient";

// BqKAmddNqstcyZTJjGec
export default function Command() {
  const [repositories, setRepositories] = useState<IRepository[]>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    async function fetchRepo() {
      const Bitbucket = new BitbucketClient();
      try {
        const repoData = await Bitbucket.getRepositories();
        setRepositories(repoData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        }
      }
    }

    fetchRepo();
  }, []);

  if (error) {
    showToast(ToastStyle.Failure, "Something went wrong", error.message);
  }

  return (
    <List searchBarPlaceholder="Filter Repositories by name..." isLoading={!repositories}
          throttle={true}>
      {repositories?.map(repo => {
        const lastUpdated = new Date(repo.updated_on);
        // const [month, day, year] = [lastUpdated.getMonth(), lastUpdated.getDate(), lastUpdated.getFullYear()];
        return (
        <List.Item
          title={repo.full_name}
          key={repo.uuid}
          icon={repo.links.avatar.href}
          accessoryTitle={`Last update: ${lastUpdated.toLocaleDateString()}`}
          actions={
            <ActionPanel>
              <ActionPanel.Section>
                <OpenInBrowserAction url={repo.links.html.href} />
                <CopyToClipboardAction
                  title="Copy Repository URL"
                  content={repo.links.html.href}
                />
              </ActionPanel.Section>
            </ActionPanel>
          } />
      )})}
    </List>
  );
}