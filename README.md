# HL7 AU FHIR Test Data Utilities

This repository contains source code for command line utilities used to generate the FHIR JSON files and upload them to a FHIR Server. These tools are closely related  to [`au-fhir-test-data`](https://github.com/hl7au/au-fhir-test-data), a repository designed for the maintenance of a small example data set To demonstrate the functionality of the HL 7 AU standards.

There are three tools in this repository:

* `Csv2FhirMapping` expands comma separated value files into JSON FHIR resources. 
* `TestDataClient` uploads the values to a server 
* `xls-converter` converter adjusts some content of excel fields according to yields

State of the code:

* None of these tools at the current time have any automated tests.
* `Csv2FhirMapping` and `TestDataClient` have a Github-actions-based ci build, which publishes [Zip archives of release binaries on tag](https://github.com/hl7au/au-fhir-test-data-utils/releases) for arch arm/win and os linux/win.
* `xls-converter` has a Github-actions-based ci build, which publishes [Zip archives of release binaries on tag](https://github.com/hl7au/au-fhir-test-data-utils/releases) of the package.

## Did you find an error?
We appreciate your contributions to improving au-fhir-test-data. **If you encounter any bugs or defects, please follow the steps below to report them**:

### 1. Search for Existing Issues
Before submitting a new issue, please search the GitHub [Issues list](https://github.com/hl7au/au-fhir-test-data-utils/issues) to check if your issue has already been reported. If you find an existing issue, you can add your comments or additional information to it.

### 2. Open a New Issue
If you do not find a similar issue, you can open a [new one](https://github.com/hl7au/au-fhir-test-data-utils/issues). Click on the New Issue button and provide the following details:

```
Title: A brief and descriptive title for the issue.
Description: A detailed description of the issue, including:
1. Steps to reproduce the issue.
2. Expected and actual behaviour.
3. Screenshots or another related information (if applicable).
```

### Questions?
If you have a question, the best place to start is Zulip e.g. the https://chat.fhir.org/#narrow/stream/179173-australia/topic/AU.20FHIR.20Test.20Data topic

## How to Contribute to HL7 AU Test Data Utils
We value contributions to **au-fhir-test-data-utils**. Here’s how you can help:

## Working on `Csv2FhirMapping` or `TestDataClient`

### Setup

The following steps are for Windows. However, none of the dependencies are native, so with a little bit of understanding of the shell, you should be able to use Unix-flavors (Mac, Linux, ...) as well.

1. Install the [.NET SDK 8](https://dotnet.microsoft.com/en-us/download/dotnet/8.0) (the open-source, cross-platform [.NET Core](https://learn.microsoft.com/en-us/dotnet/core/install) toolchain, not .NET Framework).
2. (Optional) Install [VSCode](https://code.visualstudio.com/Download).

Note: the .NET SDK does not include the standalone `msbuild` executable, so use `dotnet build` (or the provided `.bat` scripts, which call `dotnet publish`) instead. See the [full list of tools included in the SDK](https://learn.microsoft.com/en-us/dotnet/core/tools/) for reference.

### Building

1. Open a Command Prompt `cmd` ([advice](https://www.digitalcitizen.life/open-cmd/))
2. Type `BuildCsvFhirMapping.bat` or `BuildTestDataClient.bat`. This will execute a batch file that builds.

### Editing and Debugging

0. Open IDE.
1. Change into the respective subdirectory.
2. Become [Peter Parker](https://en.wikipedia.org/wiki/With_great_power_comes_great_responsibility).

### Communicating Intent
- Open a [GitHub issue](https://github.com/hl7au/au-fhir-test-data-utils/issues) to discuss your plans to help avoid duplication of effort, align and prioritise your contributions based on the scope of the project - refer to the [HL7 AU Test Data Project Scope Statement](https://confluence.hl7.org/display/HA/HL7+Australia+Project+Registry?preview=/184927329/248874957/Test%20Data%20Project%201.2.pdf).
- Join the fortnightly HL7 AU Infrastructure and Tooling Community Meetings ([register here](https://confluence.hl7.org/display/HAFWG/Infrastructure+and+Tooling+Contact+List)) where we discuss and triage issues. Feel free to add your issue to the [meeting agenda](https://confluence.hl7.org/pages/viewpage.action?pageId=265492851#CommunityMeetingAgendaandMinutes-MeetingDetails) and we'll aim to discuss your issue/ proposed contribution when you are present at the meeting.
- Use Zulip to connect with the team and community asynchronously: 
  - Specific topic for the HL7 AU Test Data project: [AU FHIR Test Data](https://chat.fhir.org/#narrow/stream/179173-australia/topic/AU.20FHIR.20Test.20Data)
  - General: [Australia Stream](https://chat.fhir.org/#narrow/stream/179173-australia)

### Contributing Code
1. Fork this repository.
2. Create a branch and use the GitHub issue number followed by a meaningful description as the branch name for your test data contribution, sticking to lowercase and hyphens to separate words. For example, the following is a branch for GitHub issue #123 for adding resources with logical references: `123-logical-refs`
3. Make your contributions/ changes.
4. Submit a pull request (PR) for review.
5.  Once the PR has been reviewed and feedback addressed collaboratively, it will be merged into the main branch.

