---
title: "Building AI agents is an architecture problem"
description: "Most AI agents don't fail because the model isn't smart enough. Seven strategies for designing agents that hold up in production, from choosing the process to running the agent like software."
pubDate: 2026-11-13
tags: ["AI", "Technical"]
heroImage: ./images/building-ai-agents-architecture-problem/cover-v2.png
heroAlt: "Building AI agents is an architecture problem, with a process flow of deterministic steps around a single AI agent step"
draft: true
---

The model is usually the least important decision you'll make when you build an AI agent.

That sounds backwards, because the model gets all the attention. But when agent projects stall, it's rarely because the model wasn't smart enough. Gartner expects [more than 40% of agentic AI projects to be canceled by the end of 2027](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027), citing rising costs, unclear business value, and inadequate risk controls. None of those are model problems. They're architecture problems: where AI belongs in a process, what it's allowed to touch, whose permissions it uses, and how you know it's working.

Prompts and models still matter. They're just not where most agents succeed or fail.

If you've spent time around ERP projects, this should feel familiar. Integration, systems of record, approvals, and controls are the same problems we've always solved. AI changes one step in the process, not the discipline around it.

I've spent the last few weeks deep in Microsoft Copilot Studio, so my examples come from there. The strategies apply to any agent platform.

## 1. Start with the process, not the platform

The first question isn't "what can an agent do?" It's "which process is worth changing?"

A good candidate has most of these:

- **It happens often:** daily or weekly, not once a quarter.
- **It takes real manual effort:** people reading, comparing, re-keying, and chasing.
- **It has messy input or exceptions:** emails, PDFs, judgment calls. Without these, it's plain automation.
- **The data is reachable** through connectors, APIs, or MCP servers.
- **Mistakes can be caught** before they do harm, or gated behind an approval.
- **The value is measurable:** cycle time, touches, or error rate, with a baseline you capture before you start.

Just as important is knowing what isn't a fit. Pure if-then rules belong in a workflow tool. Bulk data processing belongs in a data pipeline. One person's productivity belongs in an assistant like Microsoft 365 Copilot. Not every process needs an agent, and saying so early saves a lot of rework.

## 2. Choose the runtime before the model

Every agent is three layers:

| Layer | What it is | Think of it as |
|---|---|---|
| Model | The LLM that reasons and writes | The brain |
| Runtime | The loop that decides what to send the model, calls tools, retries, and stops | The manager |
| Configuration | Instructions, knowledge, tools, and flows | The job description |

Copilot Studio calls the runtime a *harness*. In Microsoft's own evaluations, switching the harness moved pass rates by 10 to 22 points, while switching the model barely moved them. A capable brain with a poor manager still gets poor results.

The two harnesses most teams choose between show the trade-off. The standard harness follows the paths you design: predictable, and right for short, high-volume conversations. The Microsoft Copilot harness works toward a goal: it plans, calls tools, and recovers from failures, which suits long-running, multi-system work.

Make this choice deliberately, at the start. In Copilot Studio, an agent can't move between harnesses later. Moving one is a rebuild. And a more capable runtime isn't free: it can overthink a simple problem, adding cost and latency without a better answer.

## 3. Build the deterministic backbone first

Most of a business process shouldn't involve AI at all. My rule: workflows own the writes and anything that must happen the same way every time. The agent owns the one step a rule can't express.

| Keep it deterministic when… | Use AI when… |
|---|---|
| The rule is stable and fits an if-then | The input is unstructured: an email, a PDF, free text |
| The step writes to a system of record | The input varies too much for a fixed path |
| The same input must give the same output | Several sources have to be combined |
| Compliance needs a provable path | A person would apply judgment, not a lookup |

Build in that order. Get the trigger and the deterministic steps working, then find the one place a rule can't make the call, and put the agent there. Built the other way round, you get an agent with a flow bolted on.

Picture a collections team that drafts customer emails from about 30 templates. A collector selects invoices in the ERP. A workflow gathers and shapes the data. An agent picks the right template for the customer's situation, which is the only judgment in the whole process. Workflows fill in the template and create a draft in the collector's mailbox. The collector reviews it and sends it.

That's one AI step out of five, and the design is better for it:

- **It's easy to test,** because only one step can surprise you.
- **It's resilient.** Matching a situation to a template keeps working even when a file name drifts.
- **It's right-sized.** The templates themselves are maintained by hand on purpose. Adding one takes seconds, so automating it would add complexity for no gain.

Two habits keep the AI step honest. Have it return structured output, not prose, so the next step can branch on fields instead of parsing text. And resist adding more AI steps. More of them make a process harder to test, not smarter.

