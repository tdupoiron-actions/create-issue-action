# Create Issue Action

A custom GitHub Action to create issues programmatically using Octokit.

## Features

- Create issues in any repository
- Add labels, assignees, and milestones
- Returns issue number and URL as outputs
- Built with @actions/github and Octokit

## Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `github-token` | GitHub token for authentication | Yes | - |
| `repository` | Repository in the format `owner/repo` | Yes | - |
| `title` | Issue title | Yes | - |
| `body` | Issue body content | No | `''` |
| `labels` | Comma-separated list of labels | No | `''` |
| `assignees` | Comma-separated list of assignees | No | `''` |
| `milestone` | Milestone number | No | - |

## Outputs

| Output | Description |
|--------|-------------|
| `issue-number` | The number of the created issue |
| `issue-url` | The URL of the created issue |

## Usage

### Basic Example

```yaml
name: Create Issue
on:
  workflow_dispatch:

jobs:
  create-issue:
    runs-on: ubuntu-latest
    steps:
      - name: Create an issue
        uses: your-username/create-issue@v1
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          repository: ${{ github.repository }}
          title: 'New Issue Title'
          body: 'This is the issue description'
```

### Advanced Example with Labels and Assignees

```yaml
name: Create Issue with Metadata
on:
  workflow_dispatch:

jobs:
  create-issue:
    runs-on: ubuntu-latest
    steps:
      - name: Create an issue
        id: create-issue
        uses: your-username/create-issue@v1
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          repository: ${{ github.repository }}
          title: 'Bug Report'
          body: |
            ## Description
            Something is broken
            
            ## Steps to Reproduce
            1. Step one
            2. Step two
          labels: 'bug, priority-high'
          assignees: 'username1, username2'
          milestone: 1
      
      - name: Output issue details
        run: |
          echo "Issue #${{ steps.create-issue.outputs.issue-number }} created"
          echo "URL: ${{ steps.create-issue.outputs.issue-url }}"
```

## Development

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the action:
   ```bash
   npm run build
   ```

3. Commit the `dist/` folder along with your changes

### Building

This action uses [@vercel/ncc](https://github.com/vercel/ncc) to compile the code and dependencies into a single file. Always run `npm run build` before committing changes.

## License

MIT