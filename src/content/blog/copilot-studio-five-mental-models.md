---
title: "What customers are asking about Copilot Studio, and five mental models that answer most of it"
description: "Themes from a Microsoft Copilot Studio Office Hours session: harnesses, where AI belongs, platform limits, credentials, and running agents like software."
pubDate: 2026-11-13
tags: ["AI", "Technical"]
heroImage: ./images/copilot-studio-five-mental-models/cover.png
heroAlt: "Five mental models: what customers are asking about Copilot Studio, with a process flow of deterministic steps around a single AI agent step"
draft: true
---

> **A quick detour.** The *Do You Git It?* series continues next week with Part 2. This one couldn't wait.

Last week I joined one of Microsoft's Copilot Studio Office Hours sessions on behalf of Caf2Code. The format was simple: customers submitted questions ahead of time, we opened with a short demo of an agent we built, and then we worked through the questions live.

I can't share the questions themselves, but the themes were too useful to keep in one call. The questions came from different industries and different stages of adoption, yet most of them came down to the same few decisions. Here are the five mental models that answered most of them, plus the method I'd use to get started.

*Product names, limits, and dates here are current as of early November 2026. Copilot Studio changes monthly, so check Microsoft Learn before you design around a specific number.*

## 1. Choose the harness before the model

Every Copilot Studio agent is three layers stacked together:

| Layer | What it is | Think of it as |
|---|---|---|
| Model | The LLM that reasons and writes | The brain |
| Harness | The runtime that decides what to send the model, calls tools, retries, and stops | The manager running the loop |
| Configuration | Instructions, knowledge, tools, flows, and channels | The job description |

Most conversations start with the model. They should start with the harness. In Microsoft's own evaluations, switching the harness moved pass rates by 10 to 22 points, while switching the model barely moved them.

There are two harnesses most teams will choose between:

- **Standard harness:** follows the topics and paths you draw. It's predictable, and the right fit for short, bounded, high-traffic conversations.
- **Microsoft Copilot harness:** works toward a goal. It plans, calls tools, retries after a failure, and handles long-running, multi-system, reasoning-heavy work. It's been generally available since August 2026, and was renamed from the GitHub Copilot harness in late October.

Two things catch people out:

- **You can't switch later.** There's no harness dropdown. The way you create the agent decides it, and an agent can't move between harnesses afterward. Moving one is a rebuild, not a conversion.
- **Building costs credits too.** On the Microsoft Copilot harness, building, testing, and evaluating all consume Copilot Credits, not just runtime.

**The takeaway:** pick the harness per scenario, then the model, then tune the configuration.

## 2. Build a deterministic backbone, then add one AI step

The most common design question was some version of "where does AI belong?" My answer: flows own the writes and anything that must be identical every time. The agent owns the one step a rule can't express.

| Keep it deterministic when… | Use an AI step when… |
|---|---|
| The rule is stable and fits an if-then | The input is unstructured: an email, a PDF, free text |
| The step writes to a system of record | The input varies too much for a fixed path |
| The same input must give the same output | Several sources have to be combined |
| Compliance needs a fixed, provable path | A person would apply judgment, not a lookup |

Three habits make this work:

- **Build the backbone first.** Get the trigger and the deterministic steps running, then find the one place a rule can't make the call, and put the agent there. Working the other way round gives you an agent with a flow bolted on.
- **Always return structured output.** An agent step that returns free text puts you back into string parsing. A schema turns every field into something the next step can branch on.
- **One or two AI steps, not ten.** More AI steps don't make a process smarter. They make it harder to test and less predictable.

### Agent proposes, person approves, flow writes

When an agent's output ends up in a system of record, the agent should never write there directly. The pattern:

1. The agent returns its findings into a staging record.
2. A person reviews the proposed values and the reasoning, then approves or rejects.
3. A flow performs the write once, with an audit trail of who approved what and when.

Pick the approval gate by who approves. If the person in the chat is the approver, use the per-tool approval option. If the process runs in a workflow and someone else approves, use a human review step. For regulated approvals with multiple approvers, reminders, and escalation, Power Automate Approvals is still the most mature option. Rules like "anything over this amount goes to a second approver" belong in a deterministic branch, never in the model.

