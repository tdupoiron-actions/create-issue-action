const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    // Get inputs
    const token = core.getInput('github-token', { required: true });
    const repository = core.getInput('repository', { required: true });
    const title = core.getInput('title', { required: true });
    const body = core.getInput('body');
    const labelsInput = core.getInput('labels');
    const assigneesInput = core.getInput('assignees');
    const milestoneInput = core.getInput('milestone');

    // Parse repository
    const [owner, repo] = repository.split('/');
    if (!owner || !repo) {
      throw new Error(`Invalid repository format: ${repository}. Expected format: owner/repo`);
    }

    // Initialize Octokit
    const octokit = github.getOctokit(token);

    // Prepare issue data
    const issueData = {
      owner,
      repo,
      title,
      body,
    };

    // Add labels if provided
    if (labelsInput) {
      issueData.labels = labelsInput.split(',').map(label => label.trim()).filter(Boolean);
    }

    // Add assignees if provided
    if (assigneesInput) {
      issueData.assignees = assigneesInput.split(',').map(assignee => assignee.trim()).filter(Boolean);
    }

    // Add milestone if provided
    if (milestoneInput) {
      const milestoneNumber = parseInt(milestoneInput, 10);
      if (!isNaN(milestoneNumber)) {
        issueData.milestone = milestoneNumber;
      }
    }

    // Create the issue
    core.info(`Creating issue in ${owner}/${repo}...`);
    const response = await octokit.rest.issues.create(issueData);

    // Set outputs
    core.setOutput('issue-number', response.data.number);
    core.setOutput('issue-url', response.data.html_url);

    core.info(`✅ Successfully created issue #${response.data.number}`);
    core.info(`URL: ${response.data.html_url}`);

  } catch (error) {
    core.setFailed(`Action failed: ${error.message}`);
  }
}

run();
