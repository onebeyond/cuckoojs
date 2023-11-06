# Release Instructions

## TL;DR

1. Trigger the [Version](https://github.com/onebeyond/cuckoojs/actions/workflows/version.yml) workflow specifying the `version-bump`
2. Publish the draft release (press the edit icon of the newly created draft release in [here](https://github.com/onebeyond/cuckoojs/releases))
3. See your packages get published to NPM 😌

## Motivation

This repository uses [Lerna](https://lerna.js.org/docs/introduction) as a tool to handle monorepos. Lerna provides commands [`version`](https://github.com/lerna/lerna/tree/main/libs/commands/version) and [`publish`](https://github.com/lerna/lerna/tree/main/libs/commands/publish), which under normal circumstances should be sufficient for versioning and publishing packages in a monorepo. In brief, the `version` command increments the versions of the monorepo packages, generates a [git tag](https://git-scm.com/book/en/v2/Git-Basics-Tagging), and pushes the modified files (`lerna.json`, `package.json` of the packages, changelog files, etc.) and the git tag. The `publish` command publishes the packages to the corresponding registry.

As mentioned in Lerna's documentation for the [`allow-branch`](https://github.com/lerna/lerna/tree/main/libs/commands/publish) option, it is advisable not to run the `version` command on a branch other than `main`. We agree that allowing versioning on branches can be error-prone. However, in this repository, pushes to `main` are restricted. We also wanted to avoid using person access tokens. This first limitation has led us to opt for an alternative and secure way to increment the version of the packages.

Furthermore, even though Lerna can generate versions based on commit messages following the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) specification, we have chosen a somewhat more manual but safer approach, at least in our opinion.

Continuing in this line, another limitation of Lerna (at least with our current knowledge of the tool) is that, even though it can generate git tags, it does not allow generating releases on GitHub automatically and synchronized with the package publishing in the corresponding registry.

## Workflows

Due to the reasons mentioned earlier, we have decided to structure the release process in three separate [workflows](./.github/workflows):

- [Version](./.github/workflows/version.yml): This workflow is triggered with a [`workflow_dispatch`](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#workflow_dispatch) trigger, where you need to specify the `version-bump` using a choice input. The options correspond to the positional argument [`bump`](https://docs.github.com/en/actions/using-workflows/events-that-trigger-workflows#workflow_dispatch) of Lerna's `version` command. Key steps in this workflow include:
    - Increasing the version of packages using Lerna's `version`. The `--no-push` option prevents Lerna from pushing the changes, and `--no-git-tag-version` prevents Lerna generating a git tag. Both actions are delegated to subsequent steps and/or workflows.
    - Creating a pull request using the [create-pull-request](https://github.com/peter-evans/create-pull-request) action. The generated branch follows the format `releases/bump-version-v*.*.*`, where `*.*.*` is the version generated by Lerna according to the `version-bump` input.
- [Release](./.github/workflows/release.yml): This workflow is triggered when a pull request on a branch whose name follows the format `'releases/'` is merged. Effectively, this means that this workflow is triggered when the pull request generated during the `Version` workflow is merged. Using the [release-drafter](https://github.com/release-drafter/release-drafter) action, a draft release (and a tag) is generated on GitHub with the version determined during the `Version` workflow.
- [Publish](./.github/workflows/publish.yml): This workflow is triggered when a tag with the format `v*.*.*` is pushed. Effectively, this workflow is activated when the release generated in the previous step is published. This workflow uses Lerna's `publish` command with the [`from-package`](https://github.com/lerna/lerna/tree/main/libs/commands/publish#bump-from-package) option. We have experienced some undesired behaviour using the `from-git` option, resulting in no new versions detected during the publication step.

## Acknowledgments

A significant portion of this workflow has been inspired by the [lerna-ci-cd-example](https://github.com/fahslaj/lerna-ci-cd-example) repository by Austin Fahls (@fashlaj) and the very informative (though a bit long 🙏) video [Using Github Actions to Publish your Packages](https://www.youtube.com/watch?v=WwPrvDDuoBY) by Austin and Zachary DeRose (@ZackDeRose). Huge thanks to both. 

We recommend you to visit these links. And if their work has also been helpful to you, don't forget to acknowledge their efforts. 😉