## 3. Design to the limits

Timeouts, record caps, and "response too large" errors came up repeatedly, especially with MCP servers. Most of those errors aren't the model. They're platform caps:

- **Payload:** about 5 MB per connector or tool response.
- **Tool calls:** about two minutes for an ordinary tool call.
- **Express-mode agent flows:** 64 KB per action.

These limits apply per call on both harnesses. Moving to the Microsoft Copilot harness doesn't raise them, so design around them instead:

- **Make the server do the work.** Give every read tool parameters for page size, paging, filtering, and field selection, with sensible defaults.
- **Return summaries, not raw rows.** Add aggregate tools so the model never has to page through thousands of records.
- **Return big results as files.** Use an MCP embedded resource or a file reference instead of inline JSON.
- **Move bulk work out of the conversation.** Let a workflow do the heavy lifting and write a shaped result, then let the agent query that.
- **Test with production-sized data,** and watch tool latency before your users find the limit for you.

### Large documents: know which job you're doing

A related theme was very large documents, hundreds of pages long. The answer depends on the job:

- **Question and answer:** adding big documents as knowledge works well. Retrieval pulls the relevant chunks, so "what's the renewal date in this contract?" is fine.
- **Whole-document analysis:** clause extraction, comparing versions, or summarizing all 250 pages is different. Retrieval returns chunks, not the whole file. Pre-extract the content into structured tables, use the Microsoft Copilot harness for whole-file reasoning, or process it in chunks in a workflow and combine the results.

For something like contracts, I'd pre-extract. Every answer can then be traced back to a field someone can check.

## 4. The connect card is a credentials decision

"Can we get rid of the connection prompt?" was one of the most practical questions, and it's often framed as an MCP limitation. It isn't. What users see depends on whose credentials a tool runs under and what sits behind it:

| Setup | What the user sees |
|---|---|
| Microsoft connectors and Microsoft MCP servers | A one-time consent card |
| Custom connectors or custom MCP servers on Entra ID | Consent plus an extra sign-in, until on-behalf-of (OBO) authentication is configured on the connector |
| Third-party services with their own sign-in | A one-time sign-in per user. That's the vendor's security model. |
| Maker-provided credentials (a service account) | Nothing at all |

Maker-provided credentials remove the prompt entirely, but every user then inherits that one account's permissions, and the audit trail shows the account instead of the person. That's a real trade-off, so make it a deliberate design decision, not a workaround. Admins can also block that option per environment.

One more lesson from our own build: **secrets expire.** An app registration secret that quietly lapsed took an agent down. Track expiration dates, or use certificates, before it happens to you.

## 5. Treat agents like software

The governance and lifecycle questions shared one answer: an agent is software, so run it like software.

### Govern where agents can go

- **Environments limit the damage.** Separate dev, test, and production. Route new makers into personal dev environments, so experiments never start in production.
- **Lock it down once.** Secure shared environments with Entra security groups, turn on Managed Environments, and set rules through environment groups so they don't drift.
- **Use the agent-specific DLP controls.** Copilot Studio has its own data loss prevention connectors to require sign-in and to control knowledge sources, channels, and triggers.
- **Set the two controls people miss:** the maker-credential policy for each environment, and sharing limits, so nobody can share an agent with the whole company in one click.

### Run it after it ships

- **Package and promote it.** Put agents, flows, and connection references in a solution, and promote them through pipelines.
- **Give every agent a named owner.**
- **Evaluate before every publish.** Build a test set from real conversations, and re-run it every time the instructions, knowledge, tools, or model change.
- **Monitor in layers.** The built-in Analytics page shows conversation outcomes. Application Insights, with Azure Monitor alerts, catches tool failures and slowdowns. The Copilot Agent Kit gives a platform team the view across every agent.

Then keep a weekly loop: review the conversations that failed or got a thumbs-down, change one thing, re-run the evaluations, promote it, and watch the results for a week. Most of the improvement comes from better knowledge coverage and clearer tool descriptions, not prompt wording.

