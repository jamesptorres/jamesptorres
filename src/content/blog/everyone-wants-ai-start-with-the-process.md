---
title: "Everyone wants AI. Start with the process."
description: "Every AI request starts the same way: \"We want an agent for ___.\" Five questions to ask first, and the three things that request usually turns out to be: no AI, a small ask, or a large one."
pubDate: 2026-11-13
tags: ["AI", "Technical"]
heroImage: ./images/everyone-wants-ai-start-with-the-process/cover.png
heroAlt: "Everyone wants AI. Start with the process. A process flow of ordinary steps with a single AI step in the middle"
draft: true
---

Every AI conversation I'm in starts the same way: "We want an agent for ___." The blank changes. The sentence doesn't.

At that point, nobody knows whether it's a quick win, a six-month project, or not an AI problem at all. That's what the first conversation is for.

**Before anyone opens a tool, I ask five questions:**

1. **What starts the process?**\
   The trigger decides where the solution plugs in, and whether it runs without anyone remembering to start it.
2. **Which part takes the most manual effort today?**\
   That's where the time savings, and the business case, come from.
3. **Where does someone make a judgment call?**\
   Judgment is the part that actually needs AI. None, with tidy inputs, usually means no AI. One usually means a small ask. Several, or one that spans systems or acts on someone's behalf, means a large one.
4. **Where does the result have to land, and who's allowed to put it there?**\
   Writing to a system of record is where the risk lives, and it decides how much approval and security the design needs.
5. **How will we know it worked?**\
   Without a baseline, you can't prove the value, and the next AI request gets harder to fund.

## Everyone wants AI

"We want an agent" is a fine starting point and a poor requirement. Guessing which kind of request you're holding is expensive in both directions. Either you spend months building an agent to do a job a rule could do, or you promise a quick win and walk straight into a security review nobody planned for.

That's why those five questions come first, asked with the people who actually do the work. The answers put almost every request into one of three buckets.

## No AI at all

Routing approvals over a certain amount is a workflow condition. Flagging late orders is a report and an alert. Filling in fields on a new vendor is often configuration.

If every decision in the process can be written as an if-then rule, and the inputs arrive structured, a workflow will do it faster, cheaper, and the same way every time. Saying so early isn't a letdown. It gets the problem solved this month, and it earns trust for the request that does need AI.

## A small ask

In my experience, this is the most common answer: an ordinary workflow with one judgment step in it.

Take collections emails drafted from about 30 templates. Gathering the invoice details, filling in the template, and creating the draft are all mechanical. The one real judgment is which template fits this customer's situation, and those situations don't map cleanly to fields. A decision table for 30 templates gets brittle every time one is added or renamed. That's the AI step, and a person still reviews and sends every email.

Could a workflow have done most of this? Mostly, yes, and that's the point. A small ask is easy to test, easy to explain, and low-risk. Digging in also shows what not to automate. Here, the templates are maintained by hand, because adding one takes seconds.

## A large ask

Some requests really are large. The agent has to reason across several systems, handle inputs that vary every time, or act on someone's behalf. This is also where teams that built first tend to hit walls: a sign-in prompt nobody expected, calls timing out on large data, approvals that have to happen before anything is written. None of those are AI problems.

The sign-in prompt is a decision about whose identity the agent acts as. Acting as each user means people sign in or consent, often just once if single sign-on is set up properly, and every action carries their own permissions and name. A shared service account removes the prompt, but everyone gets that account's access, and the audit trail shows the account instead of the person.

The timeouts are platform limits, and the fix is architectural: filter and shape the data, page through it, or move the heavy work out of the conversation. A smarter model won't help.

For writes that matter, my default is simple: the agent proposes, a person approves, and a workflow does the actual write. Low-risk, reversible actions can skip the person.

And someone has to own the agent after launch. The quietest failure I've seen was an agent that simply stopped working because a credential behind it expired, and nobody was watching.

Large asks are worth doing. They're architecture projects with an AI step in them, and they should be scoped like one.

## Back to the blank

So the next time someone says "we want an agent for ___," start with the process. The blank often turns out smaller than anyone expected, and sometimes it isn't AI at all.

Thanks for reading,\
James

*Next week: back to the* Do You Git It? *series with Part 2.*
