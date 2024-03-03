
![Hackathon Logo](docs/images/Sitecore-hackathon-XPlorers-Sitecore-Naveed-Sitecore-Amit-1.png?raw=true "Hackathon Logo")
# Sitecore Hackathon 2024 - Sitecore XPlorers Team
![Hackathon Logo](docs/images/Sitecore-hackathon-XPlorers-Sitecore-Naveed-Sitecore-Amit.png)


## Category
Best use of AI

## Description
The main goal of our submission is to have a Gen AI based chat assistant aka Copilot. For this purpose, we developed a Copilot for PLAY! Summit website, based upon Azure OpenAI Studio and Azure Cognitive Search, and integrated it back to the PLAY! Summit repository. The Copilot can help improve the customer experience for finding useful information about the sessions and they can ask questions like: 

  - When is the opening note session and what is it about?
  - Recommend me some sessions about Outdoor Adventure
  - I cannot decide between a cycling and outdoor survival session, help me choose!

### How It Works
1-	Setup Azure Cognitive Search and Azure OpenAI with your own data.

2-	User sends an input via chat interface like “When is the opening key note session”

3-	This information is passed to Azure Cognitive Search 

4-	The Azure Cognitive Search returns the response from the index.

5-	The response plus the chat input (prompt) is then passed to Azure OpenAI model 

6-	The Azure OpenAI model returns the AI generated response.

7-	This response is then sent back to the user.

This the overall architecture diagram of the Copilot

![Architecture](docs/images/Architecture-Diagram.png?raw=true "Architecture Logo")

### Azure Open AI Studio – Chat Playground

![Image](docs/images/image-1.png?raw=true "Architecture Logo")

![Image](docs/images/image-2.png?raw=true "Architecture Logo")

![Image](docs/images/image-3.png?raw=true "Architecture Logo")


## Video link
[Video link => docs/ PlaySummit-Video.mp4](docs/PlaySummit-Video.mp4)


## Pre-requisites and Dependencies

1- Requires Azure Subscription for Azure OpenAI

2- Requires Azure Subscription for Azure Cognitive Search

3- Docker for Windows with Windows containers enabled

4- Windows PowerShell 5.1

5- LTS version of Node.js

6- .NET Core 3.1 SDK or higher

7- .NET Framework 4.8 SDK

8- Visual Studio 2022

Additionally, you will need to setup index schema for Azure Cognitive Search and upload data to the index using REST API commands as mentioned here.


## Installation instructions
Follow the document present at / 

> _A simple well-described installation process is required to win the Hackathon._  
> Feel free to use any of the following tools/formats as part of the installation:
> - Sitecore Package files
> - Docker image builds
> - Sitecore CLI
> - msbuild
> - npm / yarn
> 
> _Do not use_
> - TDS
> - Unicorn
 
for example:

1. Use the Sitecore Installation wizard to install the [package](#link-to-package)
2. ...
3. profit

### Configuration
⟹ If there are any custom configuration that has to be set manually then remember to add all details here.

_Remove this subsection if your entry does not require any configuration that is not fully covered in the installation instructions already_

## Usage instructions
⟹ Provide documentation about your module, how do the users use your module, where are things located, what do the icons mean, are there any secret shortcuts etc.

Include screenshots where necessary. You can add images to the `./images` folder and then link to them from your documentation:

![Hackathon Logo](docs/images/hackathon.png?raw=true "Hackathon Logo")

You can embed images of different formats too:

![Deal With It](docs/images/deal-with-it.gif?raw=true "Deal With It")

And you can embed external images too:

![Random](https://thiscatdoesnotexist.com/)

## Comments
If you'd like to make additional comments that is important for your module entry.