---
title: "Everyone wants AI. Start with the process."
description: "Every AI request sounds the same at first. Once you dig into the process, it turns out to be one of three things: no AI at all, a small ask, or a large one."
pubDate: 2026-11-13
tags: ["AI", "Technical"]
heroImage: ./images/everyone-wants-ai-start-with-the-process/cover.png
heroAlt: "Everyone wants AI. Start with the process. A process flow of ordinary steps with a single AI step in the middle"
draft: true
---

The request usually arrives in one sentence: "We want an agent for collections."

Sometimes it's invoices, or approvals, or the shared inbox nobody likes checking. The sentence is always the same shape. Everyone wants AI, and at that point, nobody has looked at the process yet.

I don't think that's a problem. It's a good instinct. But "we want an agent" isn't a requirement. It's a starting point for a conversation, and that conversation almost always ends somewhere different from where it started.

## Dig into the process first

Before anyone opens a tool, I want to understand the work itself. A few questions do most of the heavy lifting:

- **What starts it?** An email, a status change in the ERP, a person deciding it's time?
- **Where does the time actually go?** Not the steps on the diagram, but the reading, comparing, re-keying, and chasing in between.
- **Where does someone make a judgment call?** The places where two experienced people might reasonably decide differently.
- **What's the system of record?** Where does the result have to end up, and who's allowed to put it there?
- **How will we know it worked?** Cycle time, touches, errors. Something we can measure before and after.

Those answers sort almost every request into one of three buckets.

## Sometimes the answer is no AI at all

A surprising number of AI requests turn out to be rules.

"An agent that sends approvals over a certain amount to the controller" is a workflow with a condition in it. "An agent that tells us which orders are running late" is a report and an alert. "An agent that fills in these fields when a vendor is created" is often just configuration.

None of those need a model making decisions. A workflow does them faster, cheaper, and the same way every time, which is exactly what you want when the rule is clear.

Saying that out loud early is part of the job. It's not the exciting answer, but it's the one that gets the problem solved this month, and it builds the trust you need for the next request, the one that does need AI.

## Sometimes it's a small ask

The most common answer, in my experience, is a small one: an ordinary workflow with one judgment step in the middle.

Take that collections request. Picture a team that drafts customer emails from about 30 templates. When we walk through the process, almost all of it is mechanical. A collector selects invoices in the ERP. The customer and invoice details get gathered and cleaned up. The right template gets filled in, and a draft lands in the collector's mailbox for them to review and send.

There's exactly one step where judgment comes in: deciding which of the 30 templates fits this customer's situation. That's the AI step. Everything around it is a workflow.

Could a workflow have done most of this on its own? Mostly, yes. And that's the point. The AI is doing the one thing rules can't, and it's small enough to test, easy to explain, and low-risk if it gets something wrong, because a person reads every email before it goes out.

Digging in also tells you what *not* to automate. In this case, the templates themselves are maintained by hand. Adding a new one takes seconds, so building automation around it would add complexity for no real gain. Right-sizing goes both ways.

## Sometimes it's a large ask

Then there are the requests that really are large: the agent has to reason across several systems, handle messy inputs that vary every time, or take actions on someone's behalf.

These are worth doing. But this is where the questions stop being about AI and start being about architecture.

**Whose identity does the agent act as?** One of the most common questions I hear is "can we get rid of the sign-in prompt?" It sounds like a user-experience request. It's actually a decision about permissions. If the agent acts as each user, people see a prompt, but every action carries their own access and their own name. If it acts as a shared service account, the prompt disappears, but everyone inherits that account's permissions, and the audit trail shows the account instead of the person. Either can be right. It just has to be a decision, not a workaround.

**Who approves before anything gets written?** My rule is that the agent proposes, a person approves, and a workflow does the actual write to the system of record. The agent never commits on its own.

**What are the platform's limits?** Agent platforms have hard caps on how much data a single call can return and how long it can run. Large asks hit them. The fix is design, like shaping and filtering the data before the agent ever sees it, not hoping a smarter model copes.

**Who runs it after it ships?** Large asks are software, and software needs an owner, environments, testing, and monitoring. The least glamorous failure I've seen was an agent that simply stopped working one day because a credential behind it had quietly expired. Nothing about the AI was wrong. Nobody was watching the plumbing.

None of that is a reason not to build. It's a reason to know which kind of request you're holding before you promise a timeline.

## How to tell which one you have

After a while, the signals are pretty consistent. If every decision in the process can be written as an if-then rule, it's not an AI problem. If there's one step where a person reads something messy and makes a call, and everything else is mechanical, it's a small ask. If the judgment is spread across the whole process, the agent needs to act across several systems, or it would be acting with real authority, it's a large ask, and it deserves the architecture conversation up front.

Most requests land in the first two buckets. That's good news. It means most teams can get real value from AI sooner than they think, by putting it in the one place it's actually needed.

## Back to the request

"We want an agent for collections" turned into a workflow with one AI step that picks a template, and a person who still clicks send.

That's not a smaller version of what was asked for. It's the version that ships, gets used, and earns the right to try something bigger next.

So when the next "we want AI" request lands on your desk, start with the process. The AI part is usually smaller than anyone expects, and sometimes it isn't there at all.

Thanks for reading,\
James

*Next week: back to the* Do You Git It? *series with Part 2.*