## 4. Keep a person between the agent and the system of record

An agent should never write directly to your system of record. The pattern I use: **the agent proposes, a person approves, a workflow writes.**

1. The agent writes its findings and reasoning to a staging record.
2. A person reviews the proposed values and approves or rejects them.
3. A workflow performs the write once, with an audit trail of who approved what and when.

How you build the gate depends on who approves. If the person chatting with the agent is the approver, a simple confirmation before the action runs is enough. If someone else approves, the review belongs in the workflow. For regulated processes with multiple approvers, reminders, and escalation, use a proper approvals process.

And keep the thresholds out of the model. "Anything over this amount needs a second approver" is a deterministic rule, not a judgment call.

## 5. Design to the platform's limits

Timeouts, record caps, and "response too large" errors are some of the most common complaints I hear. Most aren't the model. They're platform limits. In Copilot Studio, a tool response is capped at about 5 MB, and an ordinary tool call times out after about two minutes. Those limits apply per call, whichever harness you use, so a more capable runtime won't fix them.

So design around them:

- **Make the server do the work.** Give every tool that reads data parameters for page size, filtering, and the fields to return.
- **Return summaries, not raw rows.** An agent should never page through thousands of records to answer a question.
- **Move bulk work out of the conversation.** Let a workflow do the heavy lifting and write a shaped result, then let the agent query that.
- **Test with production-sized data** before your users find the limit for you.

The same thinking applies to large documents. Adding a 250-page contract as knowledge works well for questions like "when does this renew?", because retrieval finds the relevant passage. It doesn't give you whole-document analysis, such as extracting every clause or comparing versions. For that, extract the content into structured data first. As a bonus, every answer can then be traced back to a field someone can check.

## 6. Decide whose identity the agent acts as

Every time an agent calls a tool, it acts as someone. That's an architecture decision, even when it shows up as a user-experience complaint.

In Copilot Studio, the question usually arrives as "can we get rid of the sign-in prompt?" The prompt comes from the credentials model, not the tool. When the agent acts as each user, people see a consent or sign-in step, but every action carries their own permissions and shows up under their name. When the agent uses a shared service account, the prompt disappears, but every user inherits that account's permissions, and the audit trail shows the account instead of the person.

Neither is wrong. But it should be a deliberate choice, made with security in the room, not a workaround to make a demo smoother.

Two more things to plan for:

- **Credentials expire.** A secret that quietly lapses will take an agent down. Track expiration dates, or use certificates.
- **Agents are getting identities of their own.** Platforms are moving toward agents with their own accounts and permissions. Governing an agent's identity is about to matter as much as governing a person's.

## 7. Run agents like software

An agent isn't done when it's published. It's software, and it needs the same discipline:

- **Environments limit the damage.** Keep development, test, and production separate, and start experiments somewhere they can't touch production.
- **Control how far an agent can spread.** Limit who can share it, and with whom. Agents multiply through sharing, not creation.
- **Give every agent a named owner.**
- **Evaluate before every change.** Build a test set from real conversations, and re-run it whenever the instructions, knowledge, tools, or model change.
- **Monitor it in production,** with alerts on tool failures and slowdowns, so you hear about problems before your users do.

Then improve it in small steps: review the conversations that failed, change one thing, re-run the tests, and watch the results for a week. In my experience, most of the improvement comes from better knowledge and clearer tool descriptions, not from rewording the prompt.

## How I'd approach a first agent

Put together, the strategies make a simple sequence:

1. **Pick one measurable process,** and capture its baseline.
2. **Map it** with the people who do the work: who does what, in which system, and where it waits.
3. **Mark every step** as deterministic or judgment. Expect one or two judgment steps.
4. **Define the contract:** the trigger, the inputs, and the structured output the AI step must return.
5. **Build the backbone,** then **add the one AI step,** with a person reviewing the exceptions.
6. **Test with real data,** then build an evaluation set.
7. **Publish to a small group,** and compare against your baseline after 30 days.

The backbone is reusable. From one process to the next, often only the AI step changes.

## The skills that matter

The teams that do well with agents won't be the ones with the best prompts. They'll be the ones that already know how to map a process, protect a system of record, design an approval, and run software in production. That's architecture work, and a lot of people in the business applications world have been doing it for years.

The tools will keep changing. Copilot Studio alone changes monthly, and Microsoft Ignite is next week. The architecture questions won't.

I'm curious where others land on this. What's been the hardest architecture decision in your own agent work? Find me on [LinkedIn](https://www.linkedin.com/in/jamesptorres/).

Thanks for reading,\
James

*Next week: back to the* Do You Git It? *series with Part 2.*