## Where to start

Several questions asked which use cases fit and how to build them. I see those as one story.

### Find the right process

Score each candidate from 1 to 3 on:

1. **Frequency:** daily or weekly, not quarterly.
2. **Manual effort:** people reading, comparing, re-keying, and chasing.
3. **Unstructured input or exceptions:** emails, PDFs, judgment calls. Without these, it's plain automation.
4. **Reachable data:** the systems have connectors, MCP servers, or APIs.
5. **Catchable risk:** a wrong answer can be caught, or gated by an approval, before it does harm.
6. **A measurable KPI:** cycle time, touches, or error rate, with a baseline you can compare against.

Strong candidates score high on frequency, effort, and reachable data, and have at least one judgment step. Some work isn't a fit at all: pure rules belong in Power Automate, bulk data belongs in a data pipeline, and one person's productivity belongs in Microsoft 365 Copilot.

### Turn it into an agent in eight steps

1. **Pick the process,** using the scores above.
2. **Map it** with the process owner: who does what, in which system, and where it waits for a person.
3. **Mark every step** as deterministic or judgment. Expect one or two judgment steps.
4. **Define the contract:** the trigger, the inputs, and the structured output the judgment step must return.
5. **Build the backbone:** the trigger and the deterministic steps.
6. **Add one agent step,** with structured output and a human review path for the exceptions.
7. **Test and evaluate** with real sample inputs, then an evaluation set.
8. **Publish and measure.** Compare the KPI against your baseline after 30 days, and feed the exceptions back into the agent.

The backbone is reusable. From one process to the next, only the agent step changes.

If you're just starting, keep it small: one knowledge agent in a personal dev environment, then one tool, then one evaluation set.

## The pattern in practice

We opened the session with a collections agent, and it shows all five models working together.

A collections team needed to send customers emails drafted from about 30 templates, after a third-party tool was retired. Here's how it works:

1. A collector selects transactions on a Dynamics 365 Finance & Operations screen and selects **create email**.
2. A business event fires, and a Power Automate flow shapes the ERP data into a clean payload: the customer's details plus a capped number of invoices. That cap is designing to the limits.
3. A Copilot Studio agent matches the situation to the right Word template. **This is the only AI step.**
4. A Word MCP server fills in the template, and a flow creates the draft in the collector's own Outlook mailbox.
5. The collector reviews it and selects send.

What made it work:

- **The user stays in the ERP.** There's no new app to learn.
- **Lightweight by design.** It's a business event plus an agent, not a hard-coded customization.
- **AI only where it adds value.** Matching a situation to a template is a small, low-risk use of AI, and it keeps working even if a file name drifts. Everything rule-based lives in flows.
- **A person always sends the email.** The agent proposes, and the collector decides.
- **Right-sized automation.** One person maintains the templates by hand, on purpose. Adding a template takes seconds, so automating it would add complexity for no real gain.

Could a flow do most of this? Mostly, yes. We used an agent for the template match, the Word step, and room to grow.

## Misconceptions we heard

- **"The connection prompt is an MCP limitation."** It's a credentials decision.
- **"The new harness raises the payload and timeout limits."** The limits are per call, on both harnesses.
- **"If the harness is GA, everything in it is GA."** Some features inside it, such as connected agents and memory, are still in preview.
- **"We can move our agent to the other harness later."** You can't. Moving it is a rebuild.
- **"Uploading a 250-page PDF as knowledge gives us whole-document analysis."** It gives you good question and answer. Analysis needs a different approach.
- **"More AI steps make the process smarter."** One or two well-placed steps beat ten.

## What I'd watch next

Microsoft Ignite runs November 17–20, and some of this will change. The mental models won't: pick the harness first, keep AI to the steps that need judgment, design to the limits, decide whose credentials a tool runs under, and run your agents like software.

Thanks to the Caf2Code team for building the agent behind the demo, and to everyone who sent in such good questions. If you're working through any of these in your own environment, I'd like to hear how you're approaching it on [LinkedIn](https://www.linkedin.com/in/jamesptorres/).

Thanks for reading,\
James
